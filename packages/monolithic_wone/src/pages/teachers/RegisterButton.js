import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import functions from "../../functions";
import { getDayType } from "../../utility/Function";
import moment from "moment";
import delete_img from "../../Assets/delete.svg";

const RegisterButton = (props) => {
  const {
    handleClickToJoin,
    session,
    handleAddEditFeedback,
    handleRegisterPress,
    loading,
    showUnRegBtn,
    handleunRegisterPress,
    listName,
    listPosition,
  } = props;
  const [buttonLoading, setLoading] = useState(false);

  const renderRegButton = (btnLabel) => {
    return (
      <>
        <Button disabled className="btn btn-secondary register-button">
          {" "}
          {btnLabel}
        </Button>
        {!!functions.checkIsSessionRegOrNot(session) && showUnRegBtn && (
          <p
            onClick={(e) =>
              handleunRegisterPress(session, listName, listPosition)
            }
            className="d-flex align-items-center hand-cursor light remove-plan mt-3"
          >
            <img className="mr-2" src={delete_img} alt="books" />
            Remove from my plan
          </p>
        )}
      </>
    );
  };

  const handleButtonClick = (e) => {
    setLoading(true);
    handleRegisterPress(e, session, listName, listPosition);
  };

  useEffect(() => {
    if (!loading && buttonLoading) {
      setLoading(false);
    }
  }, [loading, buttonLoading]);

  const startTimeDB = session.instanceStartDateTime || session.startDateTime;
  const endTimeDB = session.instanceEndDateTime || session.endDateTime;

  let localDateTime = moment(new Date()).format("YYYY-MM-DD HH:mm");

  let localStartDateTime = moment.utc(`${startTimeDB}`).toDate();
  let localEndDateTime = moment.utc(`${endTimeDB}`).toDate();

  let localStartTime = moment(
    moment(localStartDateTime).format("YYYY-MM-DD HH:mm"),
    "YYYY-MM-DD HH:mm"
  );

  let localEndTime = moment(
    moment(localEndDateTime).format("YYYY-MM-DD HH:mm"),
    "YYYY-MM-DD HH:mm"
  );
  let localTime1 = moment(
    moment(localDateTime).format("YYYY-MM-DD HH:mm"),
    "YYYY-MM-DD HH:mm"
  );

  let before5MinuteTime1 = moment(
    moment(localStartTime, "YYYY-MM-DD HH:mm")
      .subtract(16, "minutes")
      .format("YYYY-MM-DD HH:mm"),
    "YYYY-MM-DD HH:mm"
  );
  let myButtonObject = functions.calculateTimeDiffTwo(session, 16);
  let diff1 = myButtonObject.result;
  let isBetween1 = localTime1.isBetween(before5MinuteTime1, localEndTime);
  let isBefore1 = localTime1.isBefore(before5MinuteTime1);
  let isAfter1 = localTime1.isAfter(localEndTime);
  let isSame1 = localTime1.isSame(before5MinuteTime1);

  const areYouATeacher = functions.checkIfYouAreATeacher(session);

  if (getDayType(session) === "today") {
    if (isAfter1) {
      return (
        <Button
          className="btn btn-secondary register-button bg-orange"
          onClick={(e) => handleAddEditFeedback(e, session)}
        >
          {!!session.studentfeedbackbyteacherSet &&
          session.studentfeedbackbyteacherSet[0]
            ? `Edit Feedback`
            : `Add Feedback`}
        </Button>
      );
    } else if (isBefore1) {
      if (!areYouATeacher && session.__typename !== "ClassSessionType") {
        if (functions.checkIsSessionRegOrNot(session)) {
          return renderRegButton("You are Booked");
        }
        return (
          <Button
            onClick={handleButtonClick}
            className="btn btn-secondary register-button"
          >
            {buttonLoading && (
              <div className="spinner-border spinner-border-sm mr-2" />
            )}
            Register
          </Button>
        );
      } else {
        return renderRegButton(diff1);
        // return (<Button disabled className="btn btn-secondary register-button"> {diff1} </Button> )
      }
      //return renderRegButton(diff1);
      // ( <Button disabled className="btn btn-secondary register-button"> {diff1} </Button> )
    } else if (isBetween1 || isSame1) {
      return (
        <Button
          className="hand-cursor register-button bg-orange"
          onClick={(e) => handleClickToJoin(e, session, listName, listPosition)}
        >
          {session.isLeadingTheSession ? "Start Session" : "Join Session"}
        </Button>
      );
    } else {
      return (
        <Button disabled className="btn btn-secondary register-button">
          {" "}
          Session completed{" "}
        </Button>
      );
    }
  } else {
    if (!areYouATeacher && session.__typename !== "ClassSessionType") {
      if (functions.checkIsSessionRegOrNot(session)) {
        return renderRegButton("You are Booked");
        // return (<>
        //   <Button disabled className="btn btn-secondary register-button"> You are Booked </Button>
        //   {!!functions.checkIsSessionRegOrNot(session) && showUnRegBtn && (
        //     <p
        //       onClick={(e) => handleunRegisterPress(session)}
        //       className="d-flex align-items-center hand-cursor light remove-plan mt-3"
        //     >
        //       <img className="mr-2" src={delete_img} alt="books" />
        //       Remove from my plan
        //     </p>
        //   )}
        // </>)
      }
      return (
        <Button
          onClick={handleButtonClick}
          className="btn btn-secondary register-button"
        >
          {buttonLoading && (
            <div className="spinner-border spinner-border-sm mr-2" />
          )}
          Register
        </Button>
      );
    } else {
      return renderRegButton(diff1);
      // return (<Button disabled className="btn btn-secondary register-button"> {diff1} </Button> )
    }
  }
};
export default RegisterButton;
