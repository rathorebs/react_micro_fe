import React from "react";
import { Progress, Modal } from "reactstrap";

import close from "../../../Assets/images/biometrics/close_biometrics.svg";
import "./biometrics.scss";

export const BiometricCollectingData = ({ closeCollectingDataDialog }) => {
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "305px" }}
        className='biometrics-dialog biometric-collecting-data'
      >
        <div
          className='close-icon-container'
          onClick={() => closeCollectingDataDialog(false)}
        >
          <img src={close} alt='close button' />
        </div>
        <h1>We are collecting your data</h1>
        <h6>Please don’t close the app whilst this is happening</h6>
        <div className='pb-container'>
          <Progress value='25' />
          <div className='pb-loading-container'>
            <div className='pb-loading'>Loading...</div>
            <div className='pb-loading-percentage'>25%</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default BiometricCollectingData;
