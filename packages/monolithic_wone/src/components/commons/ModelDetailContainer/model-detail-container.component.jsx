import React from "react";
import { Modal, ModalBody } from "reactstrap";
import "./model-detail-container.styles.scss";

const ModelDetailContainer = ({ modelToogle, children, modelClass }) => {
  return (
    <Modal
      animation={false}
      centered
      isOpen={true}
      toggle={modelToogle}
      className={`${modelClass ? modelClass : null} customModel`}
    >
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
export default ModelDetailContainer;
