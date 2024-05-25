import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Logo from "Assets/images/logo.svg";
import styles from "./../sign-in.module.scss";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";
const InvalidLink: React.FC = () => {
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
                  <h3>Something went wrong</h3>
                  <p>
                    We are unable to set up your account at this time, we
                    recommend you reach out to
                    <a
                      rel="noreferrer"
                      href="mailto:support@walkingonearth.com"
                      className="text-primary"
                    >
                      {" support@walkingonearth.com "}
                    </a>
                    for further guidance.
                  </p>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default InvalidLink;
