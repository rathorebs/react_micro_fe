import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MobileDeviceIcon from "Assets/biometrics-modal-image.png";
import QrImage from "Assets/qr.svg";
import styles from "./styles.module.scss";

interface BiometricsDeviceConnectionModalProps {
  isOpen: boolean;
  setIsOpen: (value) => void;
}

const BiometricsDeviceConnectionModal = ({
  isOpen,
  setIsOpen,
}: BiometricsDeviceConnectionModalProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      className={styles["biometrics-modal"]}
      contentClassName={styles["biometrics-modal-content"]}
      isOpen={isOpen}
      toggle={handleClose}
      style={{ width: "auto", maxWidth: "715px" }}
    >
      <ModalHeader
        className={styles["header"]}
        toggle={handleClose}
      ></ModalHeader>
      <ModalBody>
        <div className={styles["content"]}>
          <div className={styles["mobile-devices"]}>
            <img src={MobileDeviceIcon} alt="biometrics-mobile-icon" />
          </div>
          <div className={styles["qr-content"]}>
            <img src={QrImage} alt="qr-icon" />
            <h1 className={styles["title"]}>ADD BIOMETRICS TO WONE</h1>
            <p className={styles["sub-title"]}>
              Use your phone to link your wearable to WONE.
            </p>
            <p className={styles["sub-content"]}>
              It’s quick, easy and secure.
            </p>
            <p className={styles["sub-content-mini"]}>
              Open your phone camera to scan the QR code.
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={styles["modal-footer"]}>
        <div className={styles["footer"]}>
          <h2 className={styles["title"]}>
            Your data is kept private and safe
          </h2>
          <p className={styles["sub-title"]}>
            WONE keeps all your health data private. Your biometric results
            stored in WONE are protected by our privacy policy. Your employer
            doesn’t have access to your personal WONE activity or scores.
          </p>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default BiometricsDeviceConnectionModal;
