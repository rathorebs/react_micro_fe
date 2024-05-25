import React, { useState } from "react";
import { toast } from "react-toastify";
import CrossIcon from "../../Assets/close_icon.svg";
import "./FeedbackDialog.scss";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Spinner from "react-bootstrap/Spinner";
import { gql, useMutation } from "@apollo/client";
import constant from "../../Constant";
const APP_FEEDBACK = gql`
  mutation CreateAppFeedback($input: CreateAppFeedbackInput!) {
    createAppFeedback(input: $input) {
      ok
      appfeedback {
        isPermissionToContact
        text
      }
    }
  }
`;
const FeedbackDialog = ({ closeFeedbackDialog }) => {
  const [count, setCount] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [appFeedback] = useMutation(APP_FEEDBACK);
  const handleChangeCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    if (userFeedback) {
      setLoader(true);
      appFeedback({
        variables: {
          input: {
            platform: constant.APP_PLATFORM,
            isPermissionToContact: isChecked,
            text: userFeedback,
          },
        },
      })
        .then((response) => {
          setLoader(false);
          if (response.data.createAppFeedback.ok) {
            toast.success(`Your feedback was submitted successfully.`);
          }
          closeFeedbackDialog(false);
        })
        .catch((error) => {
          setErrorMessage("Could not submit feedback. Please try again later.");
        });
    }
    closeFeedbackDialog(false);
  };

  const handleChangeTextbox = (event) => {
    setCount(2000 - event.target.value.length);
    setUserFeedback(event.target.value);
  };
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "517px" }}
        className="feedback-dialog custom-practitioner"
      >
        <div className="modal-custom-header">
          <span className="close-btn-container">
            <img
              src={CrossIcon}
              alt=""
              onClick={() => {
                closeFeedbackDialog(false);
              }}
            />
          </span>
        </div>
        <h1>Submit Feedback</h1>
        <ModalBody className="feedback-body-container">
          <FormGroup>
            <Label for="exampleText">
              We welcome any feedback you have, please add this below
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              placeholder="Your feedback..."
              onChange={handleChangeTextbox}
              maxLength="2000"
              className="feedback-textarea"
            />
            <Label for="exampleText" className="feedback-counter">
              {count}/2000
            </Label>
            <>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <FormGroup check className="form-group-container">
            <Input
              type="checkbox"
              checked={isChecked}
              onChange={handleChangeCheckbox}
            />
            <Label check>
              Can we contact you with further questions about your comments?
            </Label>
          </FormGroup>

          <Button
            className="dialog-feedback-btn"
            color="primary"
            onClick={(e) => handleFeedbackSubmit(e)}
          >
            Submit
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
export default FeedbackDialog;
