import React, { useRef, useState } from "react";
import { Button } from "reactstrap";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import LoginPage_logo_img from "../../../Assets/LoginPage_logo_img.png";
import LoginPage_lock_icon from "../../../Assets/LoginPage_lock_icon.svg";
import LoginPage_clock_icon from "../../../Assets/LoginPage_clock_icon.svg";

import "./LoginPage.css";

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      user {
        id
        username
        email
      }
      ok
      sentMail
    }
  }
`;

const LoginChangePassword = (props) => {
  const navigate = useNavigate();

  const [fields, setfields] = useState({});
  const [errors, seterrors] = useState({});

  const textTemppassword = useRef(null);
  const textNewpassword = useRef(null);
  const textConfirmpassword = useRef(null);

  const [changePassword] = useMutation(CHANGE_PASSWORD);

  const handleChange = () => {
    fields[textTemppassword.current.name] = textTemppassword.current.value;
    fields[textNewpassword.current.name] = textNewpassword.current.value;
    fields[textConfirmpassword.current.name] =
      textConfirmpassword.current.value;

    setfields({ fields });
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!fields.fields) {
      errors["Newpassword"] = "Please fill all the fields";
      formIsValid = false;
    }

    if (
      fields.fields &&
      !fields.fields.Newpassword &&
      !fields.fields.Confirmpassword
    ) {
      errors["Newpassword"] = "Please fill all the fields";
      formIsValid = false;
    }

    if (fields.fields && typeof fields.fields.Newpassword !== "undefined") {
      if (!fields.fields.Newpassword.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/)) {
        formIsValid = false;
        errors["Newpassword"] =
          "Please enter strong password (Must contain 1 uppercase,1 lowercase and min 6 Character)";
      }
    }

    if (
      fields.fields &&
      fields.fields.Newpassword !== fields.fields.Confirmpassword
    ) {
      errors["Newpassword"] =
        "New password and Confirm new password fields should be same";
      formIsValid = false;
    }

    seterrors(errors);

    return formIsValid;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      changePassword({
        variables: {
          input: {
            oldPassword: fields.fields.Temppassword,
            newPassword: fields.fields.Newpassword,
          },
        },
      })
        .then((res) => {
          alert("Password change/reset successfully");
          localStorage.removeItem("shouldChangePassword");
          navigate("/user/sessions");
        })
        .catch((err) => {
          errors["Newpassword"] = "Temprory password is incorrect ";
          seterrors(errors);
        });
    }
  };

  return (
    <div className="LoginPage-container">
      <form className="LoginPage-wrapper" onSubmit={handleChangePassword}>
        <img src={LoginPage_logo_img} alt="" className="LoginPage-logo" />
        <h2 className="changePassword-h2">
          Enter your temporary and new password
        </h2>
        <div className="LoginPage-password">
          <img src={LoginPage_clock_icon} alt="" />
          <input
            ref={textTemppassword}
            type="password"
            name="Temppassword"
            placeholder="Enter temporary password"
            onChange={handleChange}
          />
        </div>
        <div className="LoginPage-password">
          <img src={LoginPage_lock_icon} alt="" />
          <input
            ref={textNewpassword}
            type="password"
            name="Newpassword"
            placeholder="Enter New Password"
            onChange={handleChange}
          />
        </div>
        <div className="LoginPage-password">
          <img src={LoginPage_lock_icon} alt="" />
          <input
            ref={textConfirmpassword}
            type="password"
            name="Confirmpassword"
            placeholder="Confirm New Password"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="LoginPage-signIn">
          Change Password
        </Button>
        <span style={{ color: "red" }}>{errors["Newpassword"]}</span>
      </form>
    </div>
  );
};

export default LoginChangePassword;
