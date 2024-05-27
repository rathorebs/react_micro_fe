import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import functions from "../../../functions";
import constant from "../../../Constant";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import {
  USER_SESSION_LINK,
  REGISTER_FOR_GROUP_SESSION,
  UNREGISTER_FOR_GROUP_SESSION,
} from "../../../utility/graphQl/mutation";
import { UPCOMING_GROUP_SESSION_LIST } from "../../../utility/graphQl/query";
import { toast } from "react-toastify";

const WEB_APP = "WEB-APP";
const COMPANY = "COMPANY";
const CORPORATE = "CORPORATE";

export const useSession = () => {
  //const MARGIN_TIME = 6;
  const params = useParams();
  const navigate = useNavigate();
  const studentId = localStorage.getItem("WOEstudentUserId");
  const companyName = localStorage.getItem("companyName") || "NA";
  const userId = localStorage.getItem("userID");

  const [registerForSession] = useMutation(REGISTER_FOR_GROUP_SESSION);
  const [unRegisterFromSession] = useMutation(UNREGISTER_FOR_GROUP_SESSION);
  const [sessionDetailData, sethandleSessionCardClickData] = useState(null);
  const [upcomingSession, setUpcomingSession] = useState([]);
  const [modelStatus, setModelStatus] = useState(false);
  const [listName, setListName] = useState(null);
  const [listPosition, setListPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * useQuery
   * Call graphQl query when page load
   */
  const { data: dataT } = useQuery(UPCOMING_GROUP_SESSION_LIST, {
    fetchPolicy: "no-cache",
  });

  const [getUserSession] = useMutation(USER_SESSION_LINK, {
    onCompleted(res) {
      const data =
        res.userSessionLink?.groupSessionInstance ||
        res.userSessionLink?.privateSession;
      // const sessionStatus = functions.getSessionDeadLine(
      //   data?.instanceStartDateTime,
      //   data?.instanceEndDateTime,
      //   MARGIN_TIME
      // );
      navigate(
        `/user/sessions/${
          params.sessionType.toLowerCase() === "company" ||
          params.sessionType.toLowerCase() === "community"
            ? "group"
            : params.sessionType.toLowerCase()
        }/${params.sessionId}`,
        {
          state: {
            title: `${
              data?.groupSession?.name || data?.classObj?.name
            } - Sessions`,
          },
        }
      );
      data.isRegistered = checkIsSessionRegOrNot(data);

      sethandleSessionCardClickData(data);
    },
    onError(error) {
      closeDetailsDialog();
      //`It looks like that link didn’t quite work. Please find all your upcoming sessions here`
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const checkIsSessionRegOrNot = (data) => {
    return (
      data.isRegistered ||
      data?.groupsessionpeoplejoiningSet?.findIndex(
        (e) => e.user?.id === studentId
      ) > -1
    );
  };

  const closeDetailsDialog = () => {
    setModelStatus(false);
    navigate(`/user/sessions`, { state: { title: `Sessions` } });
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
    unRegisterFromSession({
      variables: {
        input: {
          groupSessionID: sessionDetailData.groupSession.id,
          groupSessionInstanceID: sessionDetailData.id,
          sessionRegistrationPlatform: constant.APP_PLATFORM,
        },
      },
    })
      .then(() => {
        const isReg = false;
        updateSessionCardClickData(sessionDetailData, isReg);
        closeDetailsDialog();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   *
   * @param {*} status true or false
   * common function used to update key either user registered or not
   */
  const updateSessionCardClickData = (data = null, status) => {
    if (!!data) {
      const _arr = upcomingSession;
      const filteredArr = _arr.filter((e) => e.id === data.id);
      filteredArr[0].isRegistered = status;
      if (!status) {
        filteredArr[0].groupsessionpeoplejoiningSet =
          filteredArr[0].groupsessionpeoplejoiningSet?.filter(
            (e) => e.user?.id !== studentId
          );
      }
      setUpcomingSession(_arr);
      sethandleSessionCardClickData(filteredArr[0]);
    }
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

      setListName(listName);
      setListPosition(listPosition);
    }

    data.isRegistered = checkIsSessionRegOrNot(data);
    sethandleSessionCardClickData(data);
    navigate(`/user/sessions/${type.toLowerCase()}/${data.id}`, {
      state: {
        title: `${data?.groupSession?.name || data?.classObj?.name} - Sessions`,
      },
    });

    setModelStatus(true);
  };

  useEffect(() => {
    if (!!dataT) {
      const {
        upcomingGroupSessionList: { upcomingGroupSessions },
      } = dataT;
      setUpcomingSession(upcomingGroupSessions);
    }
  }, [dataT]);

  useEffect(() => {
    if (params.sessionId && params.sessionType) {
      setModelStatus(true);
      let _sessionType = params.sessionType.toUpperCase();
      //change comapny to corporate value only
      if (_sessionType === COMPANY) {
        _sessionType = CORPORATE;
      }
      getUserSession({
        variables: {
          input: {
            userId: studentId,
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
    listName,
    listPosition,
    upcomingSession,
    sessionDetailData,
    closeDetailsDialog,
    handleRegisterPress,
    handleunRegisterPress,
    handleSessionCardClick,
  };
};
