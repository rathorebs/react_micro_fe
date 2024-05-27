import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import Tile from "components/tile";

import { PillarPill, ServicePill } from "components/pill";
import { Button } from "apps/user/common/components/button";
import { useGroupSessionActions } from "../hooks/use-group-session-actions";
import { useInViews } from "utility/useInViews";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";

import videoIcon from "Assets/iconSession.svg";
import calendarIcon from "Assets/icon-calendar.svg";
import clockIcon from "Assets/icon-clock-time.svg";
import hourglassIcon from "Assets/icon-hourglass.svg";
import iconRight from "Assets/icon/icon-right.svg";

import { LearnerSessionCardWebPartsFragment } from "../api/types";

import styles from "./session-tile.module.scss";

interface SessionTileProps {
  session: LearnerSessionCardWebPartsFragment;
  listName?: string;
  listPosition?: number;
}

const SessionTile = ({ session, listName, listPosition }: SessionTileProps) => {
  const {
    __typename,
    id,
    imageUrl,
    pillarLabel,
    service,
    title,
    subtitle,
    date,
    time,
    duration,
    buttons,
  } = session;

  const actions = useGroupSessionActions({
    session,
  });
  const { ref, inView } = useInViews();

  const userID = localStorage.getItem("userID");
  const companyName = localStorage.getItem("companyName") || "NA";

  const logImpression = useCallback(() => {
    if (__typename === "LearnerGroupSession") {
      logAnalyticsEvent("group_session_impression", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        group_session_instance_id: id,
        group_session_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    } else if (__typename === "LearnerPrivateSession") {
      logAnalyticsEvent("private_session_impression", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        private_session_instance_id: id,
        private_session_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    }
  }, [__typename, id, listName, listPosition, title, userID, companyName]);

  const logClick = useCallback(() => {
    if (__typename === "LearnerGroupSession") {
      logAnalyticsEvent("group_session_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        group_session_instance_id: id,
        group_session_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    } else if (__typename === "LearnerPrivateSession") {
      logAnalyticsEvent("private_session_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        private_session_instance_id: id,
        private_session_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    }
  }, [__typename, id, listName, listPosition, title, userID, companyName]);

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  const handleClickActionButton = (event, action) => {
    event.preventDefault();
    event.stopPropagation();

    actions[action].action(listName, listPosition);
  };

  return (
    <Tile>
      <Link
        ref={ref}
        className={styles["child-tile"]}
        to={`/user/sessions/group/${id}`}
        onClick={logClick}
        state={{ listName, listPosition, pageTitlePrefix: title }}
      >
        <div className={styles["picture-container"]}>
          <img
            className={styles["picture"]}
            src={imageUrl}
            alt="session-background"
          />
          <img
            className={styles["video-icon"]}
            src={videoIcon}
            alt="video-icon"
          />
          <div className={styles["pill-container"]}>
            <ServicePill service={service} />
            <PillarPill pillarLabel={pillarLabel} />
          </div>
        </div>
        <div className={styles["session-detail"]}>
          <h3 className={styles["title"]}>{title}</h3>
          <p className={styles["sub-title"]}>{subtitle}</p>
          <div className={styles["time-container"]}>
            <div className="d-flex align-items-center gap-1">
              <img
                className={styles["calendar-icon"]}
                src={calendarIcon}
                alt="calendar"
              />
              <span className={styles["date"]}>{date}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img
                className={styles["clock-icon"]}
                src={clockIcon}
                alt="clock"
              />
              <span className={styles["time"]}>{time}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img
                className={styles["clock-icon"]}
                src={hourglassIcon}
                alt="hourglass"
              />
              <span className={styles["time"]}>{duration}</span>
            </div>
          </div>
          <div className={styles["pill-container"]}>
            <ServicePill service={service} />
            <PillarPill pillarLabel={pillarLabel} />
          </div>
        </div>
        <div className={styles["arrow-container"]}>
          <img src={iconRight} alt="Arrow pointing right" />
        </div>
        {buttons.join && (
          <div className={styles["button-container"]}>
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
          </div>
        )}
        {buttons.register && (
          <div className={styles["button-container"]}>
            <Button
              loading={actions[buttons.register?.action]?.loading}
              onClick={(event) =>
                handleClickActionButton(event, buttons.register?.action)
              }
              variant={
                buttons.register.style.toLowerCase() as "primary" | "secondary"
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
          </div>
        )}
      </Link>
    </Tile>
  );
};
export default SessionTile;
