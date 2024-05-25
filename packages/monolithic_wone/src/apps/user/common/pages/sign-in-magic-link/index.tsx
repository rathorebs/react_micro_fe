import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { REQUEST_SIGN_IN_WITH_MAGIC_LINK } from "utility/graphQl/mutation";
import { Email } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import Logo from "Assets/images/logo.svg";
import appInfo from "utility/app-info";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";

import styles from "./../sign-in.module.scss";

const SignInMagiclink: React.FC = () => {
  const navigate = useNavigate();
  const [requestSignInWithMagicLink, { loading, error }] = useMutation(
    REQUEST_SIGN_IN_WITH_MAGIC_LINK,
    {
      fetchPolicy: "no-cache",
    }
  );
  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    requestSignInWithMagicLink({
      variables: {
        appInfo: appInfo,
        email: event.target.email.value,
      },
    })
      .then((res) => {
        alert(res.data.requestSignInWithMagicLink.message);
        navigate("/signin");
      })
      .catch((error) => {
        console.log("Sign in with magic link error:", error);
      });
  };

  return (
    <div className={styles["reset-pass-container"]}>
      <Container>
        <Row>
          <Col>
            <form onSubmit={handleSubmit} className={styles["form-container"]}>
              <div className={styles["sign-in-inputs"]}>
                <img src={Logo} alt="WONE Logo" className={styles["logo"]} />
                <div className={styles["input-box-containers"]}>
                  <h3>Sign in with magic link</h3>
                  <p className={styles["need-account"]}>
                    {`Need a WONE account? `}
                    <Link to="/signup" className="text-decoration-underline">
                      {"Sign up"}
                    </Link>
                  </p>
                  <p className={styles["magic-link-heading"]}>
                    Get a magic link sent to your email to log in without a
                    password. You’ll stay logged in for the next 30 days
                  </p>

                  <Email
                    inputProps={{
                      required: true,
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
                  Send me link
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default SignInMagiclink;
