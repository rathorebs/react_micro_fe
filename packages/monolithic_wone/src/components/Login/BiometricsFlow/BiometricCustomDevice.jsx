import React, { useState } from "react";
import { Button, Modal, ModalFooter, Input, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { gql, useMutation } from "@apollo/client";
import constant from "../../../Constant";
import close from "../../../Assets/images/biometrics/close_biometrics.svg";
import "./biometrics.scss";

const USER_SURVEY = gql`
  mutation UserSurvey($input: UserSurveyInput!) {
    userSurvey(input: $input) {
      ok
    }
  }
`;

export const BiometricCustomDeviceList = ({
  closeCustomDeviceListDialog,
  biometricsConnectDialog,
}) => {
  const [loader, setLoader] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [userSurvey] = useMutation(USER_SURVEY);

  const handleSubmitCustomDevice = (e) => {
    setLoader(true);
    userSurvey({
      variables: {
        input: {
          surveyType: "biometrics_missing_device",
          appPlatform: constant.APP_PLATFORM,
          appVersion: constant.APP_VERSION,
          data: {
            questions: [
              {
                question: "Let us know the name of your device.",
                answer: deviceName,
              },
            ],
          },
        },
      },
    })
      .then((response) => {
        setLoader(false);
        if (response.data.userSurvey.ok === true) {
          closeCustomDeviceListDialog(false);
          biometricsConnectDialog(false);
        }
      })
      .catch((error) => {
        console.error("An error occurred while adding a new device:", error);
        toast.error(
          `An error occurred while adding a new device ${error.message}`
        );
        setLoader(false);
      });
  };
  const handleOnChangeCustomDevice = (e) => {
    if (e.target.value.length >= 1) {
      setDeviceName(e.target.value);
      setBtnDisabled(true);
    }
  };
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "305px" }}
        className="biometrics-dialog biometric-custom-device"
      >
        <div
          className="close-icon-container"
          onClick={() => biometricsConnectDialog(false)}
        >
          <img src={close} alt="close button" />
        </div>
        <h1>What device do you use?</h1>
        <h6>Let us know the name of your device.</h6>

        <FormGroup>
          <Input
            placeholder="Your device name"
            onChange={(e) => handleOnChangeCustomDevice(e)}
            className="custom-device-input"
            maxLength="100"
          />
        </FormGroup>

        <ModalFooter className="button-container">
          <Button
            className="button dialog-biometric-secondary"
            color="primary"
            onClick={(e) => handleSubmitCustomDevice(e)}
            disabled={!btnDisabled}
          >
            {loader ? (
              <div className="spinner-border spinner-border-sm" />
            ) : (
              "Submit"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default BiometricCustomDeviceList;
