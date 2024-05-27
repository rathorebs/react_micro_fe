import React from "react";
import { Button } from "reactstrap";
import withRouter from "utility/with-router";
import ProgressLinearBar from "../../../components/commons/ProgressLinearBar";
import crossBtn from "../../../Assets/cross-btn.svg";
import "./SecondFeedbackByTeacher.css";

const SecondFeedbackByTeacher = (props) => {
  return (
    <div className="SecondFeedbackByTeacher-container">
      <div className="SecondFeedbackByTeacher-message-window">
        <div className="SecondFeedbackByTeacher-progressor">
          <p>Session completed!</p>
          <img
            src={crossBtn}
            alt=""
            onClick={() => {
              props.navigate("/teacher/schedule", {
                state: {
                  isReportPending: true,
                },
              });
            }}
          />
          <ProgressLinearBar done="70" />
        </div>
        <div className="SecondFeedbackByTeacher-chat">
          <p className="SecondFeedbackByTeacher-teacher-message">{`Hello, how was your session ${
            props.studentName ? `with ${props.studentName}` : ``
          }?
                            Leave a feedback note so you can both document progress over time!`}</p>
          <p className="SecondFeedbackByTeacher-chat-first">I’ll do it later</p>
          <p className="SecondFeedbackByTeacher-chat-second">
            Sure, but don’t forget you have to send it before midnight!
          </p>
          <Button
            className="SecondFeedbackByTeacher-button"
            onClick={() => {
              props.navigate("/teacher/schedule", {
                state: {
                  isReportPending: true,
                },
              });
            }}
          >
            Alright, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SecondFeedbackByTeacher);
