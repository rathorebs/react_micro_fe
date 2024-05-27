import React from "react";
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
import constant from "../../../Constant";
import close from "../../../Assets/images/biometrics/close_biometrics.svg";
import "./biometrics.scss";
import { useState } from "react";

const USER_SURVEY = gql`
  mutation UserSurvey($input: UserSurveyInput!) {
    userSurvey(input: $input) {
      ok
    }
  }
`;
export const BiometricTellUsMore = ({ vitalData, biometricsConnectDialog }) => {
  const [loader, setLoader] = useState(false);
  const [userSurvey] = useMutation(USER_SURVEY);
  const [questionnaire, setQuestionnaire] = useState({
    questionOne: "",
    questionTwo: "",
    questionThree: "",
    questionFour: "",
  });

  const handleSelectDevice = (e) => {
    setLoader(true);
    userSurvey({
      variables: {
        input: {
          surveyType: "biometrics_tell_us_more",
          appPlatform: constant.APP_PLATFORM,
          appVersion: constant.APP_VERSION,
          data: {
            questions: [
              {
                question: "How often do you wear this device?",
                answer: questionnaire.questionOne,
              },
              {
                question: "Do you wear it at night?",
                answer: questionnaire.questionTwo,
              },
              {
                question:
                  "How often do you check your wearable device information?",
                answer: questionnaire.questionThree,
              },
              {
                question: "Why did you buy a wearable",
                answer: questionnaire.questionFour,
              },
            ],
          },
        },
      },
    })
      .then((response) => {
        setLoader(false);
        if (response.data.userSurvey.ok === true) {
          const win = window.open(vitalData.vitalLink.url, "_self");
          win.focus();
        }
      })
      .catch((error) => {
        console.error("Error while submitting the tell us more form", error);
        toast.error(
          `Error while submitting the tell us more form: ${error.message}`
        );
        setLoader(false);
      });
  };

  const handleOnChangeTellUsMore = (e) => {
    const { name, value } = e.target;
    setQuestionnaire({ ...questionnaire, [name]: value });
  };
  return (
    <>
      <Modal
        isOpen={true}
        style={{ width: "auto", maxWidth: "305px" }}
        className='biometrics-dialog biometric-tell-more'
      >
        <div
          className='close-icon-container'
          onClick={() => biometricsConnectDialog(false)}
        >
          <img src={close} alt='close button' />
        </div>
        <h1>Tell us more</h1>
        <h6>We would love to know what you use your device for</h6>
        <div className='device-list-container'>
          <FormGroup>
            <Label for='questionOne' className='lbl-questions'>
              How often do you wear this device?
            </Label>
            <Input
              placeholder=''
              id='questionOne'
              name='questionOne'
              onChange={(e) => handleOnChangeTellUsMore(e)}
              className='custom-device-input'
              maxLength='200'
            />
            <Label for='questionTwo' className='lbl-questions'>
              Do you wear it at night?
            </Label>
            <Input
              placeholder=''
              id='questionTwo'
              name='questionTwo'
              onChange={(e) => handleOnChangeTellUsMore(e)}
              className='custom-device-input'
              maxLength='200'
            />
            <Label for='questionThree' className='lbl-questions'>
              How often do you check your wearable device information?
            </Label>
            <Input
              placeholder=''
              id='questionThree'
              name='questionThree'
              onChange={(e) => handleOnChangeTellUsMore(e)}
              className='custom-device-input'
              maxLength='200'
            />
            <Label for='questionFour' className='lbl-questions'>
              Why did you buy a wearable
            </Label>
            <Input
              placeholder=''
              id='questionFour'
              name='questionFour'
              onChange={(e) => handleOnChangeTellUsMore(e)}
              className='custom-device-input'
              maxLength='200'
            />
          </FormGroup>
        </div>

        <ModalFooter className='button-container'>
          <Button
            className='button dialog-biometric-secondary'
            color='primary'
            onClick={(e) => handleSelectDevice(e)}
          >
            {loader ? (
              <div className='spinner-border spinner-border-sm' />
            ) : (
              "Continue"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default BiometricTellUsMore;
