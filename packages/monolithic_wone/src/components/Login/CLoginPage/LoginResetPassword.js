import React, { useRef, useState } from "react";
import { Button } from "reactstrap";
import { gql, useMutation } from "@apollo/client";
import LoginPage_logo_img from "../../../Assets/LoginPage_logo_img.png";
import LoginPage_email_icon from "../../../Assets/LoginPage_email_icon.svg";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const RESET_PASSWORD = gql`
  mutation ResetPasswordWithLink($input: ResetPasswordInput!) {
    resetPasswordWithLink(input: $input) {
      user {
        firstName
        lastName
        email
      }
      ok
      sentMail
    }
  }
`;

const LoginResetPassword = (props) => {
  const navigate = useNavigate();
  const [fields, setfields] = useState({});
  const [errors, seterrors] = useState({});

  const textInputemail = useRef(null);

  const [resetPassword] = useMutation(RESET_PASSWORD);

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

    seterrors(errors);
    return formIsValid;
  };

  const handleChnage = () => {
    fields[textInputemail.current.name] = textInputemail.current.value;
    setfields({ fields });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      resetPassword({
        variables: {
          input: {
            email: fields.fields.email,
          },
        },
      })
        .then((res) => {
          if (props.userType === "student" || props.userType === "teacher") {
            navigate("/signin");
          } else if (props.userType === "corporate") {
            navigate("/corporate");
          }
          props.handleForgotPassword();
          alert("Please check your email for your password reset link.");
        })
        .catch((err) => {
          errors["email"] = "Entered email is not registered";
          seterrors(errors);
        });
    }
  };

  const handleRedirect = () => {
    props.handleCancelChangePassword();
  };

  return (
    <div className="LoginPage-container">
      <div className="LoginResetPassword-wrapper">
        <img src={LoginPage_logo_img} alt="" className="LoginPage-logo" />
        <h2 className="mb-3">
          Enter the email address associated with your Walking on Earth account
          so we can send you a code to change your password.
        </h2>
        <div className="LoginPage-email">
          <img src={LoginPage_email_icon} alt="" />
          <input
            ref={textInputemail}
            placeholder="Email address"
            type="email"
            name="email"
            onChange={handleChnage}
          />
        </div>

        <Button className="LoginPage-signIn" onClick={handleResetPassword}>
          Reset Password
        </Button>
        <div className="mt-1">
          <span className="cursor-pointer" onClick={handleRedirect}>
            Cancel
          </span>
        </div>

        <span style={{ color: "red" }}>{errors["email"]}</span>
      </div>
    </div>
  );
};

export default LoginResetPassword;
