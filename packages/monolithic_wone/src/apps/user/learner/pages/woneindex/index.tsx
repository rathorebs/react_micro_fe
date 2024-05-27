import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Progress, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import ContentListPreview from "apps/user/learner/components/content-list/preview";
import { LEARNER_SCREEN_INDEX } from "utility/graphQl/query";
import { LEARNER_EXTERNAL_ASSESSMENT_COMPLETE } from "utility/graphQl/mutation";
import appInfo from "utility/app-info";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import ChartContainer from "./chart-coontainer";
import styles from "./index.module.scss";
import IndexScore from "apps/user/common/components/index-score";
import { Button } from "apps/user/common/components/button";
import {
  LearnerIndexBreakdownPillar,
  LearnerIndexBiometricsSessionsHistory,
} from "apps/user/learner/api/types";
import BiometricsDeviceConnectionModal from "../settings/components/biometrics-device-connection-modal";
import TakeABreath from "./take-a-breath";
import iconRight from "Assets/icon/icon-right.svg";
import ZigZagIcon from "Assets/icon/biometrics.svg";
import iconDeviceNotConnected from "Assets/icon/lock_icon.svg";
import iconNoHistoryYet from "Assets/icon/lock_icon_dark.svg";

import clsx from "clsx";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

interface PillarBreakdownProps {
  pillarBreakdownData: LearnerIndexBreakdownPillar;
}

interface PropsNoDeviceNoSession {
  loading: boolean;
  dataSessionsHistory: LearnerIndexBiometricsSessionsHistory;
  setIsOpenBiometrics: (value) => void;
}

const NoDeviceNoSession = ({
  loading,
  dataSessionsHistory,
  setIsOpenBiometrics,
}: PropsNoDeviceNoSession) => {
  let callToActionButton = null;
  if (dataSessionsHistory?.state === "DEVICE_NOT_CONNECTED") {
    callToActionButton = (
      <Button
        variant="primary"
        type="submit"
        className="w-100"
        loading={loading}
        onClick={() => setIsOpenBiometrics(true)}
      >
        {dataSessionsHistory?.callToActionButtonText}
      </Button>
    );
  } else if (dataSessionsHistory?.state === "NO_SESSION_HISTORY") {
    callToActionButton = (
      <Link
        to="/user/sessions"
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          loading={loading}
          disabled={loading}
        >
          {dataSessionsHistory?.callToActionButtonText}
        </Button>
      </Link>
    );
  }

  return (
    <div className={styles["biometric-no-session-connected"]}>
      <div className={styles["biometric-no-session-connected-header"]}>
        <img src={ZigZagIcon} alt={"icon"} />
        <h2 className={styles["label"]}>
          {dataSessionsHistory?.contentList?.label}
        </h2>
        <span className={styles["line"]} />
      </div>
      <div className={styles["biometric-no-session-connected-card"]}>
        <div
          className={clsx(
            dataSessionsHistory?.state === "DEVICE_NOT_CONNECTED"
              ? styles["biometric-dnc-header"]
              : styles["biometric-nhy-header"]
          )}
        >
          <img
            src={
              dataSessionsHistory?.state === "DEVICE_NOT_CONNECTED"
                ? iconDeviceNotConnected
                : iconNoHistoryYet
            }
            alt={
              dataSessionsHistory?.state === "DEVICE_NOT_CONNECTED"
                ? "Device Not Connected"
                : "No History Yet"
            }
          />
          <h6>{dataSessionsHistory?.callToActionTitle}</h6>
          {dataSessionsHistory?.callToActionContentHtml && (
            <p>{dataSessionsHistory?.callToActionContentHtml}</p>
          )}
        </div>
        <div className={styles["button-container"]}>{callToActionButton}</div>
      </div>
    </div>
  );
};

const PillarBreakdown: React.FC<PillarBreakdownProps> = ({
  pillarBreakdownData,
}) => {
  return (
    <Link
      to={`/user/woneindex/${pillarBreakdownData?.pillarLabel.toLowerCase()}`}
    >
      <div className={styles["pillar-breakdown-container"]}>
        <IndexScore
          indexScoreData={pillarBreakdownData?.score}
          size={"small"}
        />
        {pillarBreakdownData && (
          <div className={styles["pillar-description"]}>
            <div className={styles["pillar-title"]}>
              <span>{pillarBreakdownData?.title} </span>
              <span>
                <img src={iconRight} alt="" />
              </span>
            </div>

            <div className={styles["pillar-subtitle"]}>
              {pillarBreakdownData?.subtitle}
            </div>
            <div className={styles["pillar-progress"]}>
              <Progress
                className={styles["progress-bar"]}
                value={pillarBreakdownData?.score?.value}
                barClassName={styles["custom-progress"]}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

const WoneIndex = () => {
  const navigate = useNavigate();
  const [isOpenBiometrics, setIsOpenBiometrics] = useState(false);
  const [learnerExternalAssessmentComplete] = useMutation(
    LEARNER_EXTERNAL_ASSESSMENT_COMPLETE,
    {
      fetchPolicy: "no-cache",
      onCompleted(response) {
        if (response?.learnerExternalAssessmentComplete?.ok) {
          navigate(`/user/woneindex`);
        }
      },
      onError(error) {
        console.error(
          "Error while fetching learner external assessment complete data",
          error
        );
      },
      variables: {
        appInfo,
      },
    }
  );

  useEffect(() => {
    if (
      window.location.pathname ===
      "/user/woneindex/external-assessment/complete"
    ) {
      learnerExternalAssessmentComplete();
    }
  }, [learnerExternalAssessmentComplete]);

  const {
    loading,
    error,
    data,
    refetch: refetchLearnerScreenIndex,
  } = useQuery(LEARNER_SCREEN_INDEX, {
    fetchPolicy: "cache-and-network",
    onError(error) {
      console.error("Error while fetching wone index data", error);
    },
    variables: {
      appInfo,
    },
  });

  const chartDataEnergy = [["Months", "Energy"]];
  data?.learner?.screens?.index?.progress?.labels.forEach((item, index) => {
    chartDataEnergy.push([
      item,
      data?.learner?.screens?.index?.progress?.energyData?.values[index],
    ]);
  });

  const chartDataResilience = [["Months", "Resilience"]];
  data?.learner?.screens?.index?.progress?.labels.forEach((item, index) => {
    chartDataResilience.push([
      item,
      data?.learner?.screens?.index?.progress?.resilienceData?.values[index],
    ]);
  });

  const chartDataActivity = [["Months", "Activity"]];
  data?.learner?.screens?.index?.progress?.labels.forEach((item, index) => {
    chartDataActivity.push([
      item,
      data?.learner?.screens?.index?.progress?.activityData?.values[index],
    ]);
  });

  /*  const chartData = [["Months", "Activity", "Energy", "Resilience"]];
  data?.learner?.screens?.index?.progress?.labels.forEach((item, index) => {
    chartData.push([
      item,
      data?.learner?.screens?.index?.progress?.activityData.values[index],
      data?.learner?.screens?.index?.progress?.energyData.values[index],
      data?.learner?.screens?.index?.progress?.resilienceData.values[index],
    ]);
  }); */

  const chartOptionsEnergy = {
    //width: 385,
    //height: 205,
    chartArea: { width: "70%", height: "70%", top: "15%" },
    backgroundColor: "transparent",
    //title: data?.learner?.screens?.index?.progress?.title,
    //INDEX OVER TIME
    title: "ENERGY OVER TIME",
    titleTextStyle: {
      color: "#212121",
      fontName: "Work Sans",
      fontWeight: 400,
      fontSize: 16,
    },
    curveType: "function",
    //legend: { position: "bottom" },
    legend: "none",

    colors: ["#bf3c57"],
    vAxis: {
      gridlines: { count: 12, color: "transparent" },
      baselineColor: "transparent",
      textStyle: { color: "#929ba8" },
      viewWindowMode: "explicit",
      viewWindow: {
        max: data?.learner?.screens?.index?.progress?.maxValue + 7,
        min: data?.learner?.screens?.index?.progress?.minValue,
      },
    },
    hAxis: { textStyle: { color: "#929ba8" } },
  };
  const chartOptionsActivity = {
    //width: 385,
    //height: 205,
    chartArea: { width: "70%", height: "70%", top: "15%" },
    backgroundColor: "transparent",
    //title: data?.learner?.screens?.index?.progress?.title,
    title: "ACTIVITY OVER TIME",
    titleTextStyle: {
      color: "#212121",
      fontName: "Work Sans",
      fontWeight: 400,
      fontSize: 16,
    },
    curveType: "function",
    //legend: { position: "bottom" },
    legend: "none",

    colors: ["#e6693e"],
    vAxis: {
      gridlines: { count: 12, color: "transparent" },
      baselineColor: "transparent",
      textStyle: { color: "#929ba8" },
      viewWindowMode: "explicit",
      viewWindow: {
        max: data?.learner?.screens?.index?.progress?.maxValue + 7,
        min: data?.learner?.screens?.index?.progress?.minValue,
      },
    },
    hAxis: { textStyle: { color: "#929ba8" } },
  };
  const chartOptionsResilience = {
    //width: 385,
    //height: 205,
    chartArea: { width: "70%", height: "70%", top: "15%" },
    backgroundColor: "transparent",
    //title: data?.learner?.screens?.index?.progress?.title,
    title: "RESILIENCE OVER TIME",
    titleTextStyle: {
      color: "#212121",
      fontName: "Work Sans",
      fontWeight: 400,
      fontSize: 16,
    },
    curveType: "function",
    //legend: { position: "bottom" },
    legend: "none",

    colors: ["#ec8f6e"],
    vAxis: {
      gridlines: { count: 12, color: "transparent" },
      baselineColor: "transparent",
      textStyle: { color: "#929ba8" },
      viewWindowMode: "explicit",
      viewWindow: {
        max: data?.learner?.screens?.index?.progress?.maxValue + 7,
        min: data?.learner?.screens?.index?.progress?.minValue,
      },
    },
    hAxis: { textStyle: { color: "#929ba8" } },
  };

  const handleRetakeStartAssessment = (e, url) => {
    e.preventDefault();

    const buttonText = e.target.innerText;
    const userID = localStorage.getItem("userID");
    const companyName = localStorage.getItem("companyName") || "NA";
    logAnalyticsEvent("start_reassessment", {
      user_id: userID,
      user_id_wone: userID,
      company_name: companyName,
      button_text: buttonText,
    });

    const win = window.open(url, "_self");
    win.focus();
  };

  if (loading && !data) {
    return (
      <PageContainer>
        <PageHeader transparent />
        <PageContent maxWidth="lg">
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader transparent />
        <PageContent maxWidth="lg">
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader transparent />
      <PageContent maxWidth="lg">
        <div className={styles["index-score-coach"]}>
          <Row>
            {data?.learner?.screens?.index?.score && (
              <Col sm="12" md="12" lg="4">
                <div className={styles["index-score-sec"]}>
                  {data?.learner?.screens?.index?.score?.labelHtml && (
                    <span
                      className={styles["index-score-desc"]}
                      dangerouslySetInnerHTML={{
                        __html: data?.learner?.screens?.index?.score?.labelHtml,
                      }}
                    />
                  )}
                  {data?.learner?.screens?.index?.score && (
                    <IndexScore
                      indexScoreData={data?.learner?.screens?.index?.score}
                      size={"big"}
                    />
                  )}
                </div>
              </Col>
            )}
            {data?.learner?.screens?.index?.coach && (
              <Col sm="12" md="12" lg="8">
                <div
                  className={clsx(
                    data?.learner?.screens?.index?.coach
                      ?.externalAssessmentButton &&
                      styles["has-external-button"],
                    styles["wone-index-coach"]
                  )}
                >
                  <div className={styles["coach-thumb"]}>
                    <img
                      src={data?.learner?.screens?.index?.coach?.avatarUrl}
                      alt=""
                    />
                  </div>
                  <div
                    className={clsx(
                      data?.learner?.screens?.index?.score
                        ? styles["coach-desc"]
                        : styles["score-null"],
                      styles["coach-desc"]
                    )}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          data?.learner?.screens?.index?.coach?.messageTextHtml,
                      }}
                    />
                    {data?.learner?.screens?.index?.coach
                      ?.externalAssessmentButton && (
                      <div
                        className={
                          styles["external-assessment-button-container"]
                        }
                      >
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                          loading={loading}
                          disabled={loading}
                          onClick={(e) =>
                            handleRetakeStartAssessment(
                              e,
                              data?.learner?.screens?.index?.coach
                                ?.externalAssessmentButton.url
                            )
                          }
                        >
                          {
                            data?.learner?.screens?.index?.coach
                              ?.externalAssessmentButton.text
                          }
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>

        <div className={styles["wone-index-data"]}>
          {data?.learner?.screens?.index?.breakdown && (
            <div className={styles["wone-index-breakdown"]}>
              <Row>
                <Col sm="12" md="12" lg="4">
                  <PillarBreakdown
                    pillarBreakdownData={
                      data?.learner?.screens?.index?.breakdown?.energy
                    }
                  />
                </Col>
                <Col sm="12" md="12" lg="4">
                  <PillarBreakdown
                    pillarBreakdownData={
                      data?.learner?.screens?.index?.breakdown?.resilience
                    }
                  />
                </Col>
                <Col sm="12" md="12" lg="4">
                  <PillarBreakdown
                    pillarBreakdownData={
                      data?.learner?.screens?.index?.breakdown?.activity
                    }
                  />
                </Col>
              </Row>
            </div>
          )}
          {data?.learner?.screens?.index?.progress && (
            <div className={styles["wone-index-chart-container"]}>
              <Row>
                {data?.learner?.screens?.index?.progress?.energyData?.values
                  ?.length > 0 && (
                  <Col sm="12" md="12" lg="4">
                    <div className={styles["wone-index-chart"]}>
                      <ChartContainer
                        data={chartDataEnergy}
                        options={chartOptionsEnergy}
                      />
                    </div>
                  </Col>
                )}
                {data?.learner?.screens?.index?.progress.resilienceData.values
                  .length > 0 && (
                  <Col sm="12" md="12" lg="4">
                    <div className={styles["wone-index-chart"]}>
                      <ChartContainer
                        data={chartDataResilience}
                        options={chartOptionsResilience}
                      />
                    </div>
                  </Col>
                )}
                {data?.learner?.screens?.index?.progress.activityData.values
                  .length > 0 && (
                  <Col sm="12" md="12" lg="4">
                    <div className={styles["wone-index-chart"]}>
                      <ChartContainer
                        data={chartDataActivity}
                        options={chartOptionsActivity}
                      />
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          )}
        </div>

        {data?.learner?.screens?.index?.biometrics && (
          <div className={styles["biometric-session-history"]}>
            {data?.learner?.screens?.index?.biometrics?.sessionsHistory
              ?.state === "HAS_SESSION_HISTORY" ? (
              <ContentListPreview
                seeMore={
                  data?.learner?.screens?.index?.biometrics?.sessionsHistory
                    ?.contentList.items.length > 3
                    ? true
                    : false
                }
                biometrics
                key={
                  data?.learner?.screens?.index?.biometrics?.sessionsHistory
                    ?.contentList.id
                }
                data={
                  data?.learner?.screens?.index?.biometrics?.sessionsHistory
                    ?.contentList
                }
                limit={3}
              />
            ) : (
              <NoDeviceNoSession
                setIsOpenBiometrics={setIsOpenBiometrics}
                loading={loading}
                dataSessionsHistory={
                  data?.learner?.screens?.index?.biometrics?.sessionsHistory
                }
              />
            )}
          </div>
        )}
      </PageContent>
      <BiometricsDeviceConnectionModal
        isOpen={isOpenBiometrics}
        setIsOpen={setIsOpenBiometrics}
      />
      <TakeABreath refetchLearnerScreenIndex={refetchLearnerScreenIndex} />
    </PageContainer>
  );
};

export default WoneIndex;
