import React from "react";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

import { Button } from "reactstrap";
import functions from "../../functions";
import { logAnalyticsEvent } from "../../utility/FirebaseAnalytics";
import { gql, useMutation } from "@apollo/client";
import { getDayType } from "../../utility/Function";

const UPDATE_CLASSSESSION = gql`
  mutation updateClassSession($id: ID!, $input: ClassSessionUpdateInput!) {
    updateClassSession(id: $id, input: $input) {
      ok
      classSession {
        id
        sessionJoiningPlatform
      }
      zoomMtgNumber
      zoomMtgPassWord
      zoomMtgSignature
    }
  }
`;

const JOIN_GROUP_SESSION = gql`
  mutation JoinGroupSession($input: JoinGroupSessionInput!) {
    joinGroupSession(input: $input) {
      ok
      zoomMtgNumber
      zoomMtgPassWord
      zoomMtgSignature
    }
  }
`;

const JoinButton = ({
  isRegistered,
  toggleSessionEnd,
  handleRegisterPress,
  today,
  res,
  navigate,
  upDateRegisterButtonUI,
  componentFrom = "",
  listName,
  listPosition,
}) => {
  const WOEstudentUserId = localStorage.getItem("WOEstudentUserId");
  const [UpdateClassSession] = useMutation(UPDATE_CLASSSESSION);
  const [JoinGroupSession] = useMutation(JOIN_GROUP_SESSION);
  const companyName = localStorage.getItem("companyName") || "NA";
  const userId = localStorage.getItem("userID");

  const [loading, setLoading] = useState(false);

  const registerUserInBackground = (e) => {
    if (componentFrom === "registerBtn" && !!handleRegisterPress) {
      const isAlreadyRegistered =
        res.groupsessionpeoplejoiningSet?.findIndex(
          (e) => e.user?.id === WOEstudentUserId
        ) > -1;
      if (!res.isRegistered && !isAlreadyRegistered) {
        handleRegisterPress(e, res);
      }
    }
  };

  const setTeacherNameToLocalStorage = (sessionData) => {
    if (
      !!sessionData &&
      !!sessionData.teacher &&
      !!sessionData.teacher.userdetailObj &&
      !!sessionData.teacher.userdetailObj.userObj
    ) {
      localStorage.setItem(
        "teacherfirstName",
        sessionData.teacher.userdetailObj.userObj.firstName
      );
    }
  };

  const handleJoinPrivateSessionClick = (
    e,
    joiningLink,
    sessionId,
    teacherId,
    typeName,
    sessionData
  ) => {
    e.stopPropagation();

    localStorage.removeItem("isBeforeSessionFeedbackSubmitted");
    setTeacherNameToLocalStorage(sessionData);
    setLoading(true);

    if (typeName !== "ClassSessionType") {
      throw new Error(
        `Invalid session type "${sessionData.__typename}". Expected "ClassSessionType"`
      );
    }

    UpdateClassSession({
      variables: {
        id: sessionId,
        input: {
          sessionJoiningPlatform: "WEB-APP",
        },
      },
    })
      .then((res) => {
        const { zoomMtgNumber, zoomMtgPassWord, zoomMtgSignature } =
          res.data.updateClassSession;

        const className = sessionData.classType.name;
        const activeUserEmail = localStorage.getItem("userEmailId");

        logAnalyticsEvent("joined_private_session", {
          user_id: localStorage.getItem("userID"),
          user_id_wone: localStorage.getItem("userID"),
          company_name: companyName,
          class_name: className,
        });

        navigate(`/user/sessions/private/${sessionId}/meeting`, {
          state: {
            title: `Meeting - ${
              sessionData?.groupSession?.name || sessionData?.classObj?.name
            } - Sessions`,
            sessionName: `${
              sessionData?.groupSession?.name || sessionData?.classObj?.name
            }`,
            sessionType: "PRIVATE",
            userId: WOEstudentUserId,
            sessionId: sessionId,
            teacherId: sessionData.teacher.id || teacherId,
            activeSessionName: "private",
            activeStudentName:
              sessionData.student.userdetailObj.userObj.firstName,
            activeTeacherName:
              sessionData.teacher.userdetailObj.userObj.firstName,
            activeUserEmail: activeUserEmail,
            listName,
            listPosition,
            zoomMtgNumber,
            zoomMtgPassWord,
            zoomMtgSignature,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          `Could not join ${
            sessionData?.classObj?.name ?? "this session"
          }, please try again. If the problem persists, contact support@walkingonearth.com`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleJoinGroupSessionClick = (e, sessionData, joiningLink) => {
    e.stopPropagation();

    if (sessionData.__typename !== "GroupSessionInstanceType") {
      throw new Error(
        `Invalid session type "${sessionData.__typename}". Expected "GroupSessionInstanceType"`
      );
    }

    localStorage.removeItem("isBeforeSessionFeedbackSubmitted");
    setTeacherNameToLocalStorage(sessionData);

    const learnerFirstName = localStorage.getItem("userfirstName");
    const learnerLastName = localStorage.getItem("userlastName");
    localStorage.removeItem("typeformFeedbackInputJSON");
    localStorage.setItem(
      "typeformFeedbackInputJSON",
      JSON.stringify({
        app_environment: process.env.REACT_APP_ENV,
        group_session_id: sessionData?.id,
        group_session_name: sessionData?.groupSession?.name,
        group_session_start_date_time: sessionData?.instanceStartDateTime,
        group_session_end_date_time: sessionData?.instanceEndDateTime,
        practitioner_name: `${sessionData?.teacher?.userdetailObj?.userObj?.firstName} ${sessionData?.teacher?.userdetailObj?.userObj?.lastName}`,
        learner_name: `${learnerFirstName} ${learnerLastName}`,
      })
    );

    registerUserInBackground(e);

    setLoading(true);

    JoinGroupSession({
      variables: {
        input: {
          groupSessionInstanceId: sessionData.id,
          sessionJoiningPlatform: "WEB-APP",
        },
      },
    })
      .then((res) => {
        const { zoomMtgNumber, zoomMtgPassWord, zoomMtgSignature } =
          res.data.joinGroupSession;

        const pagePath = window.location.pathname;
        const pageTitle = document.title;

        logAnalyticsEvent("group_session_join_click", {
          user_id: userId,
          user_id_wone: userId,
          user_company_name: companyName,
          group_session_instance_id: sessionData?.id,
          group_session_name: sessionData?.groupSession?.name,
          list_name: listName ?? undefined,
          list_position: listPosition ?? undefined,
          page_title: pageTitle,
          page_path: pagePath,
        });

        const activeStudentName = localStorage.getItem("userfirstName");
        const activeUserEmail = localStorage.getItem("userEmailId");
        let _sessionType =
          sessionData.groupSession?.groupSessionFor?.toLowerCase();
        if (_sessionType === "corporate") {
          _sessionType = "company";
        }
        navigate(
          `/user/sessions/${
            _sessionType === "company" || _sessionType === "community"
              ? "group"
              : _sessionType
          }/${sessionData.id}/meeting`,
          {
            title: `Meeting - ${
              sessionData?.groupSession?.name || sessionData?.classObj?.name
            } - Sessions`,
            sessionName: `${
              sessionData?.groupSession?.name || sessionData?.classObj?.name
            }`,
            sessionType: "GROUP",
            userId: WOEstudentUserId,
            sessionId: sessionData.id,
            activeSessionName: _sessionType,
            teacherId:
              sessionData.teacher.id ||
              sessionData.teacher.userdetailObj.userObj?.id,
            activeStudentName: activeStudentName || "woe",
            activeTeacherName:
              sessionData.teacher?.userdetailObj.userObj.firstName || "woe",
            activeUserEmail: activeUserEmail,
            listName,
            listPosition,
            zoomMtgSignature,
            zoomMtgPassWord,
            zoomMtgNumber,
          }
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          `Could not join ${
            sessionData?.groupSession?.name ?? "this session"
          }, please try again. If the problem persists, contact support@walkingonearth.com`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRegButtonView = (status, sessionComplete = false) => {
    if (componentFrom === "registerBtn") {
      if (!!upDateRegisterButtonUI) {
        upDateRegisterButtonUI(status);
        if (!!toggleSessionEnd) {
          toggleSessionEnd(sessionComplete);
        }
      }
    }
  };

  const showGroupSessionButton = (joiningLink, sessionData, whichBtn) => {
    let btnClassName = null;
    if (whichBtn === "left") {
      btnClassName = "tsession-detail-right-button hand-cursor register-button";
    } else {
      btnClassName = "";
    }
    if (joiningLink) {
      return (
        <Button
          className={btnClassName}
          onClick={(e) =>
            handleJoinGroupSessionClick(e, sessionData, joiningLink)
          }
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm mr-2" />
          ) : (
            "Join Session"
          )}
        </Button>
      );
    } else {
      //return ('URL Not Found')
      return null;
    }
  };

  const showSessionButton = (sessionData) => {
    localStorage.setItem("sessionId", sessionData.id); //added by bsr
    let dayType = getDayType(sessionData);
    let sessionStartBtn = null;
    let startTimeDB = null;
    let endTimeDB = null;

    if (sessionData.__typename === "ClassSessionType") {
      startTimeDB = sessionData.startDateTime;
      endTimeDB = sessionData.endDateTime;
      if (sessionData.__typename === "ClassSessionType") {
        sessionStartBtn = (
          <Button
            className="tsession-detail-right-button hand-cursor register-button"
            onClick={(e) =>
              handleJoinPrivateSessionClick(
                e,
                sessionData.joiningLink,
                sessionData.id,
                sessionData.teacher.userdetailObj.userObj.id,
                sessionData.__typename,
                sessionData
              )
            }
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm mr-2" />
            ) : (
              "Join Session"
            )}
          </Button>
        );
      }
    } else {
      startTimeDB = sessionData.instanceStartDateTime;
      endTimeDB = sessionData.sessionEndDateTime;
      sessionStartBtn = showGroupSessionButton(
        sessionData.joiningLink,
        sessionData,
        "left"
      );
    }

    let localDateTime = moment(new Date()).toDate();
    let localStartDateTime = moment.utc(`${startTimeDB}`).toDate();
    let localEndDateTime = moment.utc(`${endTimeDB}`).toDate();
    let localStartTime = moment(
      moment(localStartDateTime).format("YYYY-MM-DD HH:mm"),
      "YYYY-MM-DD HH:mm"
    );
    let localEndTime = moment(
      moment(localEndDateTime).format("YYYY-MM-DD HH:mm:ss"),
      "YYYY-MM-DD HH:mm:ss"
    );
    let localTime1 = moment(
      moment(localDateTime).format("YYYY-MM-DD HH:mm:ss"),
      "YYYY-MM-DD HH:mm:ss"
    );
    let before5MinuteTime1 = moment(
      moment(localStartTime, "YYYY-MM-DD HH:mm")
        .subtract(6, "minutes")
        .format("YYYY-MM-DD HH:mm"),
      "YYYY-MM-DD HH:mm"
    );

    let myButtonObject = functions.calculateTimeDiffTwo(sessionData);
    let diff1 = myButtonObject.result;
    let isBetween1 = localTime1.isBetween(before5MinuteTime1, localEndTime);
    let isBefore1 = localTime1.isBefore(before5MinuteTime1);
    let isAfter1 = localTime1.isAfter(localEndTime);
    let isSame1 = localTime1.isSame(before5MinuteTime1);
    if (dayType === "today") {
      if (isAfter1) {
        updateRegButtonView(false, true);
        return ""; //'Session is passed';
      } else if (isBefore1) {
        updateRegButtonView(false);
        if (isRegistered) {
          if (componentFrom === "registerBtn") {
            return "";
          }
          return <Button className="inActive">{diff1}</Button>;
        } else {
          return "";
        }
      } else if (isBetween1 || isSame1) {
        updateRegButtonView(true);
        return sessionStartBtn;
      }
    } else {
      if (dayType === "previousDay") {
        //complete the session
        updateRegButtonView(false, true);
      } else {
        // if (res.__typename === "ClassSessionType") {
        //   return (
        //     <Button
        //       disabled
        //       className="register-button mt-2 mt-md-0 btn btn-secondary disabled"
        //     >
        //       {diff1}
        //     </Button>
        //   );
        // } else {
        // }
        updateRegButtonView(false);
      }
      return "";
    }
  };

  return (
    <div className="session-in-time mt-md-0 mt-2">{showSessionButton(res)}</div>
  );
};

export default JoinButton;
