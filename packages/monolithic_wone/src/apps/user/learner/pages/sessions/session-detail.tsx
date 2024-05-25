import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useLocation } from "react-router-dom";

import { LEARNER_SESSION } from "utility/graphQl/query";

import { usePage } from "providers/page";
import Tile from "components/tile";
import { PillarPill, ServicePill } from "components/pill";
import { Button } from "apps/user/common/components/button";
import { useGroupSessionActions } from "../../hooks/use-group-session-actions";
import PractitionerCard from "../../components/practitioner-card";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

import videoIcon from "Assets/iconSession.svg";
import calendarIcon from "Assets/icon-calendar.svg";
import clockIcon from "Assets/icon-clock-time.svg";
import profileIcon from "Assets/profile-icon.svg";
import BlocksIcon from "Assets/iconBlocks.svg";
import BolsterIcon from "Assets/iconBolster.svg";
import YogaIcon from "Assets/iconMatTrainingYoga.svg";
import BlanketIcon from "Assets/iconTowel.svg";
import BiometricsIcon from "Assets/iconBiometrics.svg";

import appInfo from "utility/app-info";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import { LearnerGroupSessionPartsFragment } from "apps/user/learner/api/types";

import styles from "./session-detail.module.scss";
import BiometricsDeviceConnectionModal from "../settings/components/biometrics-device-connection-modal";

const SessionDetail = () => {
  const params = useParams();
  const location = useLocation();
  const { onPrefixPageTitle } = usePage();
  const [biometricsConnectionModal, setBiometricsConnectionModal] =
    useState(false);

  const isViewSentRef = useRef(false);

  const listName = location?.state?.listName;
  const listPosition = location?.state?.listPosition;

  const { loading, error, data } = useQuery(LEARNER_SESSION, {
    onError(error) {
      console.error("Error while fetching the session", error);
    },
    variables: {
      id: params.session_id,
      appInfo,
    },
    pollInterval: 60 * 1000,
  });

  const actions = useGroupSessionActions({
    session: data?.learnerSession,
  });

  const handleClickActionButton = (event, action) => {
    event.preventDefault();

    actions[action].action(listName, listPosition);
  };

  useEffect(() => {
    if (!isViewSentRef.current && data?.learnerSession) {
      const userId = localStorage.getItem("userID");
      const companyName = localStorage.getItem("companyName") || "NA";

      const { __typename, id, title } =
        data.learnerSession as LearnerGroupSessionPartsFragment;

      if (__typename === "LearnerGroupSession") {
        logAnalyticsEvent("group_session_view", {
          user_id: userId,
          user_id_wone: userId,
          user_company_name: companyName,
          group_session_instance_id: id,
          group_session_name: title,
          list_name: listName,
          list_position: listPosition,
          page_title: document.title,
          page_path: window.location.pathname,
        });
      } else if (__typename === "LearnerPrivateSession") {
        logAnalyticsEvent("private_session_view", {
          user_id: userId,
          user_id_wone: userId,
          user_company_name: companyName,
          private_session_instance_id: id,
          private_session_name: title,
          list_name: listName,
          list_position: listPosition,
          page_title: document.title,
          page_path: window.location.pathname,
        });
      }

      isViewSentRef.current = true;
    }
  }, [data, location, listName, listPosition]);

  onPrefixPageTitle(data?.learnerSession?.title);

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
    about,
    date,
    equipment,
    imageUrl,
    pillarLabel,
    practitioner,
    service,
    subtitle,
    time,
    title,
    biometrics,
    buttons,
  } = data.learnerSession as LearnerGroupSessionPartsFragment;

  const equipmentIcons = {
    "equipment-blocks": BlocksIcon,
    "equipment-bolster": BolsterIcon,
    "equipment-yoga-mat": YogaIcon,
    "equipment-blanket": BlanketIcon,
  };

  return (
    <PageContainer background="white">
      <PageHeader showBackButton />
      <PageContent maxWidth="sm">
        <div className={styles["session-picture-container"]}>
          <img
            className={styles["session-picture"]}
            src={imageUrl}
            alt="session-pic"
          />
          <div className={styles["pillar-service-container"]}>
            <div className={styles["pillar-service"]}>
              <img src={videoIcon} alt="video-icon" />
              <div className={styles["pills"]}>
                <ServicePill service={service} />
                <PillarPill pillarLabel={pillarLabel} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["header"]}>
            <div className={styles["title-container"]}>
              <h1 className={styles["title"]}>{title}</h1>
              <p className={styles["subtitle"]}>{subtitle}</p>
            </div>
            <div className={styles["time-biometrics-container"]}>
              <div className={styles["time-container"]}>
                <div className={styles["calender-div"]}>
                  <img
                    className={styles["calendar-icon"]}
                    src={calendarIcon}
                    alt="calendar"
                  />
                  <span className={styles["day"]}>{date}</span>
                </div>
                <div className={styles["clock-div"]}>
                  <img
                    className={styles["clock-icon"]}
                    src={clockIcon}
                    alt="clock"
                  />
                  <span className={styles["time"]}>{time}</span>
                </div>
              </div>
              {biometrics && biometrics?.label && (
                <div className={styles["biometrics-container"]}>
                  <img
                    className={styles["biometrics-icon"]}
                    src={BiometricsIcon}
                    alt="biometrics-icon"
                  />
                  <span className={styles["biometrics-title"]}>
                    {biometrics.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={styles["button-container"]}>
            {buttons.join && (
              <Button
                loading={actions[buttons.join?.action]?.loading}
                onClick={(event) =>
                  handleClickActionButton(event, buttons.join?.action)
                }
                variant={
                  buttons.join.style.toLowerCase() as "primary" | "secondary"
                }
                disabled={
                  buttons.join.style.toLowerCase() === "disabled" ? true : false
                }
                action={buttons.join?.action?.toLowerCase()}
              >
                {buttons.join.text}
              </Button>
            )}
            {buttons.register && (
              <Button
                loading={actions[buttons.register?.action]?.loading}
                onClick={(event) =>
                  handleClickActionButton(event, buttons.register?.action)
                }
                variant={
                  buttons.register.style.toLowerCase() as
                    | "primary"
                    | "secondary"
                }
                disabled={
                  buttons.register.style.toLowerCase() === "disabled"
                    ? true
                    : false
                }
                action={buttons.register?.action?.toLowerCase()}
              >
                {buttons.register.text}
              </Button>
            )}
            {buttons.trackBiometrics && (
              <Button
                onClick={() => setBiometricsConnectionModal(true)}
                variant={
                  buttons.trackBiometrics.style.toLowerCase() as
                    | "primary"
                    | "secondary"
                }
                disabled={
                  buttons.trackBiometrics.style.toLowerCase() === "disabled"
                    ? true
                    : false
                }
                action={buttons.trackBiometrics?.action?.toLowerCase()}
              >
                {buttons.trackBiometrics.text}
              </Button>
            )}
            {buttons.unRegister && (
              <Button
                loading={actions[buttons.unRegister?.action]?.loading}
                onClick={(event) =>
                  handleClickActionButton(event, buttons.unRegister?.action)
                }
                variant={
                  buttons.unRegister.style.toLowerCase() as
                    | "primary"
                    | "secondary"
                }
                disabled={
                  buttons.unRegister.style.toLowerCase() === "disabled"
                    ? true
                    : false
                }
                action={buttons.unRegister?.action?.toLowerCase()}
              >
                {buttons.unRegister.text}
              </Button>
            )}
          </div>
          {equipment && equipment.length && (
            <div className={styles["material-container"]}>
              <h3 className={styles["heading"]}>What you’ll need</h3>
              <div className={styles["material-pill"]}>
                {equipment.map((item) => (
                  <div className={styles["material-div"]} key={item.id}>
                    <Tile>
                      <span className={styles["materials"]}>
                        <img src={equipmentIcons[item.icon]} alt="icon" />
                        <h4 className={styles["material-label"]}>
                          {item.label}
                        </h4>
                      </span>
                    </Tile>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={styles["description-container"]}>
            <h3 className={styles["title"]}>The session</h3>
            <p className={styles["description"]}>{about}</p>
          </div>
          <div className={styles["expert-container"]}>
            <div className={styles["expert-header"]}>
              <img
                className={styles["icon"]}
                src={profileIcon}
                alt="profile-icon"
              />
              <h2 className={styles["title"]}>your experts</h2>
            </div>
            <PractitionerCard practitioner={practitioner} />
          </div>
        </div>
      </PageContent>
      <BiometricsDeviceConnectionModal
        isOpen={biometricsConnectionModal}
        setIsOpen={setBiometricsConnectionModal}
      />
    </PageContainer>
  );
};

export default SessionDetail;
