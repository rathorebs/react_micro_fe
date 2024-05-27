import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import { PillarPill, ServicePill } from "components/pill";

import { PillarLabel } from "../api/types";

import styles from "./session-card.module.scss";

interface SessionCardProps {
  id: string;
  date: string;
  time: string;
  timeZone: string;
  title: string;
  subtitle: string;
  duration: string;
  imageURL: string;
  videoCameraIcon: string;
  rightArrow: string;
  calendarIcon: string;
  clockIcon: string;
  size: "mini" | "small" | "large";
  pillarLabel: PillarLabel;
  service: string;
  onClick?: () => void;
}

const SessionCard = ({
  id,
  date,
  time,
  timeZone,
  title,
  subtitle,
  imageURL,
  videoCameraIcon,
  rightArrow,
  calendarIcon,
  clockIcon,
  size,
  pillarLabel,
  service,
  duration,
  onClick,
  ...rest
}: SessionCardProps) => {
  return (
    <Link to={`/user/sessions/group/${id}`}>
      <div
        className={styles[`card-container`]}
        data-testid="session-card"
        onClick={onClick}
        {...rest}
      >
        <Card className={styles["card"]}>
          <div className={styles["card-top"]}>
            <img
              className={styles["video-camera-icon"]}
              src={videoCameraIcon}
              alt="video_camera"
            />
            <img
              className={"img-fluid " + styles["img"]}
              alt="Sample"
              src={imageURL}
            />
            {size !== "mini" && (
              <div className={styles["pills-container"]}>
                <ServicePill service={service} />
                <PillarPill pillarLabel={pillarLabel} />
              </div>
            )}
          </div>
          <CardBody className={styles["card-body"]}>
            <div className={styles["title-arrow-container"]}>
              <CardTitle className={styles["title"]} title={title} tag="h5">
                {title}
              </CardTitle>
              <div className={styles["detail-icon"]}>
                <img src={rightArrow} alt="right_arrow" />
              </div>
            </div>
            <div className={styles["subtitle-duration-container"]}>
              <CardSubtitle
                className={styles["subtitle"]}
                title={subtitle}
                tag="h6"
              >
                {subtitle}
              </CardSubtitle>
              {size !== "mini" && (
                <div className={styles["time-container"]}>
                  <div className="d-flex align-items-center gap-1">
                    <img
                      className={styles["calendar-icon"]}
                      src={calendarIcon}
                      alt="calendar"
                    />
                    <span className={styles["day"]}>{date}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <img
                      className={styles["clock-icon"]}
                      src={clockIcon}
                      alt="clock"
                    />
                    <span className={styles["time"]}>{time}</span>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default SessionCard;
