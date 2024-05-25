import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import FeedbackByTeacher from "./FeedbackByTeacher";
import SecondFeedbackByTeacher from "./SecondFeedbackByTeacher";
import useQueryParams from "../../../components/commons/hooks/useQueryParams";
const QUERY_STOPRECORDING = gql`
  mutation StopRecording($input: StopRecordingInput!) {
    stopRecording(input: $input) {
      agoraDetail {
        id
        channelName
        resourceId
        sid
        uid
      }
      ok
    }
  }
`;

const FeedbackByTeacherAfterJoinSession = () => {
  const query = useQueryParams();
  const studentId = query.get("studentId");
  const typeName = query.get("typeName");
  const sessionId = query.get("sessionId");
  const studentName = query.get("studentName");

  const [isFeedbackByTeacher, setisFeedbackByTeacher] = useState(true);
  const [isSecondFeedbackByTeacher, setisSecondFeedbackByTeacher] =
    useState(false);

  const [stopRecording] = useMutation(QUERY_STOPRECORDING);

  useEffect(() => {
    stopRecording({
      variables: {
        input: {
          sessionID: sessionId,
        },
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [sessionId, stopRecording]);

  const handleZoomVideoCall = () => {
    setisSecondFeedbackByTeacher(true);
    setisFeedbackByTeacher(false);
  };

  return (
    <>
      {isFeedbackByTeacher && (
        <FeedbackByTeacher
          studentName={studentName}
          sessionId={sessionId}
          studentId={studentId}
          typeName={typeName}
          handleZoomVideoCall={handleZoomVideoCall}
        />
      )}
      {isSecondFeedbackByTeacher && (
        <SecondFeedbackByTeacher studentName={studentName} />
      )}
    </>
  );
};

export default FeedbackByTeacherAfterJoinSession;
