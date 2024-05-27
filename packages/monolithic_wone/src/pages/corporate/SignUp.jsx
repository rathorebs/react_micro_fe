import React, { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { Button } from "reactstrap";

import { useAuth } from "../../providers/auth";
import { clearStorage } from "../../utility/Function";
import { logAnalyticsEvent } from "../../utility/FirebaseAnalytics";
import functions from "../../functions";
import useQueryParams from "../../components/commons/hooks/useQueryParams";
import constant from "../../Constant";

import EmailField from "../../components/commons/fields/email";
import PasswordField from "../../components/commons/fields/password";
import TextField from "../../components/commons/fields/text";
import backArrow from "../../Assets/back_arrow.svg";
import "../common/styles.scss";

const COMPANY_INFO_REL_ROUTE = "company-info";
const ADMIN_DETAILS_REL_ROUTE = "admin-details";
const COMPANY_INFO_ROUTE = `/signup/${COMPANY_INFO_REL_ROUTE}`;
const ADMIN_DETAILS_ROUTE = `/signup/${ADMIN_DETAILS_REL_ROUTE}`;

const SIGN_UP = gql`
  mutation SelfServeCorporateSignUp($input: SelfServeSignUpInput!) {
    selfServeCorporateSignUp(input: $input) {
      ok
      paymentLink
      authToken
      user {
        id
        firstName
        lastName
        username
        email
        userdetail {
          photo
          role {
            id
            name
          }
          studentdetail {
            id
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
        }
      }
    }
  }
`;

const saveInput = (input) => {
  const inputSnapshot = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    jobTitle: input.jobTitle,
    companyName: input.companyName,
    addressLine1: input.addressLine1,
    addressLine2: input.addressLine2,
    city: input.city,
    country: input.country,
    postCode: input.postCode,
    companyDomain: input.companyDomain,
    noOfSeats: input.noOfSeats,
  };
  const inputSnapshotJSON = JSON.stringify(inputSnapshot);

  localStorage.setItem("companySignUpInput", inputSnapshotJSON);
};

const isCompanyInfoFilled = (inputSnapshot) => {
  if (
    inputSnapshot.companyName !== "" &&
    inputSnapshot.addressLine1 !== "" &&
    inputSnapshot.city !== "" &&
    inputSnapshot.country !== "" &&
    inputSnapshot.postCode !== "" &&
    inputSnapshot.noOfSeats !== ""
  ) {
    return true;
  }

  return false;
};

const initInput = () => {
  const input = {
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    postCode: "",
    companyDomain: "",
    noOfSeats: "",
  };

  const inputSnapshotJSON = localStorage.getItem("companySignUpInput");
  if (inputSnapshotJSON) {
    try {
      const inputSnapshot = JSON.parse(inputSnapshotJSON);

      return {
        firstName: inputSnapshot.firstName,
        lastName: inputSnapshot.lastName,
        email: inputSnapshot.email,
        jobTitle: inputSnapshot.jobTitle,
        companyName: inputSnapshot.companyName,
        addressLine1: inputSnapshot.addressLine1,
        addressLine2: inputSnapshot.addressLine2,
        city: inputSnapshot.city,
        country: inputSnapshot.country,
        postCode: inputSnapshot.postCode,
        companyDomain: inputSnapshot.companyDomain,
        noOfSeats: inputSnapshot.noOfSeats,
      };
    } catch (err) {
      console.error("Could not parse inputSnapshot due to", err);
    }
  }

  return input;
};

const SignUp = () => {
  const { handleUser, setAuthToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = useQueryParams();
  const currency = params.get("currency") ?? "GBP";

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);
  const [input, setInput] = useState({
    ...initInput(),
    password: "",
    currency,
    userTimezone: functions.clientTimeZone(),
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    saveInput(input);
  }, [input]);

  const handleClickBack = () => {
    navigate(COMPANY_INFO_ROUTE);
  };

  const handleSubmitNext = (event) => {
    event.preventDefault();

    logAnalyticsEvent("starter_company_info_filled", {
      company_name: input.companyName,
    });

    navigate(ADMIN_DETAILS_ROUTE);
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();

    signUp({
      variables: {
        input,
      },
    }).catch((error) => console.log("signUp error:", error));
  };

  useEffect(() => {
    // Handle success
    if (
      data &&
      data.selfServeCorporateSignUp &&
      data.selfServeCorporateSignUp.ok
    ) {
      const { authToken, user, paymentLink } = data.selfServeCorporateSignUp;

      const userId = user.id;
      const companyId = user.userdetail.studentdetail.company.id;
      const companyName = user.userdetail.studentdetail.company.name || "NA";

      logAnalyticsEvent("starter_sign_up_confirmed", {
        user_id: userId,
        user_id_wone: userId,
        company_id: companyId,
        company_name: companyName,
      });

      clearStorage();

      localStorage.setItem("Authtoken", authToken);

      setAuthToken(authToken);
      handleUser(user);

      localStorage.setItem("paymentLink", paymentLink);
    }
  }, [data, handleUser, setAuthToken]);

  useEffect(() => {
    // Focus first empty input on form change
    if (document.forms.length) {
      for (const element of document.forms[0].elements) {
        if (element.value === "") {
          element.focus();
          break;
        }
      }
    }
  }, [location]);

  const companyInfoForm = (
    <form
      className="SignUp"
      onChange={handleChange}
      onSubmit={handleSubmitNext}
    >
      <h1>Company Information</h1>

      <p className="CallToSignIn">
        Fill in your company details. Already a member?{" "}
        <Link to="/login">Log In</Link>
      </p>
      <TextField
        inputProps={{
          name: "companyName",
          placeholder: "Company Name",
          value: input.companyName,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "addressLine1",
          placeholder: "Address Line 1",
          value: input.addressLine1,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "addressLine2",
          placeholder: "Address Line 2 (optional)",
          value: input.addressLine2,
        }}
      />
      <TextField
        inputProps={{
          name: "city",
          placeholder: "City",
          value: input.city,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "country",
          placeholder: "Country",
          value: input.country,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "postCode",
          placeholder: "Post / Zip code",
          value: input.postCode,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "companyDomain",
          placeholder: "Company Domain (optional)",
          value: input.companyDomain,
        }}
      />
      <TextField
        inputProps={{
          type: "number",
          min: 1,
          max: 100,
          name: "noOfSeats",
          placeholder: "Number of seats (Min 1 - Max 100)",
          value: input.noOfSeats,
          required: true,
        }}
      />
      <Button type="submit" className="secondary-btn">
        Next
      </Button>

      <p className="CallToSignIn">
        More than 100 seats?{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={constant.SELF_SERVE_CONTACT_SALES_URL}
        >
          contact sales
        </a>
      </p>
    </form>
  );

  const adminDetailsForm = (
    <form
      className="SignUp"
      onChange={handleChange}
      onSubmit={handleSubmitSignUp}
    >
      <div onClick={handleClickBack} className="back-button">
        <img src={backArrow} alt="Back to previous screen" />
      </div>

      <h1>Admin Details</h1>
      <p className="CallToSignIn">Fill in your admin details</p>
      <TextField
        inputProps={{
          name: "firstName",
          placeholder: "First Name",
          value: input.firstName,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "lastName",
          placeholder: "Last Name",
          value: input.lastName,
          required: true,
        }}
      />
      <TextField
        inputProps={{
          name: "jobTitle",
          placeholder: "Job Title",
          value: input.jobTitle,
          required: true,
        }}
      />
      <EmailField
        inputProps={{
          required: true,
          value: input.email,
        }}
      />
      <PasswordField
        inputProps={{
          required: true,
          value: input.password,
          name: "password",
          autoComplete: "new-password",
          pattern: "^(?=.*[a-z])(?=.*[A-Z]).{6,}$",
          title:
            "Password must contain at least 1 uppercase, 1 lowercase, and a minimum of 6 characters.",
        }}
      />
      <Button disabled={loading} type="submit" className="register-button">
        {loading ? (
          <div className="spinner-border spinner-border-sm" />
        ) : (
          <span>Continue to payment</span>
        )}
      </Button>

      {error && (
        <p className="ErrorMessage">
          {error.message.match("already exists")
            ? "Sorry, this email has already been registered."
            : error.message}
        </p>
      )}
    </form>
  );

  if (location.pathname !== COMPANY_INFO_ROUTE && !isCompanyInfoFilled(input)) {
    return <Navigate to={COMPANY_INFO_ROUTE} />;
  }

  return (
    <div className="Background">
      <div className="Page">
        <div className="container">
          <Routes>
            <Route
              exact
              path={COMPANY_INFO_REL_ROUTE}
              element={companyInfoForm}
            ></Route>
            <Route
              exact
              path={ADMIN_DETAILS_REL_ROUTE}
              element={adminDetailsForm}
            ></Route>
            <Route path="*" element={<Navigate to={COMPANY_INFO_ROUTE} />} />
          </Routes>
        </div>
        <div className="container">
          <p className="Footer">
            By creating an account you agree to our{" "}
            <a
              href="https://www.walkingonearth.com/terms/starter"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a
              href="https://www.walkingonearth.com/privacypolicy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
