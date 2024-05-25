import React, { useEffect, useCallback, useState } from "react";
import { Container, Row, Col, FormGroup, Label } from "reactstrap";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import withRouter, { Router } from "utility/with-router";
import { useAuth, STUDENT_ROLE, TEACHER_ROLE } from "providers/auth";
import { Email, Password } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";

import appInfo from "utility/app-info";

import Logo from "Assets/images/logo.svg";
import MagicLinkIcon from "Assets/holidays-calendar.svg";
import MicrosoftIcon from "Assets/microsofticon.svg";
import GoogleIcon from "Assets/googleicon.svg";

import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";

import styles from "./sign-in.module.scss";
import SignInButton from "../components/signinbutton";

export type SignInProps = {
  router: Router;
};

const SignIn: React.FC<SignInProps> = ({ router: { navigate, location } }) => {
  const [shouldLogInWithToken, setShouldLogInWithToken] = React.useState(true);
  const [keepMeSignIn, setKeepMeSignIn] = useState(false);
  const [emailData, setEmailData] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithToken, logout, loading, error, user } = useAuth();
  const { onChangeColors } = usePatternBackground();

  const pathname = location.state?.from?.pathname;
  const search = location.state?.from?.search;

  const query = new URLSearchParams(search);
  const email = query.get("user_email");

  const redirectError = new URLSearchParams(search ?? location?.search).get(
    "error"
  );
  const redirectToken = new URLSearchParams(search ?? location?.search).get(
    "token"
  );
  const authBackend = new URLSearchParams(search ?? location?.search).get(
    "auth_backend"
  );

  const actionType = new URLSearchParams(search ?? location?.search).get(
    "action"
  );

  const handleToken = useCallback(() => {
    if (redirectToken && shouldLogInWithToken) {
      if (user) {
        logout();
      }

      setShouldLogInWithToken(false);
      loginWithToken(redirectToken, authBackend, actionType);
    }
  }, [
    loginWithToken,
    logout,
    shouldLogInWithToken,
    user,
    redirectToken,
    authBackend,
    actionType,
  ]);

  const handleLoginFailedAnalytics = useCallback(() => {
    if (redirectError && authBackend) {
      logAnalyticsEvent("login_failed", {
        channel: authBackend,
      });
    }
  }, [redirectError, authBackend]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  useEffect(() => {
    handleLoginFailedAnalytics();
  }, [handleLoginFailedAnalytics]);

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  useEffect(() => {
    if (localStorage.getItem("keepMeSignInData")) {
      setKeepMeSignIn(true);
      const loginUserData = CryptoJS.AES.decrypt(
        localStorage.getItem("keepMeSignInData"),
        process.env.REACT_APP_CRYPTO_JS_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      const loginUserExtractData = JSON.parse(loginUserData);
      setEmailData(loginUserExtractData.email);
      setPassword(loginUserExtractData.password);
    }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const result = await login(
      {
        input: {
          email: event.target.email.value.toLowerCase(),
          password: event.target.password.value.trim(),
        },
        appInfo,
      },
      keepMeSignIn
    );
    if (pathname) {
      if (pathname.startsWith("/onboard")) {
        navigate(`/onboard${search ? search : ""}`, { state: search });
      } else {
        if (search.includes("error")) {
          navigate(`/user/sessions`);
        } else {
          navigate(`${pathname}${search ? search : ""}`, { state: search });
        }
      }
    } else if (result.user && result.roleType === STUDENT_ROLE) {
      navigate(`/user/sessions${search ? search : ""}`);
    } else if (result.user && result.roleType === TEACHER_ROLE) {
      navigate(`/teacher/schedule${search ? search : ""}`);
    } else if (result.user) {
      throw new Error(
        `Unexpected role type ${result.roleType} for user with id ${result.user.id}`
      );
    }
  };

  return (
    <div className={styles["sign-in-container"]}>
      <Container>
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12">
            <form onSubmit={handleSignIn} className={styles["form-container"]}>
              <div className={styles["sign-in-inputs"]}>
                <img src={Logo} alt="WONE Logo" className={styles["logo"]} />
                <div className={styles["input-box-containers"]}>
                  <h3>Sign in</h3>
                  <p className={styles["need-account"]}>
                    {`Need a WONE account? `}
                    <Link
                      rel="noreferrer"
                      to="/signup"
                      className="text-decoration-underline"
                    >
                      {"Sign up"}
                    </Link>
                  </p>
                  <div className={styles["signin-button-container"]}>
                    <a
                      href={process.env.REACT_APP_SIGN_IN_WITH_GOOGLE}
                      className={styles["button-azure-ad"]}
                    >
                      <SignInButton
                        title={"Sign in with Google"}
                        image={GoogleIcon}
                      />
                    </a>
                    <a
                      href={process.env.REACT_APP_SIGN_IN_WITH_AZURE_AD_URL}
                      className={styles["button-azure-ad"]}
                    >
                      <SignInButton
                        title={"Sign in with Microsoft"}
                        image={MicrosoftIcon}
                      />
                    </a>
                    <Link to="/signin/magiclink">
                      <SignInButton
                        title={"Sign in with Magic link"}
                        image={MagicLinkIcon}
                      />
                    </Link>
                  </div>
                  <p className={styles["need-account"]}>
                    OR sign in with email and password
                  </p>
                  <Email
                    email={email}
                    inputProps={{
                      required: true,
                      defaultValue: emailData,
                    }}
                  />
                  <Password
                    inputProps={{
                      required: true,
                      defaultValue: password,
                    }}
                  />
                  <FormGroup
                    className={styles["keep-me-signin-container"]}
                    check
                  >
                    <Label className={styles["label-option"]} check>
                      Keep me signed in
                    </Label>
                    <input
                      type="checkbox"
                      className={styles["custom-input-checkbox"]}
                      checked={keepMeSignIn}
                      onChange={() => setKeepMeSignIn((prev) => !prev)}
                    />
                    <span className={styles["checkmark"]}></span>
                  </FormGroup>
                  {(redirectError || error) && (
                    <p className={styles["error-message"]}>
                      {redirectError ?? error.message}
                    </p>
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
                  Sign In
                </Button>

                <p className={styles["forgot-password-link"]}>
                  <Link to="/signin/reset">Forgot your password?</Link>
                </p>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(SignIn);
