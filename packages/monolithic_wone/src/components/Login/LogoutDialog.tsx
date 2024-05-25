import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "apps/user/common/components/button";

import styles from "./LogoutDialog.module.scss";

interface Props {
  closeLogoutDialog: (value: boolean) => void;
  closeAfterYes: () => void;
}

const LogoutDialog = ({ closeLogoutDialog, closeAfterYes }: Props) => {
  const toggle = () => {
    closeLogoutDialog(false);
  };

  return (
    <Modal
      isOpen={true}
      style={{ width: "auto", maxWidth: "400px" }}
      className={styles["modal"]}
      contentClassName={styles["modal-content"]}
      toggle={toggle}
    >
      <ModalHeader className={styles["header"]} toggle={toggle}>
        Logging out
      </ModalHeader>
      <ModalBody className={styles["body"]}>
        <p>Are you sure you want to log out?</p>
      </ModalBody>
      <ModalFooter className={styles["footer"]}>
        <Button
          variant="secondary"
          onClick={() => {
            closeLogoutDialog(false);
          }}
        >
          No
        </Button>
        <Button variant="primary" action="join" onClick={closeAfterYes}>
          YES
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LogoutDialog;
