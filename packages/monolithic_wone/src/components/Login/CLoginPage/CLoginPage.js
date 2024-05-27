import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import React, { useRef, useState } from "react";

import { gql, useMutation, useLazyQuery } from "@apollo/client";
import LoginPage_logo_img from "../../../Assets/LoginPage_logo_img.svg";
import LoginPage_email_icon from "../../../Assets/LoginPage_email_icon.svg";
import LoginPage_lock_icon from "../../../Assets/LoginPage_lock_icon.svg";
import pass_vis_off from "../../../Assets/images/visibility_off.png";
import pass_vis_on from "../../../Assets/images/visibility_on.png";
//import { logAnalyticsEvent } from '../../../utility/FirebaseAnalytics';
import "./LoginPage.css";
import MembershipPopup from "./MembershipPopup.js";

const AUTH_USER = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;

const CORPORATECOMPANYADMINEMAIL = gql`
  query corporateCompanyAdminEmail($email: String!) {
    corporateCompanyAdminEmail(email: $email) {
      id
      admin {
        id
        userdetailObj {
          userObj {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const QUERY_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      userdetail {
        userObj {
          id
        }
        photo
        role {
          id
          name
        }
        studentdetail {
          id
          location {
            id
            name
          }
          company {
            id
            name
          }
          corporatecompanyadminSet {
            location {
              id
              location
            }
          }
        }
        teacherdetail {
          id
        }
      }
      id
      firstName
      lastName
      username

      email
    }
  }
`;

const CLoginPage = (props) => {
  const [tokenAuth] = useMutation(AUTH_USER);

  const [fields, setfields] = useState({});
  const [errors, seterrors] = useState({});
  const [adminErrors, setadminErrors] = useState();
  const [membershipPopup, setmembershipPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const textInputemail = useRef(null);
  const textInputpassword = useRef(null);
  //let email = '';
  const [loadUserDetails] = useLazyQuery(QUERY_USER, {
    onCompleted(responce) {
      if (
        responce.user.userdetail.role.find((item) => item.name === "STUDENT")
      ) {
        //logAnalyticsEvent('corporate_logins',{'first_name':responce.user.firstName, 'last_name':responce.user.lastName, 'company_id':responce.user.userdetail.studentdetail.company.id,'company_name':responce.user.userdetail.studentdetail.company.name, 'user_id': localStorage.getItem("userID"), 'user_id_wone': localStorage.getItem("userID")} );
        if (responce.user.userdetail.studentdetail.company) {
          localStorage.setItem(
            "companyID",
            responce.user.userdetail.studentdetail.company.id
          );
          localStorage.setItem(
            "companyName",
            responce.user.userdetail.studentdetail.company?.name || "NA"
          );
          localStorage.setItem("userfirstName", responce.user.firstName);
          localStorage.setItem("userlastName", responce.user.lastName);
          localStorage.setItem("teacherPhoto", responce.user.userdetail.photo);
          localStorage.setItem(
            "studentID",
            responce.user.userdetail.studentdetail.id
          );
          localStorage.setItem("roleID", responce.user.userdetail.role[0].id);
        }

        responce.user.userdetail.studentdetail &&
          responce.user.userdetail.studentdetail.corporatecompanyadminSet.map(
            (res) =>
              localStorage.setItem("companyLocation", res.location.location)
          );
        loadAdminDetails({
          variables: {
            email: fields.fields.email,
          },
        });
      } else {
        localStorage.removeItem("Authtoken");
      }
    },

    onError(error) {
      localStorage.removeItem("Authtoken");
    },
  });

  const [loadAdminDetails] = useLazyQuery(CORPORATECOMPANYADMINEMAIL, {
    onCompleted(responce) {
      props.navigate("/corporate/dashboard");
    },

    onError(error) {
      setadminErrors(error.message);
    },
  });

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields.fields) {
      formIsValid = false;
      errors["email"] = "Please complete the field above";
    }

    if (fields.fields && !fields.fields.email) {
      formIsValid = false;
      errors["email"] = "Please complete the field above";
    }

    if (fields.fields && typeof fields.fields.email !== "undefined") {
      let lastAtPos = fields.fields.email.lastIndexOf("@");
      let lastDotPos = fields.fields.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields.fields.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields.fields.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Please enter the valid Email";
      }
    }

    //Password
    if (!fields.fields) {
      formIsValid = false;
      errors["password"] = "Please complete the field above";
    }

    if (fields.fields && !fields.fields.password) {
      formIsValid = false;
      errors["password"] = "Please complete the field above";
    }

    if (
      fields.fields &&
      typeof fields.fields.password !== "undefined" &&
      fields.fields.password.length === 5
    ) {
      formIsValid = false;

      const email_lower_case = fields.fields.email.toLowerCase();
      tokenAuth({
        variables: {
          username: email_lower_case,
          password: fields.fields.password,
        },
      })
        .then((res) => {
          props.handleChangePasswordNew();
          let token = res.data.tokenAuth.token;
          localStorage.setItem("Authtoken", token);
          loadUserDetails({
            variables: {
              email: fields.fields.email,
            },
          });
        })
        .catch((err) => {
          errors["email"] = "Please enter the valid credentials";
          seterrors(errors);
        });
    }

    seterrors(errors);
    return formIsValid;
  };

  const handleChange = () => {
    //let fields

    fields[textInputpassword.current.name] = textInputpassword.current.value;
    fields[textInputemail.current.name] = textInputemail.current.value;

    setfields({ fields });
  };

  const closeForm = () => {
    setmembershipPopup(false);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const email_lower_case = fields.fields.email.toLowerCase();
      tokenAuth({
        variables: {
          username: email_lower_case,
          password: fields.fields.password,
        },
      })
        .then((res) => {
          let token = res.data.tokenAuth.token;
          localStorage.setItem("Authtoken", token);

          loadUserDetails({
            variables: {
              email: fields.fields.email,
            },
          });
        })
        .catch((err) => {
          errors["email"] = "Please enter the valid credentials";
          seterrors(errors);
        });
    }
  };
  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="LoginPage-container">
      <form className="LoginPage-wrapper" onSubmit={handleLoginFormSubmit}>
        <img src={LoginPage_logo_img} alt="" className="LoginPage-logo" />
        <div className="LoginPage-email">
          <img src={LoginPage_email_icon} alt="" />
          <input
            ref={textInputemail}
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
          />
        </div>
        <div className="LoginPage-password">
          <img src={LoginPage_lock_icon} alt="" />
          <input
            ref={textInputpassword}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <img
            src={showPassword ? pass_vis_off : pass_vis_on}
            onClick={passwordToggle}
            alt=""
            className="cursor-pointer"
          />
        </div>
        <Button
          type="submit"
          className="LoginPage-signIn"
          onClick={handleLoginFormSubmit}
        >
          Sign In
        </Button>
        <h2>
          <span
            className="forgot-pass"
            onClick={() => {
              props.handleResetPassword();
            }}
          >
            Forgot your password?
          </span>
        </h2>
        {adminErrors !== undefined ? (
          <span style={{ color: "red" }}>{adminErrors}</span>
        ) : (
          ""
        )}
        {errors["email"] && errors["password"] ? (
          <span style={{ color: "red" }}>{errors["email"]}</span>
        ) : errors["password"] ? (
          <span style={{ color: "red" }}>{errors["password"]}</span>
        ) : (
          <span style={{ color: "red" }}>{errors["email"]}</span>
        )}
      </form>
      {membershipPopup && <MembershipPopup closeForm={closeForm} />}
    </div>
  );
};

export default withRouter(CLoginPage);
