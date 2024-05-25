import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useLocation } from "react-router-dom";
import FeedbackByStudentBeforeVideo from "apps/user/learner/pages/feedback/feedback-by-student-before-video";
import FeedbackByStudentAfterJoinSession from "apps/user/learner/pages/feedback/feedback-by-student-after-join-session";

import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

import appInfo from "utility/app-info";
import { LEARNER_RECORDING } from "utility/graphQl/query";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import { LearnerRecording } from "apps/user/learner/api/types";
import { usePatternBackground } from "providers/pattern-background";
import useReportRecordingEngagement from "./hooks/use-report-recording-engagement";
import useFavorite from "apps/user/learner/hooks/use-favourite";
import FavouriteIcon from "apps/user/learner/components/favourite-icon";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

import { usePage } from "providers/page";
import Tile from "components/tile";
import PractitionerCard from "apps/user/learner/components/practitioner-card";
import BlocksIcon from "Assets/iconBlocks.svg";
import BolsterIcon from "Assets/iconBolster.svg";
import YogaIcon from "Assets/iconMatTrainingYoga.svg";
import BlanketIcon from "Assets/iconTowel.svg";
import profileIcon from "Assets/profile-icon.svg";
import ReacrdingThumbnailFallbackImage from "Assets/images/reacrdingThumbPH.jpg";

import styles from "./index.module.scss";

const RecordingDetail = () => {
  const location = useLocation();
  const { onPrefixPageTitle } = usePage();
  const { recordingId } = useParams();
  const [showBeforeVideoFeedbackScreen, setShowBeforeVideoFeedbackScreen] =
    useState(false);
  const [isBeforeVideoFeedbackSubmitted, setIsBeforeVideoFeedbackSubmitted] =
    useState(false);
  const [showAfterVideoFeedbackScreen, setShowAfterVideoFeedbackScreen] =
    useState(false);
  const isViewSentRef = useRef(false);
  const { onFavourite, loading: isFavouriteLoading } = useFavorite();
  const { onOpen, onPlay, onEnd, onProgress } =
    useReportRecordingEngagement(recordingId);

  const { loading, error, data } = useQuery(LEARNER_RECORDING, {
    onCompleted() {
      onOpen();
    },
    onError(error) {
      console.error("Error while fetching recording detail", error);
    },
    variables: {
      id: recordingId,
      appInfo,
    },
  });
  const { removePatternOverlay } = usePatternBackground();
  useEffect(() => {
    if (!isViewSentRef.current && data?.learnerRecording) {
      let listName, listPosition;

      if (location.state?.listName) {
        listName = location.state.listName;
      }

      if (location.state?.listPosition) {
        listPosition = location.state.listPosition;
      }

      const userId = localStorage.getItem("userID");
      const companyName = localStorage.getItem("companyName") || "NA";

      const { id, title } = data.learnerRecording as LearnerRecording;

      logAnalyticsEvent("recording_view", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        recording_id: id,
        recording_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });

      isViewSentRef.current = true;
    }
  }, [data, location]);
  useEffect(() => {
    return () => {
      removePatternOverlay(false);
    };
  }, [removePatternOverlay]);
  onPrefixPageTitle(data?.learnerRecording?.title);

  if (loading) {
    return (
      <PageContainer background="white">
        <PageHeader showBackButton />
        <PageContent maxWidth="sm">
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer background="white">
        <PageHeader showBackButton />
        <PageContent maxWidth="sm">
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }
  const {
    title,
    subtitle,
    about,
    videoThumbnailUrl,
    equipment,
    practitioner,
    videoUrl,
    isFavourite,
  } = data.learnerRecording;

  const equipmentIcons = {
    "equipment-blocks": BlocksIcon,
    "equipment-bolster": BolsterIcon,
    "equipment-yoga-mat": YogaIcon,
    "equipment-blanket": BlanketIcon,
  };
  const handleBeforeVideoFeedbackScreen = () => {
    removePatternOverlay(true);
    setShowBeforeVideoFeedbackScreen(true);
  };

  const handleAfterVideoFeedbackScreen = () => {
    onEnd();
    setIsBeforeVideoFeedbackSubmitted(false);
    setShowAfterVideoFeedbackScreen(true);
  };

  const handleBeforeVideoFeedbackSubmitted = () => {
    setIsBeforeVideoFeedbackSubmitted(true);
    setShowBeforeVideoFeedbackScreen(false);
  };

  const handleAfterVideoFeedbackSubmitted = () => {
    removePatternOverlay(false);
    setShowAfterVideoFeedbackScreen(false);
  };

  if (showBeforeVideoFeedbackScreen) {
    const { id } = data.learnerRecording as LearnerRecording;
    return (
      <PageContainer>
        <FeedbackByStudentBeforeVideo
          sessionId={id}
          type={"RECORDING"}
          sessionType={"group"}
          onBeforeVideoFeedbackSubmitted={handleBeforeVideoFeedbackSubmitted}
        />
      </PageContainer>
    );
  }

  if (showAfterVideoFeedbackScreen) {
    const { id } = data.learnerRecording as LearnerRecording;
    return (
      <PageContainer>
        <FeedbackByStudentAfterJoinSession
          sessionId={id}
          type={"RECORDING"}
          sessionType={"group"}
          onAfterVideoFeedbackSubmitted={handleAfterVideoFeedbackSubmitted}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer background="white">
      <PageHeader showBackButton transparent>
        <FavouriteIcon
          style={{ marginLeft: "auto" }}
          status={isFavourite}
          loading={isFavouriteLoading}
          onClick={() => onFavourite(data.learnerRecording)}
        />
      </PageHeader>
      <div className={styles["video-container"]}>
        <Video
          className={styles["main-video"]}
          autoPlay={isBeforeVideoFeedbackSubmitted ? true : false}
          muted={false}
          controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
          poster={videoThumbnailUrl || ReacrdingThumbnailFallbackImage}
          onPlay={
            isBeforeVideoFeedbackSubmitted
              ? onPlay
              : handleBeforeVideoFeedbackScreen
          }
          onEnded={handleAfterVideoFeedbackScreen}
          onTimeUpdate={onProgress}
        >
          <source src={videoUrl} type="video/mp4" />
        </Video>
      </div>
      <PageContent maxWidth="sm">
        <div className={styles["details-container"]}>
          <div className={styles["description-container"]}>
            <h1 className={styles["main-title"]}>{title}</h1>
            <p className={styles["main-subtitle"]}>{subtitle}</p>
            <h2 className={styles["title"]}>ABOUT THE SESSION</h2>
            <p className={styles["description"]}>{about}</p>
          </div>
          {equipment && equipment.length > 0 && (
            <div className={styles["material-container"]}>
              <h2 className={styles["heading"]}>WHAT TO BRING</h2>
              <div className={styles["material-pill"]}>
                {equipment.map((item) => (
                  <div className={styles["material-div"]} key={item.id}>
                    <Tile>
                      <span className={styles["materials"]}>
                        <img src={equipmentIcons[item.icon]} alt="icon" />
                        <h3 className={styles["material-label"]}>
                          {item.label}
                        </h3>
                      </span>
                    </Tile>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={styles["expert-container"]}>
            <div className={styles["expert-header"]}>
              <img
                className={styles["icon"]}
                src={profileIcon}
                alt="profile-icon"
              />
              <h2 className={styles["title"]}>EXPERTS</h2>
            </div>
            <PractitionerCard practitioner={practitioner} />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default RecordingDetail;
