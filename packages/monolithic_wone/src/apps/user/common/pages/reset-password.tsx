import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "utility/graphQl/mutation";
import { Email } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import BackArrow from "Assets/icon/backArrow.svg";
import styles from "./sign-in.module.scss";

import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword({
      variables: {
        input: {
          email: event.target.email.value,
        },
      },
    })
      .then((res) => {
        alert(res.data.resetPasswordWithLink.message);
        navigate("/signin");
      })
      .catch((error) => {
        console.log("Reset password error:", error);
      });
  };

  const handleBackButton = () => {
    navigate("/signin");
  };

  return (
    <div className={styles["reset-pass-container"]}>
      <Container>
        <Row>
          <Col>
            <form onSubmit={handleSubmit} className={styles["form-container"]}>
              <div className={styles["sign-in-inputs"]}>
                <img
                  src={BackArrow}
                  alt="WONE Logo"
                  className={styles["back-button"]}
                  onClick={handleBackButton}
                />
                <div className={styles["input-box-containers"]}>
                  <p>
                    Enter the email address associated with your Walking on
                    Earth account so we can send you a link to change your
                    password.
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
                  Reset password
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
