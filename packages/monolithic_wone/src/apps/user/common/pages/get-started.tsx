import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import RedPattern from "apps/wone-generator/assets/patterns/red.json";
import { usePatternBackground } from "providers/pattern-background";

import WoneLogo from "Assets/wone_logo.svg";
import styles from "./get-started.module.scss";

const GetStarted: React.FC = () => {
  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(RedPattern.color.pattern.value);
  }, [onChangeColors]);

  return (
    <div className={styles["get-started-container"]}>
      <Container>
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12">
            <div className={styles["get-started-wrapper"]}>
              <div className={styles["wone-logo-container"]}>
                <img
                  src={WoneLogo}
                  alt=""
                  className={styles["wone-logo-black"]}
                />
              </div>
              <div className={styles["wone-message"]}>
                <h1>
                  At wone <span>with</span>
                  <br /> <span>your</span> health
                </h1>
                <h2>
                  Stress resilience programmes to help <br />
                  you grow into a stronger, healthier self.
                </h2>
                <Link to="/signin"> Next</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default GetStarted;
