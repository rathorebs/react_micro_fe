import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import functions from "../../../functions";
import constant from "../../../Constant";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import {
  USER_SESSION_LINK,
  QUERY_TEACHERSESSIONDETAILTODAY,
  QUERY_TEACHERSESSIONDETAILWEEK,
  REGISTER_FOR_GROUP_SESSION,
  UNREGISTER_FOR_GROUP_SESSION,
  UPDATE_CLASSSESSION,
} from "../../../utility/graphQl/mutation";
import { getDayType } from "../../../utility/Function";

const WEB_APP = "WEB-APP";
const CANCELLED_SESSION = "cancelled_session";
const COMPANY = "COMPANY";
const CORPORATE = "CORPORATE";

export const useSchedule = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userID");
  const teacherId = localStorage.getItem("teacherId");
  const companyName = localStorage.getItem("companyName") || "NA";
  const [modelStatus, setModelStatus] = useState(false);
  const [sessionDetailData, sethandleSessionCardClickData] = useState(null);
  const [sortedTeacherSessionToday, setSortedTeacherSessionForToday] = useState(
    []
  );
  const [sortedTeacherSessionWeek, setSortedTeacherSessionForWeek] = useState(
    []
  );
  const [listPosition, setListPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddEditPopup, setFeedbackPopup] = useState(false);
  const [listName, setListName] = useState(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { data: dataT } = useQuery(QUERY_TEACHERSESSIONDETAILTODAY, {
    fetchPolicy: "no-cache",
    variables: { roleName: "TEACHER", tz: timezone },
  });

  const { data: dataW } = useQuery(QUERY_TEACHERSESSIONDETAILWEEK, {
    fetchPolicy: "no-cache",
    variables: { roleName: "TEACHER", tz: timezone },
  });

  const checkIsSessionRegOrNot = (data) => {
    return (
      data.isRegistered ||
      data?.groupsessionpeoplejoiningSet?.findIndex(
        //(e) => e.user?.id == studentId
        (e) => e.user?.id === userId
      ) > -1
    );
  };

  const [getUserSession] = useMutation(USER_SESSION_LINK, {
    onCompleted(responce) {
      const data =
        responce.userSessionLink?.groupSessionInstance ||
        responce.userSessionLink?.privateSession;

      navigate(
        `/teacher/schedule/${params.sessionType.toLowerCase()}/${
          params.sessionId
        }`,
        {
          state: {
            title: `${
              data?.groupSession?.name || data?.classObj?.name
            } - Schedule`,
          },
        }
      );

      if (data?.__typename !== "ClassSessionType") {
        data.isRegistered = checkIsSessionRegOrNot(data);
      }
      sethandleSessionCardClickData(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [UpdateClassSession] = useMutation(UPDATE_CLASSSESSION);
  const [unRegisterFromSession] = useMutation(UNREGISTER_FOR_GROUP_SESSION);
  const [registerForSession] = useMutation(REGISTER_FOR_GROUP_SESSION);

  /**
   *
   * @param {*} status true or false
   * common function used to update key either user registered or not
   */
  const updateSessionCardClickData = (data = null, status = false) => {
    if (!!data) {
      const isDayTypeToday = getDayType(data) === "today";
      const _arr = isDayTypeToday
        ? sortedTeacherSessionToday
        : sortedTeacherSessionWeek;

      const filteredArr = _arr.filter((e) => e.id !== data.id);

      if (isDayTypeToday) {
        setSortedTeacherSessionForToday(filteredArr);
      } else {
        setSortedTeacherSessionForWeek(filteredArr);
      }
    }
    closeDetailsDialog();
  };

  const closeDetailsDialog = () => {
    setModelStatus(false);
    navigate(`/teacher/schedule`, {
      state: { title: `Schedule` },
    });
  };

  const cancelPrivateRegistration = (sessionId) => {
    UpdateClassSession({
      variables: {
        id: sessionId,
        input: {
          sessionJoiningPlatform: WEB_APP,
        },
      },
    })
      .then((res) => {
        const className =
          res.data.updateClassSession?.classSession?.classObj?.name;
        logAnalyticsEvent(CANCELLED_SESSION, {
          company_name: companyName,
          user_id: userId,
          user_id_wone: userId,
          class_name: className,
        });
        updateSessionCardClickData(sessionDetailData);
      })
      .catch(() => {
        closeDetailsDialog();
      });
  };

  /**
   * function used for remove registration from upcomming session
   */
  const handleunRegisterPress = (session, listName, listPosition) => {
    if (session?.__typename === "GroupSessionInstanceType") {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("group_session_unregister_click", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        group_session_instance_id: session?.id,
        group_session_name: session?.groupSession?.name,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
    if (!session?.groupSession?.id) {
      // for private session
      cancelPrivateRegistration(session.id);
    } else {
      unRegisterFromSession({
        variables: {
          input: {
            groupSessionID: session.groupSession.id,
            groupSessionInstanceID: session.id,
            sessionRegistrationPlatform: constant.APP_PLATFORM,
          },
        },
      })
        .then(() => {
          updateSessionCardClickData(sessionDetailData);
        })
        .catch(() => {
          closeDetailsDialog();
        });
    }
  };

  /**
   * function used to Register user for upcoming sessions
   */
  const handleRegisterPress = (e, data, listName, listPosition) => {
    e?.stopPropagation();
    setLoading(true);
    if (data?.__typename === "GroupSessionInstanceType") {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("group_session_register_click", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        group_session_instance_id: data?.id,
        group_session_name: data?.groupSession?.name,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
    registerForSession({
      variables: {
        input: {
          groupSessionID: data.groupSession.id,
          groupSessionInstanceID: data.id,
          userTimezone: functions.clientTimeZone(),
          sessionRegistrationPlatform: WEB_APP,
        },
      },
    })
      .then((res) => {
        setLoading(false);
        const isReg = true;
        updateSessionCardClickData(data, isReg);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  /**
   *
   * @param {*} data object of session data that need to show in side bar
   * function used to show clicked data in side bar
   * if user id available in `groupsessioninstanceSet` then we show Registered and Un-Registered instance accordingly
   */
  const handleSessionCardClick = (e, data, type, listName, listPosition) => {
    e.preventDefault();

    if (data?.__typename === "GroupSessionInstanceType") {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("group_session_click", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        group_session_instance_id: data?.id,
        group_session_name: data?.groupSession?.name,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }

    sethandleSessionCardClickData(data);
    navigate(`/teacher/schedule/${type.toLowerCase()}/${data.id}`, {
      state: {
        title: `${data?.groupSession?.name || data?.classObj?.name} - Schedule`,
      },
    });

    setModelStatus(true);
    setListName(listName);
    setListPosition(listPosition);
  };

  const handleAddEditFeedback = (e, res) => {
    e.stopPropagation();
    setFeedbackPopup(true);
    sethandleSessionCardClickData(res);
  };

  const closeFeedbackForm = () => {
    setFeedbackPopup(false);
    document.title = `Schedule - Walking on Earth`;
  };

  const handleClickToJoin = (e, sessionData, listName, listPosition) => {
    e.stopPropagation();
    const { joiningLink, id } = sessionData;

    if (sessionData?.__typename === "GroupSessionInstanceType") {
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
    }

    if (sessionData.__typename === "ClassSessionType") {
      UpdateClassSession({
        variables: {
          id: id,
          input: {
            sessionJoiningPlatform: WEB_APP,
          },
        },
      }).then((res) => console.log(res, "update class session res"));
    }

    window.open(joiningLink, "_blank");
  };

  useEffect(() => {
    if (!!dataT) {
      const arrT = dataT?.userSessionsToday || [];
      setSortedTeacherSessionForToday([...arrT].sort(functions.sortDateArray));
    }

    if (!!dataW) {
      const arrW = dataW?.userSessionsThisWeek || [];
      setSortedTeacherSessionForWeek([...arrW].sort(functions.sortDateArray));
    }
  }, [dataT, dataW]);

  useEffect(() => {
    if (params.sessionId && params.sessionType) {
      setModelStatus(true);
      let _sessionType = params.sessionType.toUpperCase();
      if (_sessionType === COMPANY) {
        _sessionType = CORPORATE;
      }
      getUserSession({
        variables: {
          input: {
            userId: teacherId,
            sessionId: params.sessionId,
            sessionType: _sessionType,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    modelStatus,
    handleAddEditFeedback,
    sortedTeacherSessionWeek,
    sortedTeacherSessionToday,
    sessionDetailData,
    closeDetailsDialog,
    handleRegisterPress,
    handleunRegisterPress,
    handleSessionCardClick,
    openAddEditPopup,
    handleClickToJoin,
    closeFeedbackForm,
    listName,
    listPosition,
  };
};
