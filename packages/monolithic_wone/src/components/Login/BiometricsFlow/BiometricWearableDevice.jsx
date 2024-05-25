import React from "react";
import { Button, Modal, ModalFooter } from "reactstrap";
import "./biometrics.scss";

export const BiometricWearableDevice = ({
  biometricsConnectDialog,
  handleDeviceSubmit,
}) => {
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "305px" }}
        className='biometrics-dialog'
      >
        <h1>Do you have a wearable device?</h1>

        <ModalFooter className='button-container'>
          <Button
            className='button dialog-biometric-primary'
            color='primary'
            onClick={() => biometricsConnectDialog(false)}
          >
            No, I don’t
          </Button>
          <Button
            className='button dialog-biometric-secondary'
            color='primary'
            onClick={(e) => handleDeviceSubmit(e)}
          >
            Yes, I do
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default BiometricWearableDevice;
