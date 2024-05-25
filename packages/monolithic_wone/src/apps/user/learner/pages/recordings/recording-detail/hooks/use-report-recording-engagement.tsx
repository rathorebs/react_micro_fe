import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";

import {
  REPORT_RECORDING_OPEN,
  REPORT_RECORDING_VIDEO_START,
  REPORT_RECORDING_VIDEO_PROGRESS,
  REPORT_RECORDING_VIDEO_END,
} from "utility/graphQl/mutation";

import constant from "Constant";

const useReportRecordingEngagement = (recordingId: string) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const groupUuidRef = useRef(null);
  const progressReportRef = useRef({
    10: false,
    25: false,
    50: false,
    75: false,
  });

  const [reportRecordingOpen] = useMutation(REPORT_RECORDING_OPEN, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      groupUuidRef.current = response.reportRecordingOpen.groupUuid;
    },
    onError(error) {
      console.log("reportRecordingOpen error", error);
    },
  });

  const [reportRecordingVideoStart] = useMutation(REPORT_RECORDING_VIDEO_START);

  const [reportRecordingVideoProgress] = useMutation(
    REPORT_RECORDING_VIDEO_PROGRESS
  );

  const [reportRecordingVideoEnd] = useMutation(REPORT_RECORDING_VIDEO_END);

  const handleOpen = () => {
    if (!isOpened) {
      reportRecordingOpen({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
        },
      });

      setIsOpened(true);
    }
  };

  const handlePlay = () => {
    if (!isPlayed) {
      reportRecordingVideoStart({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
        },
      });

      setIsPlayed(true);
    }
  };

  const handleEnd = () => {
    if (!isEnded) {
      reportRecordingVideoEnd({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
        },
      });

      setIsEnded(true);
    }
  };

  const handleProgress = (event) => {
    if (!groupUuidRef.current) return;

    const { duration, currentTime } = event.target;
    const percentage = (currentTime / duration) * 100;
    if (!progressReportRef.current[10] && percentage >= 10 && percentage < 25) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });
      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
      };
    } else if (
      !progressReportRef.current[25] &&
      percentage >= 25 &&
      percentage < 50
    ) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });

      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
        25: true,
      };
    } else if (
      !progressReportRef.current[50] &&
      percentage >= 50 &&
      percentage < 75
    ) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });

      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
        25: true,
        50: true,
      };
    } else if (
      !progressReportRef.current[75] &&
      percentage >= 75 &&
      percentage < 100
    ) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });

      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
        25: true,
        50: true,
        75: true,
      };
    }
  };

  return {
    onOpen: handleOpen,
    onPlay: handlePlay,
    onEnd: handleEnd,
    onProgress: handleProgress,
  };
};

export default useReportRecordingEngagement;
