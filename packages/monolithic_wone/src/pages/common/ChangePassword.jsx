import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import PasswordField from "../../components/commons/fields/password";

import { CHANGE_PASSWORD } from "../../utility/graphQl/mutation";

import "./styles.scss";
import useQueryParams from "../../components/commons/hooks/useQueryParams";
import { useAuth } from "../../providers/auth";

const ChangePassword = () => {
  const navigate = useNavigate();
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const params = useQueryParams();
  const token = params.get("token");
  const { logout } = useAuth();

  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!passwordInput.current || !confirmPasswordInput.current) {
      throw new Error("Password inputs are required");
    }

    if (passwordInput.current.value !== confirmPasswordInput.current.value) {
      confirmPasswordInput.current.setCustomValidity(
        "Password confirmation should match your new password"
      );
      confirmPasswordInput.current.reportValidity();
      return;
    } else {
      confirmPasswordInput.current.setCustomValidity("");
    }
    localStorage.setItem("Authtoken", token);
    changePassword({
      variables: {
        input: {
          newPassword: passwordInput.current.value,
        },
      },
    })
      .then(() => {
        alert("Your new password has been created successfully");
        logout();
        navigate("/signin");
      })
      .catch((error) => {
        alert(error.message);
        logout();
        navigate("/");
      });
  };

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="Background">
      <div className="Page">
        <div className="container">
          <form className="SignUp" onSubmit={handleSubmit} autoComplete="off">
            {/* Stops chrome autofill: https://gist.github.com/niksumeiko/360164708c3b326bd1c8 */}
            <input
              autoComplete="false"
              name="hidden"
              type="text"
              style={{ display: "none" }}
            />
            <h1>Before we get started...</h1>
            <p>Please create your new password</p>
            <PasswordField
              inputProps={{
                required: true,
                name: "new-password",
                autoComplete: "new-password",
                ref: passwordInput,
                placeholder: "Enter new password",
                pattern: "^(?=.*[a-z])(?=.*[A-Z]).{6,}$",
                title:
                  "Password must contain at least 1 uppercase, 1 lowercase, and a minimum of 6 characters.",
              }}
            />
            <PasswordField
              inputProps={{
                required: true,
                name: "confirm-new-password",
                ref: confirmPasswordInput,
                placeholder: "Confirm new password",
                onChange: () =>
                  confirmPasswordInput.current.setCustomValidity(""),
              }}
            />
            <Button
              disabled={loading}
              type="submit"
              className="register-button"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" />
              ) : (
                <span>Create password</span>
              )}
            </Button>
            {error && <p className="ErrorMessage">{error.message}</p>}
          </form>
        </div>
        <div className="container"></div>
      </div>
    </div>
  );
};

export default ChangePassword;
