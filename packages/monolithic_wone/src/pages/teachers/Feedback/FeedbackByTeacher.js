import React, { useState } from "react";
import { Button } from "reactstrap";
import { useMutation } from "@apollo/client";
import withRouter from "utility/with-router";
import ProgressLinearBar from "../../../components/commons/ProgressLinearBar";
import crossBtn from "../../../Assets/cross-btn.svg";
import "./FeedbackByTeacher.css";
import { STUDENTS_FEEDBACK_BY_TEACHER } from "../../../utility/graphQl/mutation";
import functions from "../../../functions";

const FeedbackByTeacher = (props) => {
  const [title, settitle] = useState("");
  const [note, setnote] = useState("");
  const [createUpdateTeacherSessionNotes] = useMutation(
    STUDENTS_FEEDBACK_BY_TEACHER
  );

  const handleSendFeedback = () => {
    createUpdateTeacherSessionNotes({
      variables: {
        input: {
          sessionType: functions.getClassSessionType(props.typeName),
          sessionID: props.sessionId,
          title: title,
          notes: note,
        },
      },
    })
      .then((res) => {
        props.navigate("/teacher/schedule");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handletitleChange = (e) => {
    settitle(e.target.value);
  };

  const handlenotChange = (e) => {
    setnote(e.target.value);
  };

  return (
    <div className="FeedbackByTeacher-container">
      <div className="FeedbackByTeacher-message-window">
        <div className="FeedbackByTeacher-progressor">
          <p>Session completed!</p>
          <img
            src={crossBtn}
            alt=""
            onClick={() => {
              props.handleZoomVideoCall();
            }}
          />
          <ProgressLinearBar done="70" />
        </div>
        <div className="FeedbackByTeacher-chat">
          <div className="FeedbackByTeacher-teacher-message">
            <p>{`Hello, how was your session  ${
              props.studentName ? `with ${props.studentName}` : ``
            }?
                            Leave a feedback note so you can both document progress over time!`}</p>
          </div>
          <div className="FeedbackByTeacher-chat-form">
            <div className="FeedbackByTeacher-chat-title">
              <label>Title of your feedback</label>
              <input type="text" name="title" onChange={handletitleChange} />
            </div>
            <div className="FeedbackByTeacher-chat-note">
              <label>Your note for {props.studentName}</label>
              <textarea
                name="note"
                cols="30"
                rows="10"
                placeholder="Write here your report..."
                onChange={handlenotChange}
              ></textarea>
            </div>
            <Button onClick={handleSendFeedback}>{`Send Feedback ${
              props.studentName ? `to ${props.studentName}` : ``
            }`}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FeedbackByTeacher);
