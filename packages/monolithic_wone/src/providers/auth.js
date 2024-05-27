import React, { useState, createContext, useContext, useEffect } from "react";
import { SIGN_IN, SIGN_OUT } from "../utility/graphQl/mutation";
import {
  QUERY_USER,
  QUERY_LEARNER,
  QUERY_COMPANY_ADMIN,
} from "../utility/graphQl/query";
import { useMutation, useLazyQuery } from "@apollo/client";
import { setGlobalInfoCookie, clearStorage } from "../utility/Function";
import {
  logAnalyticsEvent,
  setAnalyticsUserId,
} from "../utility/FirebaseAnalytics";

import constants from "../Constant";
import appInfo from "utility/app-info";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CryptoJS from "crypto-js";

const AuthContext = createContext(null);

export const COMPANY_ADMIN_ROLE = "COMPANY-ADMIN";
export const STUDENT_ROLE = "STUDENT";
export const TEACHER_ROLE = "TEACHER";

const _setCommonLocalStorage = (user) => {
  const {
    firstName,
    lastName,
    id,
    companyName: company,
    /* email,*/ userdetail,
  } = user;

  const companyName =
    company || userdetail?.studentdetail?.company?.name || "NA";

  // Remove student specific items
  localStorage.removeItem("studentID");
  localStorage.removeItem("studentPhoto");
  localStorage.removeItem("WOEstudentUserId");
  localStorage.removeItem("shouldOnboard");

  // Remove teacher specific items
  localStorage.removeItem("teacherId");
  localStorage.removeItem("teacherPhoto");

  // Remove company admin specific items
  localStorage.removeItem("paymentLink");
  localStorage.removeItem("companyID");
  localStorage.removeItem("roleID");
  localStorage.removeItem("companyLocation");

  // Set common items
  localStorage.setItem("companyName", companyName);
  localStorage.setItem("userfirstName", firstName);
  localStorage.setItem("userlastName", lastName);
  localStorage.setItem("userID", id);
  //localStorage.setItem("userEmailId", email);
};

const setStudentLocalStorage = (user) => {
  const {
    id,
    /* userdetail: { studentdetail, photo }, */
    photoUrl,
    onboarding,
  } = user;

  _setCommonLocalStorage(user);

  localStorage.setItem("studentID", id);
  localStorage.setItem("studentPhoto", photoUrl);
  localStorage.setItem("WOEstudentUserId", id); // TODO: remove from codebase and refactor all dependants

  if (onboarding /* !studentdetail?.onboarding */) {
    localStorage.setItem("shouldOnboard", "true");
  } else {
    localStorage.removeItem("shouldOnboard");
  }
};

const setTeacherLocalStorage = (user) => {
  const {
    userdetail: { teacherdetail, photo },
  } = user;

  _setCommonLocalStorage(user);

  localStorage.setItem("teacherID", teacherdetail.id);
  localStorage.setItem("teacherPhoto", photo);
};

const setCompanyAdminLocalStorage = (user) => {
  const {
    /* userdetail: { studentdetail, photo, role }, */
    id,
    photoUrl,
  } = user;
  //const paymentLink = studentdetail.company.paymentLink;

  _setCommonLocalStorage(user);

  /* if (paymentLink) {
    localStorage.setItem("paymentLink", paymentLink);
  } */
  localStorage.setItem("companyID", id);
  localStorage.setItem("teacherPhoto", photoUrl);
  localStorage.setItem("studentID", id);
  //localStorage.setItem("roleID", role[0].id);

  /* studentdetail &&
    studentdetail.corporatecompanyadminSet?.map((res) =>
      localStorage.setItem("companyLocation", res?.location?.location)
    ); */
};

const reportStudentLogin = (user) => {
  const {
    id,
    /*  userdetail: { studentdetail }, */
    companyName: company,
  } = user;

  const companyName = company || "NA";

  logAnalyticsEvent("login", {
    user_id: id,
    user_id_wone: id,
    company_name: companyName,
    channel: "Password",
  });
};

const reportTeacherLogin = (user) => {
  const { id, firstName, lastName } = user;
  logAnalyticsEvent("practitioner_login", {
    user_id: id,
    user_id_wone: id,
    first_name: firstName,
    last_name: lastName,
  });
};

const reportCompanyAdminLogin = (user) => {
  const {
    id,
    /*  userdetail: { studentdetail }, */
    firstName,
    lastName,
    companyName: company,
  } = user;

  const companyName = company || "NA";

  logAnalyticsEvent("company_admin_login", {
    user_id: id,
    user_id_wone: id,
    first_name: firstName,
    last_name: lastName,
    company_name: companyName,
  });
};

export const getCurrentUserRoleType = (roles) => {
  if (
    roles &&
    constants.IS_CORPORATE_APP &&
    roles.find((item) => item === COMPANY_ADMIN_ROLE)
  ) {
    return COMPANY_ADMIN_ROLE;
  } else if (roles && roles.find((item) => item === STUDENT_ROLE)) {
    return STUDENT_ROLE;
  } else if (roles && roles.find((item) => item === TEACHER_ROLE)) {
    return TEACHER_ROLE;
  } else {
    return null;
  }
};

export const getUserRoleType = (user) => {
  if (
    user &&
    constants.IS_CORPORATE_APP &&
    //user.userdetail.role.find((item) => item.name === COMPANY_ADMIN_ROLE)
    user.find((item) => item === COMPANY_ADMIN_ROLE)
  ) {
    return COMPANY_ADMIN_ROLE;
  } else if (
    user &&
    //user.userdetail.role.find((item) => item.name === STUDENT_ROLE)
    user.find((item) => item === STUDENT_ROLE)
  ) {
    return STUDENT_ROLE;
  } else if (
    user &&
    //user.userdetail.role.find((item) => item.name === TEACHER_ROLE)
    user.find((item) => item === TEACHER_ROLE)
  ) {
    return TEACHER_ROLE;
  } else {
    return null;
  }
};

export const checkUserHasRole = (user, role) => {
  if (user?.userdetail?.role) {
    return user.userdetail.role.some((item) => item.name === role);
  } else {
    return undefined;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState(null);
  const [companyAdmin, setCompanyAdmin] = useState(null);

  const [learner, setLearner] = useState(null);
  const [signIn, { loading, error }] = useMutation(SIGN_IN);
  const [signOut] = useMutation(SIGN_OUT);

  const handleUser = (user) => {
    const rolesData = JSON.parse(localStorage.getItem("roles"));
    const roleType = getUserRoleType(rolesData);

    setUser(user);
    setAnalyticsUserId(user.id);
    setGlobalInfoCookie({ id: user.id });

    if (roleType === COMPANY_ADMIN_ROLE) {
      setCompanyAdminLocalStorage(companyAdmin);
    } else if (roleType === STUDENT_ROLE) {
      setStudentLocalStorage(learner);
    } else if (roleType === TEACHER_ROLE) {
      setTeacherLocalStorage(user);
    } else {
      throw new Error(
        `Unexpected role type ${roleType} for user with id ${user.id}`
      );
    }
  };

  const [getUser] = useLazyQuery(QUERY_USER, {
    onCompleted(result) {
      handleUser(result.user);

      //const roleType = getUserRoleType(result?.user?.userdetail?.role);
      /*if (roleType === STUDENT_ROLE) {
        getLearner({
          variables: {
            appInfo,
          },
        });
      }*/
    },
    onError(errors) {
      console.log(errors.message, "User query error");
      logout();
      navigate(0);
    },
  });

  const [getLearner, { refetch: refetchLearner }] = useLazyQuery(
    QUERY_LEARNER,
    {
      onCompleted(result) {
        //handleUser(result.learner);
        setLearner(result.learner);
      },
      onError(errors) {
        console.log(errors.message, "Learner query error");
        logout();
        navigate(0);
      },
    }
  );
  const [getCompanyAdmin] = useLazyQuery(QUERY_COMPANY_ADMIN, {
    onCompleted(result) {
      //handleUser(result.companyAdmin);
      setCompanyAdmin(result.companyAdmin);
    },
    onError(errors) {
      console.log(errors.message, "Company Admin query error");
      logout();
      navigate(0);
    },
  });
  const login = (variables, keepMeSignIn) =>
    signIn({
      variables,
    }).then(
      (success) => {
        const { authToken, user, paymentLink, learner, companyAdmin, roles } =
          success.data.signIn;
        const roleType = getUserRoleType(roles);
        localStorage.setItem("Authtoken", authToken);
        localStorage.setItem("roles", JSON.stringify(roles));
        if (keepMeSignIn) {
          let datatoStorage = CryptoJS.AES.encrypt(
            JSON.stringify(variables.input),
            process.env.REACT_APP_CRYPTO_JS_SECRET_KEY
          ).toString();
          localStorage.setItem("keepMeSignInData", datatoStorage);
        } else {
          localStorage.removeItem("keepMeSignInData");
        }

        if (paymentLink) {
          localStorage.setItem("paymentLink", paymentLink);
        }

        if (roleType === COMPANY_ADMIN_ROLE) {
          reportCompanyAdminLogin(companyAdmin);
        } else if (roleType === STUDENT_ROLE) {
          reportStudentLogin(learner);
          setStudentLocalStorage(learner);
        } else if (roleType === TEACHER_ROLE) {
          reportTeacherLogin(user);
        } else {
          throw new Error(
            `Unexpected role type ${roleType} for user with id ${user.id}`
          );
        }

        setAuthToken(authToken);
        setLearner(learner);

        handleUser(user);
        getUser({
          variables: {
            email: user.email,
          },
        });

        return {
          ...success.data.signIn,
          roleType,
        };
      },
      (error) => {
        logAnalyticsEvent("login_failed", {
          channel: "Password",
        });
        logout();
        return error;
      }
    );

  const loginWithToken = (token, authBackend, action) => {
    let decoded = null;
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      console.error("error:", error);
    }

    if (decoded != null) {
      localStorage.setItem("Authtoken", token);
      setAuthToken(token);

      getUser({
        variables: {
          email: decoded.username,
        },
      }).then((success) => {
        navigate("/");
        if (action === "signin") {
          const id = localStorage.getItem("userID");
          const companyName = localStorage.getItem("companyName");
          logAnalyticsEvent("login", {
            user_id: id,
            user_id_wone: id,
            company_name: companyName,
            channel: authBackend,
          });
        }
      });
    }
  };

  const signOutCall = () => {
    const rolesData = JSON.parse(localStorage.getItem("roles"));
    const roleType = getUserRoleType(rolesData);
    if (roleType === STUDENT_ROLE) {
      return signOut({
        variables: {
          appInfo,
        },
      }).catch((error) => {
        navigate("/signin");
        window.location.href = constants.WEBSITE_URL;
        console.error("sign out error:", error);
      });
    }
  };

  const logout = () => {
    signOutCall();
    clearStorage();
    setAuthToken(null);
    setUser(null);
    setAnalyticsUserId(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("Authtoken");
    const userId = localStorage.getItem("userID");
    const rolesData = JSON.parse(localStorage.getItem("roles"));
    const roleType = getUserRoleType(rolesData);
    if (token) {
      const decoded = jwt_decode(token);
      /* getUser({
        variables: {
          email: decoded.username,
        },
      }); */
      /* if (companyAdmin) {
        getCompanyAdmin({
          variables: {
            appInfo,
          },
        });
      } else {
        getLearner({
          variables: {
            appInfo,
          },
        });
      } */

      if (roleType === STUDENT_ROLE) {
        getLearner({
          variables: {
            appInfo,
          },
        });
      } else if (roleType === COMPANY_ADMIN_ROLE) {
        getCompanyAdmin({
          variables: {
            appInfo,
          },
        });
      } else if (roleType === TEACHER_ROLE) {
        getUser({
          variables: {
            email: decoded.username,
          },
        });
      }
    }

    setAuthToken(token);
    setAnalyticsUserId(userId);
  }, [getUser, getLearner, getCompanyAdmin, companyAdmin, user]);

  return (
    // Using the provider so that ANY component in our application can
    // use the values that we are sending.
    <AuthContext.Provider
      value={{
        authToken,
        login,
        loginWithToken,
        logout,
        loading,
        error,
        user,
        handleUser,
        setAuthToken,
        learner,
        refetchLearner,
        companyAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Auth hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
