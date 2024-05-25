import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "reactstrap";

import WONELogo from "../../Assets/WONE-logo-linear-grey-01.png";
import HolisticHealthImage from "../../Assets/images/onboarding/holistic-health.jpg";
import TrustedPractitionersImage from "../../Assets/images/onboarding/trusted-practitioners.jpg";
import ScienceBasedImage from "../../Assets/images/onboarding/science-based.jpg";
import { useAuth } from "../../providers/auth";

import "./styles.scss";

const GetStarted = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signin");
  };

  if (!!authToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="Onboarding-Container">
      <div className="Onboarding-Wrapper">
        <div className="GetStarted container">
          <img
            height="100"
            className="Logo"
            src={WONELogo}
            alt="Walking on Earth"
          />
          <ul className="row">
            <li className="HolisticHealth col-12 col-md-4">
              <img
                height="200"
                src={HolisticHealthImage}
                alt="Holistic Health"
              />
              <h2>Holistic Health for Modern Lives</h2>
              <p>
                Book sessions with leading holistic health experts personally
                curated for you.
              </p>
            </li>
            <li className="TrustedPractitioners col-12 col-md-4">
              <img
                height="200"
                src={TrustedPractitionersImage}
                alt="Trusted Practitioners"
              />
              <h2 style={{ padding: "0 0.8rem" }}>Trusted Practitioners</h2>
              <p>
                We’ve done the hard work for you. We review every single
                practitioner to ensure the best in class quality you can trust.
              </p>
            </li>
            <li className="ScienceBased col-12 col-md-4">
              <img height="200" src={ScienceBasedImage} alt="Science Based" />
              <h2 style={{ padding: "0 1.2rem" }}>Science-based plans</h2>
              <p>
                We have sifted through the latest research and spoken to leading
                scientists so you don't have to.
              </p>
            </li>
          </ul>
          <Button className="GetStartedButton" onClick={handleGetStartedClick}>
            Get started
          </Button>
          {/* <p>
            Don't have a subscription? <Link to="/signup">Sign Up</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
