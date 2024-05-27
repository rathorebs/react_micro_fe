import { Modal } from "reactstrap";
import { SecondaryButton } from "../../../components/buttons";
import CloseIcon from "../../../Assets/Close.svg";
import "./CAdminWelcomeModal.css";
const CAdminWelcomeModal = ({
  showEmployeeWelcome,
  setShowEmployeeWelcome,
  setshowAddEmployeeForm,
}) => {
  return (
    <Modal className="WelcomeVideo-modal" isOpen={true}>
      <div className="WelcomeVideo-modal-content">
        <div className="employee_welcome_title">
          <div className="close_container">
            <img
              onClick={() => {
                setShowEmployeeWelcome(!showEmployeeWelcome);
              }}
              src={CloseIcon}
              alt="Close Button"
            />
          </div>
          <span>Welcome to Walking on Earth</span>
        </div>
        <p className="employee_welcome_dialogue">
          Thank you for joining us on this journey to improve your mental
          wellbeing and eliminate stress. Watch this short video to get you set
          up.
        </p>
        <div className="employee_vidContainer">
          <iframe
            width="800"
            height="443"
            src="https://www.youtube-nocookie.com/embed/pBWxWvLjr74"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="inviteBtn_container">
          <SecondaryButton
            onClick={() => {
              setShowEmployeeWelcome(!showEmployeeWelcome);
              setshowAddEmployeeForm(true);
            }}
          >
            Start inviting members to join
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default CAdminWelcomeModal;
