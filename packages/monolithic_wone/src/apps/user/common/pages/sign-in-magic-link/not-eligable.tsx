import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Logo from "Assets/images/logo.svg";
import styles from "./../sign-in.module.scss";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { Button } from "apps/user/common/components/button";
import { usePatternBackground } from "providers/pattern-background";
import { Link } from "react-router-dom";

const NotEligable: React.FC = () => {
  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  return (
    <div className={styles["invalid-link-container"]}>
      <Container>
        <Row>
          <Col>
            <form className={styles["form-container"]}>
              <div className={styles["sign-in-inputs"]}>
                <img src={Logo} alt="WONE Logo" className={styles["logo"]} />
                <div className={styles["input-box-containers"]}>
                  <h3>Not eligable</h3>
                  <p className={styles["not-eligable-subtitle"]}>
                    We apologise, but the email you provided doesn't match any
                    of our current WONE member companies. To join as a member,
                    please contact our sales team. If you think this is an
                    error, please reach out to us for assistance.
                  </p>
                </div>
              </div>
              <div className={styles["sign-in-buttons"]}>
                <Link to="/signin/magiclink">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                  >
                    Try different email
                  </Button>
                </Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default NotEligable;
