import React, { useState } from "react";
import { Button } from "reactstrap";
import { capitalizeFirstLetter } from "../../../utility/Function";

const SecondMessageWindow = ({
  dataFCL,
  expectationItemName,
  isSecondMessageWindow,
  handleVideoCallFourth,
}) => {
  const [newaboutTeacher, setnewaboutTeacher] = useState([]);
  const [aboutTextFeedbackVal, setAboutTextFeedbackVal] = useState([]);
  const [Note, setNote] = useState("");
  const aboutTeacher = dataFCL.feedbackCharacteristicList;
  const teacherfirstName = localStorage.getItem("teacherfirstName");

  const handleTeacherFeedbackOptionClick = (item) => {
    const isAvailable = newaboutTeacher.indexOf(item.id);
    if (isAvailable === -1) {
      setnewaboutTeacher([...newaboutTeacher, item.id]);
      setAboutTextFeedbackVal([
        ...aboutTextFeedbackVal,
        capitalizeFirstLetter(item.name),
      ]);
    } else {
      newaboutTeacher.splice(isAvailable, 1);
      aboutTextFeedbackVal.splice(isAvailable, 1);
      setnewaboutTeacher([...newaboutTeacher]);
      setAboutTextFeedbackVal([...aboutTextFeedbackVal]);
    }
  };

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setNote(e.target.value);
  };

  const handleDoneButtonClick = () => {
    handleVideoCallFourth(newaboutTeacher, Note, aboutTextFeedbackVal);
    localStorage.removeItem("teacherfirstName");
  };

  return (
    <>
      <div className="d-flex flex-column align-items-end">
        <div className="SecondMessageWindow-expectations">
          <p> {expectationItemName} </p>
        </div>
        <div className="SecondMessageWindow-chat">
          <div className="d-flex align-items-end message-box">
            <div className="FeedbackByStudentAvatar" />
            <div className="FeedbackByStudentAfterVideo-teacher-message">
              <p>
                {" "}
                I really appreciate your feedback.
                <strong className="d-block">
                  How did you find {teacherfirstName || "your teacher"} ? Choose
                  one or more.{" "}
                </strong>
              </p>
            </div>
          </div>
          {!!isSecondMessageWindow && (
            <div className="SecondMessageWindow-student-aboutTeacher">
              <div className="SecondMessageWindow-student-mood">
                {aboutTeacher &&
                  aboutTeacher.map((item) => {
                    return (
                      <p
                        key={item.id}
                        className={`feedbackBtn ${
                          !!newaboutTeacher.filter((id) => id === item.id)
                            .length
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() => handleTeacherFeedbackOptionClick(item)}
                      >
                        {item.name}
                      </p>
                    );
                  })}
              </div>
              <textarea
                onChange={handleTextAreaChange}
                name="note"
                placeholder="Write here any other feedback you’d like to share..."
              ></textarea>
              <Button onClick={handleDoneButtonClick}>Done</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SecondMessageWindow;
