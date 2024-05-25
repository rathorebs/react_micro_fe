import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalFooter,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { toast } from "react-toastify";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import close from "../../../Assets/images/biometrics/close_biometrics.svg";
import "./biometrics.scss";

const VITAL_LINK = gql`
  mutation VitalLink($providerId: String!) {
    vitalLink(providerId: $providerId) {
      ok
      token
      url
    }
  }
`;

export const BiometricDeviceList = ({
  deviceList,
  closeDeviceListDialog,
  responseCallback,
  closeTellUsMoreDialog,
  closeCustomDeviceListDialog,
  biometricsConnectDialog,
}) => {
  const [loader, setLoader] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [providerSlug, setProviderSlug] = useState("");
  const [vitalLink] = useMutation(VITAL_LINK);

  const handleSelectDevice = (e) => {
    setLoader(true);

    vitalLink({
      variables: {
        providerId: providerSlug,
      },
    })
      .then((response) => {
        setLoader(false);
        if (response.data.vitalLink.ok === true) {
          closeTellUsMoreDialog(true);
          closeDeviceListDialog(false);
          responseCallback(response.data);
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error while getting token for Vital Link:", error);
        toast.error(
          `Error while getting token for Vital Link: ${error.message}`
        );
      });
  };

  const handelNoDevice = () => {
    closeCustomDeviceListDialog(true);
    closeDeviceListDialog(false);
  };
  const handleOnChange = (e, item) => {
    if (e.target.checked) {
      setProviderSlug(item.slug);
      setBtnStatus(true);
    }
  };
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "305px" }}
        className="biometrics-dialog biometric-device-list"
      >
        <div
          className="close-icon-container"
          onClick={() => biometricsConnectDialog(false)}
        >
          <img src={close} alt="close button" />
        </div>
        <h1>What device do you use?</h1>
        <h6>Please choose from the following list:</h6>
        <div className="device-list-container">
          {deviceList.map((item, index) => (
            <div key={index} className="device-container">
              <FormGroup check className="biometric-device-form">
                <Label check className="biometric-device">
                  <span>{item.name}</span>
                  <Input
                    type="radio"
                    id={item.id}
                    name="deviceList"
                    value={item.name}
                    className="custom-input-radio"
                    onChange={(e) => handleOnChange(e, item)}
                  />

                  <span className="checkmark"></span>
                </Label>
              </FormGroup>
            </div>
          ))}
        </div>

        <ModalFooter className="button-container">
          <div className="no-device" onClick={() => handelNoDevice()}>
            Can't see your device
          </div>

          <Button
            className="button dialog-biometric-secondary"
            color="primary"
            onClick={(e) => handleSelectDevice(e)}
            disabled={!btnStatus}
          >
            Continue
          </Button>
        </ModalFooter>

        {loader && (
          <div className="spinner-container">
            <Spinner
              animation="border"
              variant="primary"
              className="custom-spinner"
            />
          </div>
        )}
      </Modal>
    </>
  );
};
export default BiometricDeviceList;
