import React, { useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useLocation } from "react-router-dom";
import { DefaultPlayer as Video } from "react-html5video";

import { usePage } from "providers/page";
import appInfo from "utility/app-info";
import { LEARNER_PRACTITIONER } from "utility/graphQl/query";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import { LearnerPractitioner } from "apps/user/learner/api/types";
import { ContentListPreview } from "apps/user/learner/components/content-list/preview";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

import VideoIcon from "Assets/icon/iconVideo.svg";
import SessionIcon from "Assets/icon/iconSession.svg";

import styles from "./practitioner-detail.module.scss";

const PractitionerDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { onPrefixPageTitle } = usePage();

  const isViewSentRef = useRef(false);

  const { loading, error, data } = useQuery(LEARNER_PRACTITIONER, {
    onError(error) {
      console.error("Error while fetching practitioner details", error);
    },
    variables: {
      id,
      appInfo,
    },
  });

  useEffect(() => {
    if (!isViewSentRef.current && data?.learnerPractitioner) {
      let listName, listPosition;

      if (location.state?.listName) {
        listName = location.state.listName;
      }

      if (location.state?.listPosition) {
        listPosition = location.state.listPosition;
      }

      const userId = localStorage.getItem("userID");
      const companyName = localStorage.getItem("companyName") || "NA";

      const { id, fullName } = data.learnerPractitioner as LearnerPractitioner;

      logAnalyticsEvent("practitioner_view", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        practitioner_id: id,
        practitioner_full_name: fullName,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });

      isViewSentRef.current = true;
    }
  }, [data, location]);

  onPrefixPageTitle(data?.learnerPractitioner?.fullName);

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
    landscapeImageUrl,
    fullName,
    about,
    accreditation,
    intro,
    contentLists,
  } = data.learnerPractitioner;

  return (
    <PageContainer background="white">
      <PageHeader showBackButton />
      <PageContent maxWidth="sm">
        <div className={styles["landscape-image-container"]}>
          <img
            className={styles["landscape-image"]}
            src={landscapeImageUrl}
            alt="Practitioner landscape"
          />
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["section"]}>
            <h2>{fullName}</h2>
            <p>{about}</p>
          </div>
          {accreditation && (
            <div className={styles["section"]}>
              <h2>{accreditation.title}</h2>
              {accreditation.items && (
                <ul className={styles["accreditations-list"]}>
                  {accreditation.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {accreditation.textHtml && (
                <p
                  className={styles["accreditations-text"]}
                  dangerouslySetInnerHTML={{ __html: accreditation.textHtml }}
                />
              )}
            </div>
          )}
          {intro && (
            <div className={styles["section"]}>
              <h2>{intro.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: intro.textHTML }}></p>
              <div className={styles["video-container"]}>
                <Video
                  className={styles["video"]}
                  autoPlay={false}
                  muted={false}
                  controls={[
                    "PlayPause",
                    "Seek",
                    "Time",
                    "Volume",
                    "Fullscreen",
                  ]}
                  poster={intro.videoThumbnailUrl}
                >
                  <source src={intro.videoUrl} type="video/mp4" />
                </Video>
              </div>
            </div>
          )}
          {contentLists.map((list) => {
            let icon = null;
            if (list.__typename === "LearnerRecordingsList") {
              icon = VideoIcon;
            } else if (list.__typename === "LearnerGroupSessionsList") {
              icon = SessionIcon;
            }

            return (
              <ContentListPreview
                seeMore
                key={list.id}
                icon={icon}
                data={list}
                limit={2}
              />
            );
          })}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default PractitionerDetail;
