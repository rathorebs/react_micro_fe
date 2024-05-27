import "./biometric-elements.styles.scss";
import heartIcon from "../../../Assets/heart_icon.svg";
import { GiFootprint } from "react-icons/gi";
import { BsAlarm } from "react-icons/bs";
const BiometricElement = ({ isSideBarOpen, showSideBar, biometricData }) => {
  return (
    <div
      className={`bio-elements-container ${
        (!isSideBarOpen || showSideBar) && "bio-elements-container-closed"
      } `}
    >
      <div>
        {biometricData.lastMeasuredHeartrate && (
          <div className="heart-beat-count">
            <img src={heartIcon} alt="heart_icon" />
            <span>{biometricData.lastMeasuredHeartrate}</span>
          </div>
        )}
        {biometricData.stepCount > 0 && (
          <div className="foot-count">
            <GiFootprint />
            <span>{biometricData.stepCount}</span>
          </div>
        )}
        {biometricData.lastNightsSleep && (
          <div className="sleep-count">
            <BsAlarm />
            <span>{biometricData.lastNightsSleep}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default BiometricElement;
