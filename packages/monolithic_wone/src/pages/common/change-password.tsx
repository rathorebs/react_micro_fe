import React, { useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { PasswordField } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import { CHANGE_PASSWORD } from "utility/graphQl/mutation";
import Logo from "Assets/images/logo.svg";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";
import useQueryParams from "components/commons/hooks/useQueryParams";
import { useAuth } from "providers/auth";
import styles from "./sign-in-create.module.scss";
import constant from "./../../Constant.js";

const ChangePassword: React.FC = () => {
  // const navigate = useNavigate();
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const params = useQueryParams();
  const token = params.get("token");
  const { logout } = useAuth();
  const { onChangeColors } = usePatternBackground();
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);
  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  const handleChangePassword = (event) => {
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
        window.location.href = constant.WEBSITE_URL;
      })
      .catch((error) => {
        alert(error.message);
        logout();
        window.location.href = constant.WEBSITE_URL;
      });
  };

  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className={styles["sign-in-container"]}>
      <Container>
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12">
            <form
              onSubmit={handleChangePassword}
              className={styles["form-container"]}
              autoComplete="off"
            >
              <div className={styles["sign-in-inputs"]}>
                <img src={Logo} alt="WONE Logo" className={styles["logo"]} />
                <div className={styles["input-box-containers"]}>
                  {/* Stops chrome autofill: https://gist.github.com/niksumeiko/360164708c3b326bd1c8 */}
                  <input
                    autoComplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <h3>Before we get started...</h3>
                  <p>Please create your new password</p>
                  <PasswordField
                    inputProps={{
                      required: true,
                      name: "new-password",
                      autoComplete: "new-password",
                      ref: passwordInput,
                      placeholder: "ENTER NEW PASSWORD",
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
                      placeholder: "CONFIRM NEW PASSWORD",
                      onChange: () =>
                        confirmPasswordInput.current.setCustomValidity(""),
                    }}
                  />
                  {error && (
                    <p className={styles["error-message"]}>{error.message}</p>
                  )}
                </div>
              </div>

              <div className={styles["sign-in-buttons"]}>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                  loading={loading}
                  disabled={loading}
                >
                  Create password
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;
