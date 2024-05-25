import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Button } from "reactstrap";

import EmailField from "../../components/commons/fields/email";
import PasswordField from "../../components/commons/fields/password";
import { clearStorage } from "../../utility/Function";
import { useAuth } from "../../providers/auth";
import { logAnalyticsEvent } from "../../utility/FirebaseAnalytics";

import "./styles.scss";

const SIGN_UP = gql`
  mutation CreateStudentDetail($input: StudentDetailCreateInput!) {
    createStudentdetail(input: $input) {
      ok
      Token
      studentDetail {
        userdetailObj {
          userObj {
            id
            firstName
            lastName
            username
            email
          }
          photo
          role {
            id
            name
          }
          studentdetail {
            id
            availableCredits
            isSubscribed
            subscriptionExipiryDate
            location {
              id
              name
            }
            company {
              id
              name
            }
            plans {
              id
              name
              displayPhrase
            }
            pillar {
              name
              displayPhrase
            }
            onboarding {
              id
            }
          }
          teacherdetail {
            id
          }
        }
      }
    }
  }
`;

const SignUp = () => {
  const { authToken, handleUser, setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  const handleSignUp = (event) => {
    event.preventDefault();

    signUp({
      variables: {
        input: {
          email: event.target.email.value.toLowerCase(),
          password: event.target["new-password"].value,
          roles: [2],
        },
      },
    }).catch((error) => console.log("signUp error:", error));
  };

  useEffect(() => {
    if (data && data.createStudentdetail && data.createStudentdetail.ok) {
      const {
        Token,
        studentDetail: { userdetailObj },
      } = data.createStudentdetail;

      const userId = userdetailObj.userObj.id;
      const companyName = userdetailObj.studentdetail.company.name || "NA";

      logAnalyticsEvent("sign_up", {
        user_id: userId,
        user_id_wone: userId,
        company_name: companyName,
      });

      const user = {
        id: userdetailObj.userObj.id,
        firstName: userdetailObj.userObj.firstName,
        lastName: userdetailObj.userObj.lastName,
        username: userdetailObj.userObj.username,
        email: userdetailObj.userObj.email,
        userdetail: userdetailObj,
      };

      clearStorage();

      localStorage.setItem("Authtoken", Token);
      localStorage.setItem("shouldOnboard", "true");

      setAuthToken(Token);
      handleUser(user);

      navigate("/onboard");
    }
  }, [data, history, handleUser, setAuthToken]);

  if (!!authToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="Background">
      <div className="Page">
        <div className="container">
          <form className="SignUp" onSubmit={handleSignUp} autoComplete="off">
            {/* Stops chrome autofill: https://gist.github.com/niksumeiko/360164708c3b326bd1c8 */}
            <input
              autoComplete="false"
              name="hidden"
              type="text"
              style={{ display: "none" }}
            />
            <h1>We’re so pleased to meet you</h1>
            <EmailField
              inputProps={{
                required: true,
              }}
            />
            <PasswordField
              inputProps={{
                required: true,
                name: "new-password",
                autoComplete: "new-password",
                pattern: "^(?=.*[a-z])(?=.*[A-Z]).{6,}$",
                title:
                  "Password must contain at least 1 uppercase, 1 lowercase, and a minimum of 6 characters.",
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
                <span>Sign Up</span>
              )}
            </Button>
            {error && (
              <p className="ErrorMessage">
                {error.message.match("already exists")
                  ? "Sorry, this email has already been registered."
                  : error.message}
              </p>
            )}
            <p className="CallToSignIn">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
        <div className="container">
          <p className="Footer">
            By signing up, you agree to Walking on Earth’s{" "}
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

export default SignUp;
