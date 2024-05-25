import React from "react";
import { Button } from "reactstrap";
import { useMutation } from "@apollo/client";
import withRouter from "utility/with-router";
import { useNavigate } from "react-router-dom";

import { TEACHERS_FEEDBACK_BY_STUDENT } from "../../../utility/graphQl/mutation";

import constant from "../../../Constant";

const LastMessageWindow = (props) => {
  const navigate = useNavigate();
  const [teacherFeedbackByStudent] = useMutation(TEACHERS_FEEDBACK_BY_STUDENT);

  const handleTeacherFeedbackByStudent = () => {
    teacherFeedbackByStudent({
      variables: {
        input: {
          sessionType: props.sessionType, // "GROUP" //"PRIVATE"
          sessionID: props.sessionId,
          moodAfter: props.moodeAfterFeedBack,
          classRatingID: props.expectationItem,
          teacherCharacteristicsIDList: props.newaboutTeacher,
          notes: props.Note,
          platform: constant.APP_PLATFORM,
        },
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        const companyName = localStorage.getItem("companyName");
        if (
          companyName === "Walking on Earth" ||
          companyName === "WONE Friends & Family"
        ) {
          const typeformFeedbackInputJSON = localStorage.getItem(
            "typeformFeedbackInputJSON"
          );
          if (typeformFeedbackInputJSON) {
            const typeformFeedbackInput = JSON.parse(typeformFeedbackInputJSON);
            const urlParams = new URLSearchParams(
              typeformFeedbackInput
            ).toString();
            window.location.href = `https://walkingonearth.typeform.com/to/CvLqfqNq?${urlParams}`;
          }
        } else if (props.onAfterVideoFeedbackSubmitted) {
          props.onAfterVideoFeedbackSubmitted();
        } else {
          navigate("/user/schedule");
        }
        localStorage.removeItem("typeformFeedbackInputJSON");
        localStorage.removeItem("showBiometricsBubble");
      });
  };

  return (
    <div className="d-flex flex-column align-items-end">
      {!!props.aboutTeacherFeedbackText && (
        <div className="SecondMessageWindow-expectations">
          <p>{props.aboutTeacherFeedbackText}</p>
        </div>
      )}
      <div className="d-flex align-items-end align-self-start message-box">
        <div className="FeedbackByStudentAvatar" />
        <div className="FeedbackByStudentAfterVideo-teacher-message">
          <p>
            Thank you! Please take the learnings from this practice and fill the
            rest of your day with compassion, care and clarity.
          </p>
        </div>
      </div>
      <div className="SecondMessageWindow-chat lastMessageWindow-button">
        <Button
          disabled={props.isBtnDisabled}
          onClick={handleTeacherFeedbackByStudent}
        >
          Alright, thanks!
        </Button>
      </div>
    </div>
  );
};

export default withRouter(LastMessageWindow);
