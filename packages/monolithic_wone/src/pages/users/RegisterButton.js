import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import JoinButton from "./JoinButton";
import functions from "../../functions";
import { getDayType } from "../../utility/Function";
import delete_img from "../../Assets/delete.svg";

const RegisterButton = (props) => {
  const {
    session,
    handleRegisterPress,
    loading,
    handleunRegisterPress,
    showUnRegBtn,
    listPosition,
    listName,
  } = props;

  const studentId = localStorage.getItem("WOEstudentUserId");
  let isRegistered =
    session?.isRegistered ||
    session?.groupsessionpeoplejoiningSet?.findIndex(
      (e) => e.user?.id === studentId
    ) > -1;
  if (session?.__typename === "ClassSessionType") {
    isRegistered = true;
  }
  const [isRegisterButtonUI, upDateRegisterButtonUI] = useState(false);
  const [isSessionComplete, toggleSessionEnd] = useState(false);
  const [buttonLoading, setLoading] = useState(false);

  const handleButtonClick = (e) => {
    setLoading(true);
    handleRegisterPress(e, session, listName, listPosition);
  };

  useEffect(() => {
    if (!loading && buttonLoading) {
      setLoading(false);
    }
  }, [loading, buttonLoading]);

  useEffect(() => {
    if (session?.__typename === "ClassSessionType") {
      upDateRegisterButtonUI(true);
    }
  }, [session]);

  let dayType = getDayType(session);

  /**
   * function used to check if date is from previous day
   */
  if (!!session?.instanceStartDateTime) {
    const { instanceStartDateTime, instanceEndDateTime } = session;
    const sessionStatus = functions.getSessionDeadLine(
      instanceStartDateTime,
      instanceEndDateTime
    );
    if (sessionStatus.isAfter) {
      dayType = "previousDay";
    }
  }

  return (
    <>
      {!isRegisterButtonUI && (
        <Button
          disabled={buttonLoading || isRegistered || isSessionComplete}
          onClick={handleButtonClick}
          className="register-button hand-cursor mt-2 mt-md-0"
        >
          {buttonLoading && (
            <div className="spinner-border spinner-border-sm mr-2" />
          )}
          {isSessionComplete
            ? "Session completed"
            : isRegistered
            ? `You’re booked!`
            : `Register`}
        </Button>
      )}
      {
        <JoinButton
          {...props}
          today={dayType}
          res={session}
          isRegistered={isRegistered}
          componentFrom={"registerBtn"}
          toggleSessionEnd={toggleSessionEnd}
          isSessionComplete={isSessionComplete}
          upDateRegisterButtonUI={upDateRegisterButtonUI}
          listPosition={listPosition}
          listName={listName}
        />
      }
      {!!session.isRegistered && !isSessionComplete && showUnRegBtn && (
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
export default RegisterButton;
