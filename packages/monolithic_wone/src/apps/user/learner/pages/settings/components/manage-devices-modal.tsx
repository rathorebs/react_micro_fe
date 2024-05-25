import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "apps/user/common/components/button";
import { useMutation } from "@apollo/client";
import {
  LEARNER_BIOMETRICS_DISCONNECT_PROVIDER,
  LEARNER_BIOMETRICS_DELETE_HEALTH_DATA,
} from "utility/graphQl/mutation";
import { LearnerBiometricsProvider } from "apps/user/learner/api/types";
import appInfo from "utility/app-info";

import styles from "./styles.module.scss";

interface ManageDevicesModalProps {
  isOpen: boolean;
  setIsOpen?: (value) => void;
  modalData: {
    type: string;
    item: LearnerBiometricsProvider;
  };
  setModalData?: (value, item?) => void;
}

const ManageDevicesModal = ({
  isOpen,
  setIsOpen,
  modalData,
  setModalData,
}: ManageDevicesModalProps) => {
  const [removeDevice, { loading }] = useMutation(
    LEARNER_BIOMETRICS_DISCONNECT_PROVIDER
  );
  const [removeHealthData, { loading: removeHealthLoader }] = useMutation(
    LEARNER_BIOMETRICS_DELETE_HEALTH_DATA
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const deleteDataText =
    "Deleting your health data will remove all biometric results from your session history. Once deleted, it cannot be undone";

  const onConfirm = (data) => {
    const { type, item } = data;
    if (type === "remove-device") {
      removeDevice({
        variables: {
          id: item.id,
          appInfo,
        },
      })
        .then((res) => {
          handleClose();
        })
        .catch((error) => {
          setErrorMessage("Something went wrong, please try again.");
          console.error("Remove device error:", error);
        });
    } else {
      removeHealthData({
        variables: {
          appInfo,
        },
      })
        .then((res) => {
          handleClose();
        })
        .catch((error) => {
          setErrorMessage("Something went wrong, please try again.");
          console.error("Remove health data error:", error);
        });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalData(null);
    setErrorMessage(null);
  };

  return (
    <Modal
      className={styles["manage-devices-modal"]}
      contentClassName={styles["manage-devices-modal-content"]}
      isOpen={isOpen}
      toggle={handleClose}
      style={{ width: "auto", maxWidth: "350px" }}
    >
      <ModalBody>
        <div className={styles["content"]}>
          <p className={styles["title"]}>Are you sure?</p>
          <p className={styles["subtitle"]}>
            {modalData?.type === "remove-device"
              ? `After removing ${modalData?.item?.name} from WONE, you won't be able to track biometric changes during sessions. Past biometric results will still be available in session history.`
              : deleteDataText}
          </p>
        </div>
      </ModalBody>
      <div className={styles["error-div"]}>
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
      </div>
      <ModalFooter className={styles["footer"]}>
        <Button
          loading={loading || removeHealthLoader}
          onClick={() => onConfirm(modalData)}
          className={styles["confirm-button"]}
        >
          {modalData?.type === "remove-device"
            ? "YES, REMOVE DEVICE"
            : "YES, DELETE MY DATA"}
        </Button>
        <Button
          variant="secondary"
          onClick={handleClose}
          className={styles["cancel-button"]}
        >
          cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManageDevicesModal;
