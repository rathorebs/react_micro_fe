import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { useMutation } from "@apollo/client";
import withRouter from "utility/with-router";
import crossBtn from "../../../Assets/cross-btn.svg";
import "./FormEditFeedback.css";
import { STUDENTS_FEEDBACK_BY_TEACHER } from "../../../utility/graphQl/mutation";
import functions from "../../../functions";

const FormEditFeedback = (props) => {
  const {
    sessionDetailData: { __typename, id, student, groupSession },
    closeForm,
  } = props;
  const [title, settitle] = useState("");
  const [note, setnote] = useState("");
  const [createUpdateTeacherSessionNotes] = useMutation(
    STUDENTS_FEEDBACK_BY_TEACHER
  );

  useEffect(() => {
    document.title =
      `Feedback - ${groupSession?.name} - Sessions - Walking on Earth` ||
      `Feedback`;

    //get added feedback from api
    if (
      !!props.sessionDetailData &&
      !!props.sessionDetailData?.studentfeedbackbyteacherSet?.length
    )
      createUpdateTeacherSessionNotes({
        variables: {
          input: {
            sessionType: functions.getClassSessionType(__typename),
            sessionID: id,
          },
        },
      })
        .then((res) => {
          const {
            createUpdateTeacherSessionNotes: {
              sessionNotes: { title, notes },
            },
          } = res.data;
          settitle(title);
          setnote(notes);
        })
        .catch((err) => {
          console.log(err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlesendFeedback = () => {
    createUpdateTeacherSessionNotes({
      variables: {
        input: {
          sessionType: functions.getClassSessionType(__typename),
          sessionID: id,
          title: title,
          notes: note,
        },
      },
    })
      .then((res) => {
        closeForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handletitleChange = (e) => {
    settitle(e.target.value);
  };

  const handlenoteChange = (e) => {
    setnote(e.target.value);
  };

  const studentName =
    student?.userdetailObj?.userObj.firstName || groupSession?.name;

  return (
    <Modal isOpen={true} style={{ width: "auto", maxWidth: "400px" }}>
      <img
        className="formAddReport-form-crossBtn"
        src={crossBtn}
        alt=""
        onClick={closeForm}
      />
      <ModalBody className="formAddReport-form">
        <h2>Add feedback</h2>
        <div className="formAddReport-title">
          <label>Title of your feedback note</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={handletitleChange}
          />
        </div>
        <div className="formAddReport-notes">
          <label>{`Your note for ${studentName}`}</label>
          <textarea
            name="note"
            value={note}
            cols="30"
            rows="5"
            onChange={handlenoteChange}
          />
        </div>
        <Button onClick={handlesendFeedback}>{`Send Feedback`}</Button>
      </ModalBody>
    </Modal>
  );
};

export default withRouter(FormEditFeedback);
