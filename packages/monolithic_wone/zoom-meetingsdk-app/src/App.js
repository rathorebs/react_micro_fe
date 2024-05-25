import { useEffect } from "react";

import { ZoomMtg } from "@zoomus/websdk";
import { logAnalyticsEvent } from "./utils/analytics";
import useReportEvents from "./hooks/use-report-events";

const { REACT_APP_ZOOM_SDK_KEY } = process.env;

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.14.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

let wakeLock = null;
let reportGroupSessionPingIntervalId = null;

// Function that attempts to request a wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request();
    wakeLock.addEventListener("release", () => {
      console.log("Screen Wake Lock released:", wakeLock.released);
    });
  } catch (err) {
    console.error(`Screen Wake Lock: ${err.name}, ${err.message}`);
  }
};

// Function that attempts to release the wake lock.
const releaseWakeLock = async () => {
  if (!wakeLock) {
    return;
  }
  try {
    await wakeLock.release();
    wakeLock = null;
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

const handleVisibilityChange = async () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    await requestWakeLock();
  }
};

const userId = localStorage.getItem("userID");
const companyName = localStorage.getItem("companyName") || "NA";
const userName = localStorage.getItem("userfirstName");
const userEmail = localStorage.getItem("userEmailId");

const searchParams = new URLSearchParams(window.location.search);

const meetingNumber = searchParams.get("meetingNumber");
const signature = searchParams.get("signature");
const leaveUrl = searchParams.get("leaveUrl");
const replaceUrl = searchParams.get("replaceUrl");
const replaceTitle = searchParams.get("replaceTitle");
const sessionId = searchParams.get("sessionId");
const sessionType = searchParams.get("sessionType");
const sessionName = searchParams.get("sessionName");

const listName =
  searchParams.get("listName") === "" ||
  searchParams.get("listName") === "null" ||
  searchParams.get("listName") === "undefined"
    ? undefined
    : searchParams.get("listName");
const listPosition =
  searchParams.get("listName") === "" ||
  searchParams.get("listPosition") === "null" ||
  searchParams.get("listPosition") === "undefined"
    ? undefined
    : searchParams.get("listPosition");
const passWord =
  searchParams.get("passWord") === "" ||
  searchParams.get("passWord") === "null" ||
  searchParams.get("passWord") === "undefined"
    ? undefined
    : searchParams.get("passWord");

if (
  !userId ||
  !companyName ||
  !userName ||
  !userEmail ||
  !meetingNumber ||
  !signature ||
  !leaveUrl ||
  !replaceUrl ||
  !replaceTitle ||
  !sessionId ||
  !sessionType ||
  !sessionName
) {
  console.warn("Missing initialization parameters, redirecting to /");
  window.location.href = window.location.origin;
}

const sdkKey = REACT_APP_ZOOM_SDK_KEY;

function App() {
  const {
    reportGroupSessionJoin,
    reportGroupSessionPing,
    reportGroupSessionLeave,
  } = useReportEvents(sessionId);

  const handleBeforeUnload = async () => {
    if (sessionType.toLowerCase() === "group") {
      await reportGroupSessionLeave();
      logAnalyticsEvent("group_session_leave", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        group_session_instance_id: sessionId,
        group_session_name: sessionName,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    } else if (sessionType.toLowerCase() === "private") {
      logAnalyticsEvent("private_session_leave", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        private_session_id: sessionId,
        private_session_name: sessionName,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    }
  };

  const handleUnload = () => {
    ZoomMtg.leaveMeeting({});
  };

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
    var registrantToken = "";

    ZoomMtg.init({
      meetingInfo: [],
      leaveUrl: leaveUrl,
      isSupportAV: true,
      screenShare: true,
      disablePreview: true,
      disableInvite: true,

      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success);

            reportGroupSessionPingIntervalId = setInterval(
              reportGroupSessionPing,
              60000
            );

            if (sessionType.toLowerCase() === "group") {
              reportGroupSessionJoin();
              logAnalyticsEvent("group_session_join_success", {
                user_id: userId,
                user_id_wone: userId,
                user_company_name: companyName,
                group_session_instance_id: sessionId,
                group_session_name: sessionName,
                list_name: listName,
                list_position: listPosition,
                page_title: document.title,
                page_path: window.location.pathname,
              });
            } else if (sessionType.toLowerCase() === "private") {
              logAnalyticsEvent("private_session_join_success", {
                user_id: userId,
                user_id_wone: userId,
                user_company_name: companyName,
                private_session_id: sessionId,
                private_session_name: sessionName,
                list_name: listName,
                list_position: listPosition,
                page_title: document.title,
                page_path: window.location.pathname,
              });
            }
          },
          error: (error) => {
            console.error(error);

            if (sessionType.toLowerCase() === "group") {
              logAnalyticsEvent("group_session_join_error", {
                user_id: userId,
                user_id_wone: userId,
                user_company_name: companyName,
                group_session_instance_id: sessionId,
                group_session_name: sessionName,
                list_name: listName,
                list_position: listPosition,
                page_title: document.title,
                page_path: window.location.pathname,
                error_description: error.toString(),
              });
            } else if (sessionType.toLowerCase() === "private") {
              logAnalyticsEvent("private_session_join_error", {
                user_id: userId,
                user_id_wone: userId,
                user_company_name: companyName,
                private_session_id: sessionId,
                private_session_name: sessionName,
                list_name: listName,
                list_position: listPosition,
                page_title: document.title,
                page_path: window.location.pathname,
                error_description: error.toString(),
              });
            }
          },
        });
      },
      error: (error) => {
        console.error(error);

        if (sessionType.toLowerCase() === "group") {
          logAnalyticsEvent("group_session_zoom_init_error", {
            user_id: userId,
            user_id_wone: userId,
            user_company_name: companyName,
            group_session_instance_id: sessionId,
            group_session_name: sessionName,
            list_name: listName,
            list_position: listPosition,
            page_title: document.title,
            page_path: window.location.pathname,
            error_description: error.toString(),
          });
        } else if (sessionType.toLowerCase() === "private") {
          logAnalyticsEvent("private_session_zoom_init_error", {
            user_id: userId,
            user_id_wone: userId,
            user_company_name: companyName,
            private_session_id: sessionId,
            private_session_name: sessionName,
            list_name: listName,
            list_position: listPosition,
            page_title: document.title,
            page_path: window.location.pathname,
            error_description: error.toString(),
          });
        }
      },
    });
  }

  useEffect(() => {
    window.history.replaceState("", replaceTitle, replaceUrl);

    startMeeting(signature);

    window.addEventListener("beforeunload", handleBeforeUnload, false);
    window.addEventListener("unload", handleUnload, false);
    window.addEventListener("visibilitychange", handleVisibilityChange);

    requestWakeLock();

    return () => {
      ZoomMtg.endMeeting();
      window.removeEventListener("beforeunload", handleBeforeUnload, false);
      window.removeEventListener("unload", handleUnload, false);
      document.getElementById("zmmtg-root").style.display = "none";
      releaseWakeLock();
      clearInterval(reportGroupSessionPingIntervalId);
      window.location.reload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default App;
