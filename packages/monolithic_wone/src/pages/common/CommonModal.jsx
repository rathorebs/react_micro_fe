import { Modal, ModalBody } from "reactstrap";

const CommonModal = ({ children }) => {
  return (
    <Modal className="addEmployee-wrapper" isOpen={true}>
      <ModalBody className="addEmployee-form">{children}</ModalBody>
    </Modal>
  );
};

export default CommonModal;
