import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import EmailField from "../../components/commons/fields/email";

import "./styles.scss";

import { RESET_PASSWORD } from "../../utility/graphQl/mutation";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  const handleSubmit = (event) => {
    event.preventDefault();

    resetPassword({
      variables: {
        input: {
          email: event.target.email.value,
        },
      },
    }).then((res) => {
      alert(res.data.resetPasswordWithLink.message);
      navigate("/signin");
    });
  };

  return (
    <div className="Background">
      <div className="Page">
        <div className="container">
          <form className="SignUp" onSubmit={handleSubmit}>
            <p>
              Enter the email address associated with your Walking on Earth
              account so we can send you a link to change your password.
            </p>
            <EmailField
              inputProps={{
                required: true,
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
                <span>Reset password</span>
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
