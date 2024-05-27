import React from "react";
import { Button, Modal, ModalFooter } from "reactstrap";
import "./biometrics.scss";

export const BiometricDataSynch = ({
  closeBiometricDataSynchDialog,
  setCloseDataSynchDialog,
}) => {
  const handleDataSynch = () => {
    setCloseDataSynchDialog(false);
  };
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "305px" }}
        className='biometrics-dialog'
      >
        <h1>Are you sure you want to cancel?</h1>
        <h6>Stopping this sync will mean you need to start again.</h6>

        <ModalFooter className='button-container'>
          <Button
            className='button dialog-biometric-primary'
            color='primary'
            onClick={() => closeBiometricDataSynchDialog(false)}
          >
            No, I don’t
          </Button>
          <Button
            className='button dialog-biometric-secondary'
            color='primary'
            onClick={(e) => handleDataSynch(e)}
          >
            Yes, I do
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default BiometricDataSynch;
