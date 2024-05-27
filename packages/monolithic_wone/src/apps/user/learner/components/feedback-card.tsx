import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import styles from "./feedback-card.module.scss";

interface FeedbackCardProps {
  name: string;
  sessionTitle: string;
  description: string;
  day: string;
  time: string;
  feedbackImage: string;
  calendarIcon: string;
  clockIcon: string;
}

const FeedbackCard = ({
  name,
  sessionTitle,
  description,
  day,
  time,
  feedbackImage,
  calendarIcon,
  clockIcon,
}: FeedbackCardProps) => {
  return (
    <div>
      <Card className={styles["card"]}>
        <div className={styles["feedback-header"]}>
          <img
            src={feedbackImage}
            alt="feedback-pic"
            className={styles["feedback-image"]}
          />
          <h6 className={styles["name"]}>{name}</h6>
        </div>
        <div>
          <CardTitle className={styles["session-name"]}>
            {sessionTitle}
          </CardTitle>
          <CardSubtitle>
            <div className={styles["time-container"]}>
              <div className="d-flex align-items-center gap-1">
                <img
                  className={styles["calendar-icon"]}
                  src={calendarIcon}
                  alt="calendar"
                />
                <span className={styles["day"]}>{day}</span>
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
          </CardSubtitle>
        </div>
        <CardBody className={styles["feedback-container"]}>
          <h4 className={styles["feedback"]}>{description}</h4>
        </CardBody>
      </Card>
    </div>
  );
};
export default FeedbackCard;
