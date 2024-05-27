import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Base64 } from "js-base64";

import withRouter from "utility/with-router";
import { useAuth, STUDENT_ROLE, TEACHER_ROLE } from "../../contexts/auth";
import EmailField from "../../components/commons/fields/email";
import PasswordField from "../../components/commons/fields/password";
import RememberMe from "../../components/commons/fields/remember-me";
import { Email, Password } from "../../components/fields";
import { Primary, Secondary } from "../../components/buttons/index.tsx";

import "./styles.scss";

const SignIn = ({ router: { navigate, location } }) => {
  const { login, loading, error, authToken } = useAuth();

  const pathname = location.state?.from?.pathname;
  const search = location.state?.from?.search;
  const query = () => new URLSearchParams(search);
  const email = query().get("user_email");

  const handleSignIn = async (event) => {
    event.preventDefault();

    const result = await login({
      email: event.target.email.value.toLowerCase(),
      password: event.target.password.value,
    });

    if (event.target.remeberme.checked) {
      const objJsonStr = JSON.stringify({
        username: event.target.email.value.toLowerCase(),
      });

      const objJsonB64 = Base64.encode(objJsonStr);
      localStorage.setItem("RememberMe", objJsonB64);
    } else {
      localStorage.removeItem("RememberMe");
    }

    if (pathname) {
      navigate(pathname, { state: search });
    } else if (result.user && result.roleType === STUDENT_ROLE) {
      navigate("/user/sessions");
    } else if (result.user && result.roleType === TEACHER_ROLE) {
      navigate("/teacher/schedule");
    } else if (result.user) {
      throw new Error(
        `Unexpected role type ${result.roleType} for user with id ${result.user.id}`
      );
    }
  };

  if (authToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="Background">
      <div className="Page">
        <div className="container">
          <form className="SignUp" onSubmit={handleSignIn}>
            <h1>Welcome!</h1>
            <Email
              email={email}
              inputProps={{
                required: true,
              }}
            />
            <Password
              inputProps={{
                required: true,
              }}
            />
            <EmailField
              email={email}
              inputProps={{
                required: true,
              }}
            />
            <PasswordField
              inputProps={{
                required: true,
              }}
            />
            <RememberMe
              inputProps={{
                required: false,
              }}
            />
            <Primary
              disabled={loading}
              outline={true}
              type="submit"
              className="btn-primary-sign-in"
              /* color="link" */
              /* href="#"
              tag="a" */
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" />
              ) : (
                <span>Sign In</span>
              )}
            </Primary>
            {/* <Button
              disabled={loading}
              type="submit"
              className="register-button"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" />
              ) : (
                <span>Sign In</span>
              )}
            </Button> */}
            <Secondary
              /* outline={true}
              type="submit" */
              href="/signin/reset"
              tag="a"
              className="btn-secondary-sign-in"
            >
              Don’t have an account? Register
            </Secondary>
            {error && <p className="ErrorMessage">{error.message}</p>}
            <p className="CallToSignIn">
              Forgot your password?{" "}
              <Link to="/signin/reset">Let us help you</Link>
            </p>
          </form>
        </div>
        <div className="container">
          <p className="Footer">
            By signing in, you agree to Walking on Earth’s{" "}
            <a
              href="https://www.walkingonearth.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
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

export default withRouter(SignIn);
