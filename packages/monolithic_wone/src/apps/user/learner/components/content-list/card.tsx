import React, { useCallback, useEffect } from "react";
import { PillarPill, ServicePill } from "components/pill";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";

import styles from "./card.module.scss";

import {
  LearnerArticle,
  LearnerRecording,
  LearnerGroupSession,
  LearnerPractitioner,
  LearnerArticleCardPartsFragment,
  LearnerSessionCardPartsFragment,
  LearnerPrivateSession,
} from "apps/user/learner/api/types";

import { useInViews } from "utility/useInViews";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";

import PractitionerCard from "../practitioner-card";

import calendarIcon from "Assets/icon-calendar.svg";
import clockIcon from "Assets/icon-clock-time.svg";
import rightIcon from "Assets/icon-right.svg";
import videoIcon from "Assets/icon-video.svg";
import sessionIcon from "Assets/iconSession.svg";
import articleIcon from "Assets/iconArticle.svg";
import RecordingPic from "Assets/video_01.jpg";
import ArticlePic from "Assets/video_01.jpg";
import HeartRate from "Assets/icon/heart_icon.svg";
import HeartSmall from "Assets/icon/icon_heart_small.svg";
import ChartContainer from "../../pages/woneindex/chart-coontainer";

interface RecordingCardProps {
  recording: LearnerRecording;
  listName?: string;
  listPosition?: number;
}

const RecordingCard = ({
  recording: {
    id,
    imageUrl,
    service,
    pillarLabel,
    title,
    subtitle,
    sessionDuration,
  },
  listName,
  listPosition,
}: RecordingCardProps) => {
  const { ref, inView } = useInViews();

  const userID = localStorage.getItem("userID");
  const companyName = localStorage.getItem("companyName") || "NA";

  const logImpression = useCallback(
    () =>
      logAnalyticsEvent("recording_impression", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        recording_id: id,
        recording_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      }),
    [id, listName, listPosition, title, userID, companyName]
  );

  const logClick = useCallback(
    () =>
      logAnalyticsEvent("recording_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        recording_id: id,
        recording_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      }),
    [id, listName, listPosition, title, userID, companyName]
  );

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  return (
    <Link
      ref={ref}
      to={`/user/recordings/${id}`}
      onClick={logClick}
      state={{ listName, listPosition, pageTitlePrefix: title }}
    >
      <Card className={styles["card-container-main"]}>
        <div className={styles["card-imagecontent"]}>
          <img
            className={styles["card-mainimage"]}
            src={imageUrl ?? RecordingPic}
            alt="featured-icons"
          />
          <div className={styles["card-icon"]}>
            <img src={videoIcon} alt="video-icon" />
          </div>
          <div className={styles["card-pills"]}>
            {service && <ServicePill service={service} />}
            <PillarPill pillarLabel={pillarLabel} />
          </div>
        </div>
        <div className={styles["card-content"]}>
          <div className={styles["card-maincontent"]}>
            <h3 className={styles["card-maintitle"]}>{title}</h3>
            <img
              className={styles["card-righticon"]}
              src={rightIcon}
              alt="right-icon"
            />
          </div>
          <div className={styles["card-subcontent"]}>
            <p className={styles["card-subtitle"]}>{subtitle}</p>
            <p className={styles["card-time"]}>{sessionDuration}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

interface ArticleCardProps {
  article: LearnerArticleCardPartsFragment;
  listName?: string;
  listPosition?: number;
}

const ArticleCard = ({
  article: { id, imageUrl, pillarLabel, title, subtitle, readTime },
  listName,
  listPosition,
}: ArticleCardProps) => {
  const { ref, inView } = useInViews();

  const userID = localStorage.getItem("userID");
  const companyName = localStorage.getItem("companyName") || "NA";

  const logImpression = useCallback(
    () =>
      logAnalyticsEvent("article_impression", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        article_id: id,
        article_title: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      }),
    [id, listName, listPosition, title, userID, companyName]
  );

  const logClick = useCallback(
    () =>
      logAnalyticsEvent("article_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        recording_id: id,
        recording_name: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      }),
    [id, listName, listPosition, title, userID, companyName]
  );

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  return (
    <Link
      ref={ref}
      to={`/user/articles/${id}`}
      onClick={logClick}
      state={{ listName, listPosition, pageTitlePrefix: title }}
    >
      <Card className={styles["card-container-main"]}>
        <div className={styles["card-imagecontent"]}>
          <img
            className={styles["card-mainimage"]}
            src={imageUrl ?? ArticlePic}
            alt="featured-icons"
          />
          <div className={styles["card-icon"]}>
            <img src={articleIcon} alt="video-icon" />
          </div>
          <div className={styles["card-pills"]}>
            <PillarPill pillarLabel={pillarLabel} />
          </div>
        </div>
        <div className={styles["card-content"]}>
          <div className={styles["card-maincontent"]}>
            <h3 className={styles["card-maintitle"]}>{title}</h3>
            <img
              className={styles["card-righticon"]}
              src={rightIcon}
              alt="right-icon"
            />
          </div>
          <div className={styles["card-subcontent"]}>
            <p className={styles["card-subtitle"]}>{subtitle}</p>
            <p className={styles["card-time"]}>{readTime}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

interface SessionCardProps {
  session: LearnerSessionCardPartsFragment;
  listName?: string;
  listPosition?: number;
}

const SessionCard = ({
  session: {
    __typename,
    id,
    imageUrl,
    service,
    pillarLabel,
    title,
    subtitle,
    date,
    time,
  },
  listName,
  listPosition,
}: SessionCardProps) => {
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

  return (
    <Link
      ref={ref}
      to={`/user/sessions/group/${id}`}
      onClick={logClick}
      state={{ listName, listPosition, pageTitlePrefix: title }}
    >
      <Card className={styles["card-container-main"]}>
        <div className={styles["card-imagecontent"]}>
          <img
            className={styles["card-mainimage"]}
            src={imageUrl ?? RecordingPic}
            alt="featured-icons"
          />
          <div className={styles["card-icon"]}>
            <img src={sessionIcon} alt="video-icon" />
          </div>
          <div className={styles["card-pills"]}>
            {service && <ServicePill service={service} />}
            <PillarPill pillarLabel={pillarLabel} />
          </div>
        </div>
        <div className={styles["card-content"]}>
          <div className={styles["card-maincontent"]}>
            <h3 className={styles["card-maintitle"]}>{title}</h3>
            <img
              className={styles["card-righticon"]}
              src={rightIcon}
              alt="right-icon"
            />
          </div>
          <div className={styles["card-subcontent"]}>
            <p className={styles["card-subtitle"]}>{subtitle}</p>
          </div>
          <div className={styles["time-container"]}>
            <div className="d-flex align-items-center gap-1">
              <img
                className={styles["icon"]}
                src={calendarIcon}
                alt="calendar"
              />
              <span className={styles["date"]}>{date}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img className={styles["icon"]} src={clockIcon} alt="clock" />
              <span className={styles["time"]}>{time}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

interface BiometricsSessionCardProps {
  session: LearnerSessionCardPartsFragment;
  listName?: string;
  listPosition?: number;
}

const BiometricsSessionCard = ({
  session: {
    __typename,
    id,
    service,
    pillarLabel,
    title,
    date,
    time,
    biometrics: {
      heartrateGraph: {
        startValueLabel,
        endValueLabel,
        diffMessage,
        diffValueLabel,
        minValue,
        maxValue,
        stepValue,
        values,
        minTimeValue,
        maxTimeValue,
        stepTimeValue,
        timeValues,
      },
    },
  },
  listName,
  listPosition,
}: BiometricsSessionCardProps) => {
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

  const chartData = [["Time", "Value", { type: "string", role: "tooltip" }]];
  timeValues?.forEach((item, index) => {
    chartData.push([
      item,
      values[index.toString()],
      `${parseInt(values[index.toString()])}bpm`,
    ]);
  });

  const newVerticalTimes = [];
  for (let i = minValue; i <= maxValue; i = i + stepValue) {
    newVerticalTimes.push(i);
  }

  const newHorizontalTimes = [];
  for (let i = minTimeValue; i <= maxTimeValue; i = i + stepTimeValue) {
    newHorizontalTimes.push(i);
  }

  const chartOptions = {
    chartArea: {
      //width: "100%",
      height: "100%",
      top: "25%",
      left: "10%",
      //right: "0%",
      bottom: "25%",
    },
    /* tooltip: {
      isHtml: true,
    }, */
    height: 110,
    backgroundColor: "transparent",
    curveType: "function",
    legend: "none",
    colors: ["#a3d0e3"], //chart line color
    vAxis: {
      gridlines: { count: 3, color: "transparent" },
      baselineColor: "#212121",
      precision: 0,
      baseline: 0,
      minValue: minValue,
      maxValue: maxValue,
      format: "0",
      //ticks: [minValue, stepValue, maxValue],
      ticks: newVerticalTimes,
      textStyle: { color: "#929ba8" },
      viewWindowMode: "explicit",
      viewWindow: {
        max: maxValue,
        min: minValue,
      },
    },
    hAxis: {
      textStyle: { color: "#929ba8" },
      //textPosition: "none",
      gridlines: { count: 10, color: "transparent" },
      baselineColor: "#212121",
      precision: 0,
      baseline: 0,
      minValue: minTimeValue,
      maxValue: maxTimeValue,
      format: "0",
      //ticks: [minTimeValue, stepTimeValue, maxTimeValue],
      ticks: newHorizontalTimes,
      viewWindowMode: "explicit",
      viewWindow: {
        max: maxTimeValue,
        min: minTimeValue,
      },
    },
  };

  return (
    <Link
      ref={ref}
      to={`/user/sessions/group/${id}`}
      onClick={logClick}
      state={{ listName, listPosition, pageTitlePrefix: title }}
    >
      <Card className={styles["card-container-main"]}>
        <div className={styles["biometric-card-content"]}>
          <h3 className={styles["card-main-title"]}>{title}</h3>
          <div className={styles["time-container"]}>
            <div className="d-flex align-items-center gap-1">
              <img
                className={styles["icon"]}
                src={calendarIcon}
                alt="calendar"
              />
              <span className={styles["date"]}>{date}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img className={styles["icon"]} src={clockIcon} alt="clock" />
              <span className={styles["time"]}>{time}</span>
            </div>
          </div>
          <div className={styles["card-pills"]}>
            {service && <ServicePill service={service} />}
            <PillarPill pillarLabel={pillarLabel} />
          </div>
          <div className={styles["heart-rate-status"]}>
            <span className={styles["heart-rate-lbl"]}>{diffMessage}</span>
            <span className={styles["heart-rate-value"]}>
              <img src={HeartRate} alt="" /> {diffValueLabel}
            </span>
          </div>
          <div className={styles["chart-container"]}>
            <span className={styles["chart-high-value"]}>
              <img src={HeartSmall} alt="" />
              {startValueLabel}
            </span>
            <span className={styles["chart-low-value"]}>
              <img src={HeartSmall} alt="" />
              {endValueLabel}
            </span>
            <ChartContainer data={chartData} options={chartOptions} />
          </div>
        </div>
      </Card>
    </Link>
  );
};

interface CommonCardProps {
  item:
    | LearnerArticle
    | LearnerRecording
    | LearnerGroupSession
    | LearnerPrivateSession
    | LearnerPractitioner;
  listName?: string;
  listPosition?: number;
  showBiometrics?: boolean;
}

const CommonCard = ({
  item,
  listName,
  listPosition,
  showBiometrics,
}: CommonCardProps) => {
  switch (item.__typename) {
    case "LearnerRecording":
      return (
        <RecordingCard
          recording={item}
          listName={listName}
          listPosition={listPosition}
        />
      );
    case "LearnerArticle":
      return (
        <ArticleCard
          article={item}
          listName={listName}
          listPosition={listPosition}
        />
      );
    case "LearnerGroupSession":
      if (showBiometrics) {
        return (
          <BiometricsSessionCard
            session={item as LearnerSessionCardPartsFragment}
            listName={listName}
            listPosition={listPosition}
          />
        );
      } else {
        return (
          <SessionCard
            session={item as LearnerSessionCardPartsFragment}
            listName={listName}
            listPosition={listPosition}
          />
        );
      }
    case "LearnerPrivateSession":
      if (showBiometrics) {
        return (
          <BiometricsSessionCard
            session={item as LearnerSessionCardPartsFragment}
            listName={listName}
            listPosition={listPosition}
          />
        );
      } else {
        return (
          <SessionCard
            session={item as LearnerSessionCardPartsFragment}
            listName={listName}
            listPosition={listPosition}
          />
        );
      }
    case "LearnerPractitioner":
      return (
        <PractitionerCard
          practitioner={item}
          listName={listName}
          listPosition={listPosition}
        />
      );
  }
};

export default CommonCard;
