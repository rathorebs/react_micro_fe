import React, { useState, useEffect, useCallback } from "react";
import FeedbackByStudentBeforeVideo from "apps/user/learner/pages/feedback/feedback-by-student-before-video";

import ZoomLoading from "../../../components/commons/ZoomLoading";

const Meeting = (props) => {
  const isBeforeFeedbackSubmitted = localStorage.getItem(
    "isBeforeSessionFeedbackSubmitted"
  );

  const {
    sessionId,
    teacherId,
    sessionType,
    activeSessionName,
    sessionName,
    listName,
    listPosition,
    zoomMtgNumber,
    zoomMtgPassWord,
    zoomMtgSignature,
    learnerBeforeGroupSessionFeedbackForm,
  } = props.location.state;

  const [isZoomVideoCall, setisZoomVideoCall] = useState(false);
  const [isFeedbackByStudentBeforeVideo, setisFeedbackByStudentBeforeVideo] =
    useState(true);
  const [leaveUrl, setLeaveUrl] = useState(
    `/user/sessions/${
      activeSessionName.toLowerCase() === "company" ||
      activeSessionName.toLowerCase() === "community"
        ? "group"
        : activeSessionName
    }/${sessionId}/meeting/feedback?sessionId=${sessionId}&teacherId=${teacherId}&sessionType=${sessionType}&sessionTitle=${sessionName}`
  );

  const replaceUrl = `/user/sessions/${
    activeSessionName.toLowerCase() === "company" ||
    activeSessionName.toLowerCase() === "community"
      ? "group"
      : activeSessionName
  }/${sessionId}/meeting`;

  const replaceTitle = `Meeting - ${sessionName} - Sessions - Walking on Earth`;

  const handleVideoCall = useCallback(() => {
    setLeaveUrl((prevLeaveUrl) => `${prevLeaveUrl}`);
    setisFeedbackByStudentBeforeVideo(false);
    setisZoomVideoCall(true);
  }, []);

  useEffect(() => {
    if (isBeforeFeedbackSubmitted || !learnerBeforeGroupSessionFeedbackForm) {
      handleVideoCall();
    }
  }, [
    isBeforeFeedbackSubmitted,
    handleVideoCall,
    learnerBeforeGroupSessionFeedbackForm,
  ]);

  useEffect(() => {
    if (isZoomVideoCall) {
      const liveUrl = new URL("/live/", window.location.origin);
      liveUrl.searchParams.append("meetingNumber", zoomMtgNumber);
      liveUrl.searchParams.append("signature", zoomMtgSignature);
      liveUrl.searchParams.append("passWord", zoomMtgPassWord);
      liveUrl.searchParams.append("leaveUrl", leaveUrl);
      liveUrl.searchParams.append("replaceUrl", replaceUrl);
      liveUrl.searchParams.append("replaceTitle", replaceTitle);
      liveUrl.searchParams.append("sessionType", sessionType);
      liveUrl.searchParams.append("sessionId", sessionId);
      liveUrl.searchParams.append("sessionName", sessionName);
      liveUrl.searchParams.append("listName", listName);
      liveUrl.searchParams.append("listPosition", listPosition);

      window.location.href = liveUrl.href;
    }
  }, [
    isZoomVideoCall,
    leaveUrl,
    replaceUrl,
    replaceTitle,
    sessionId,
    sessionType,
    sessionName,
    listName,
    listPosition,
    zoomMtgNumber,
    zoomMtgPassWord,
    zoomMtgSignature,
  ]);

  if (
    isFeedbackByStudentBeforeVideo &&
    !isBeforeFeedbackSubmitted &&
    learnerBeforeGroupSessionFeedbackForm
  ) {
    return (
      <FeedbackByStudentBeforeVideo
        handleVideoCall={handleVideoCall}
        sessionId={sessionId}
        sessionType={sessionType}
        learnerBeforeGroupSessionFeedbackForm={
          learnerBeforeGroupSessionFeedbackForm
        }
      />
    );
  } else {
    return <ZoomLoading />;
  }
};

export default Meeting;
