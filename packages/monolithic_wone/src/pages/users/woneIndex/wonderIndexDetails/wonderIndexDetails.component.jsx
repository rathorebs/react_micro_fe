import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import ProgressCircularBar from "../../../../components/commons/ProgressCircularBar";
import { useQuery, useMutation } from "@apollo/client";
import SessionDetail from "../../../../components/commons/SessionDetail/session-detail.component";
import { STUDENT_PROFILE_PAGE } from "../../../../utility/graphQl/query";

import {
  REGISTER_FOR_GROUP_SESSION,
  UNREGISTER_FOR_GROUP_SESSION,
  USER_SESSION_LINK,
} from "../../../../utility/graphQl/mutation";
import { logAnalyticsEvent } from "../../../../utility/FirebaseAnalytics";
import Video_01 from "../../../../Assets/video_01.jpg";
import PlayIcon from "../../../../Assets/playIcon.svg";
import ProfileFallback from "../../../../Assets/profile_fallback.png";
import functions from "../../../../functions";
import constant from "../../../../Constant";
import { toast } from "react-toastify";
import Page from "../../../Page";
import { useInViews } from "../../../../utility/useInViews";
import "./wonderIndexDetails.styles.scss";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WoneDetailHeader = ({ woneIndexDetailType, externalAssessment }) => {
  const scorePercentage = (woneIndexDetailType, externalAssessment) => {
    if (woneIndexDetailType === "energy") {
      return externalAssessment?.energyScorePercentage;
    } else if (woneIndexDetailType === "resilience") {
      return externalAssessment?.resilienceScorePercentage;
    } else {
      return externalAssessment?.nutritionScorePercentage;
    }
  };
  return (
    <div className="wone-detail-header-container">
      <div className="wone-detai-pb-container">
        <ProgressCircularBar
          progress={scorePercentage(woneIndexDetailType, externalAssessment)}
          size={120}
          strokeWidth={6}
          circleOneStroke="#ffffff"
          circleTwoStroke="#5582a7"
          progressStatus={false}
          shadow={true}
        />
        <div className="svg-circle-text">
          {" "}
          {scorePercentage(woneIndexDetailType, externalAssessment)}
          <sup>%</sup>
        </div>
      </div>
      <h1>
        <span>{woneIndexDetailType}</span> score
      </h1>
    </div>
  );
};

const AboutYourScore = ({ woneIndexDetailType, externalAssessment }) => {
  const aboutYourScore = (woneIndexDetailType, externalAssessment) => {
    if (woneIndexDetailType === "energy") {
      return externalAssessment?.energyDescription;
    } else if (woneIndexDetailType === "resilience") {
      return externalAssessment?.resilienceDescription;
    } else {
      return externalAssessment?.nutritionDescription;
    }
  };
  return (
    <div className="about-your-score">
      <h2>About your score</h2>
      <p>{aboutYourScore(woneIndexDetailType, externalAssessment)}</p>
    </div>
  );
};
const RecommendedLiveSessions = ({
  recommendedLiveSessions,
  listName,
  props,
}) => {
  return (
    <div className="recommended-live-sessions">
      <h2>Recommended live sessions</h2>
      {recommendedLiveSessions &&
        recommendedLiveSessions.map((item, index) => (
          <RecommendedLiveSessionCard
            key={item.id}
            session={item}
            listName={listName}
            listPosition={index + 1}
            props={props}
          />
        ))}
    </div>
  );
};
const RecommendedLiveSessionCard = ({
  props,
  session,
  listName,
  listPosition,
}) => {
  const WEB_APP = "WEB-APP";
  const COMPANY = "COMPANY";
  const CORPORATE = "CORPORATE";
  const [modelStatus, setModelStatus] = useState(false);
  const [sessionDetailData, setSessionDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upcomingSession, setUpcomingSession] = useState([]);
  const [registerForSession] = useMutation(REGISTER_FOR_GROUP_SESSION);
  const [unRegisterFromSession] = useMutation(UNREGISTER_FOR_GROUP_SESSION);
  const upcomingSessions = "Upcoming sessions";
  const isTodaysSession = upcomingSessions.includes("Today");
  const studentId = localStorage.getItem("WOEstudentUserId");
  const { ref, inView } = useInViews();
  const params = useParams();
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName") || "NA";
  const userId = localStorage.getItem("userID");

  const [getUserSession] = useMutation(USER_SESSION_LINK, {
    onCompleted(res) {
      const data =
        res.userSessionLink?.groupSessionInstance ||
        res.userSessionLink?.privateSession;
      navigate.replace(
        `/user/session/${params.sessionType.toLowerCase()}/${params.sessionId}`,
        {
          state: {
            title: `${
              data?.groupSession?.name || data?.classObj?.name
            } - Sessions`,
          },
        }
      );

      data.isRegistered = checkIsSessionRegOrNot(data);

      setSessionDetailData(data);
    },
    onError(error) {
      closeDetailsDialog();
      //`It looks like that link didn’t quite work. Please find all your upcoming sessions here`
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const handleSessionCardClick = (e, session, type) => {
    e.preventDefault();

    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    session.isRegistered = checkIsSessionRegOrNot(session);
    let sessionType = type || "private";
    if (sessionType.toLowerCase() === "corporate") {
      sessionType = "company";
    }

    setModelStatus(true);
    setSessionDetailData(session);

    logAnalyticsEvent("group_session_click", {
      user_id: userId,
      user_id_wone: userId,
      user_company_name: companyName,
      group_session_instance_id: session?.id,
      group_session_name: session?.groupSession?.name,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });
  };
  const checkIsSessionRegOrNot = (data) => {
    return (
      data.isRegistered ||
      data?.groupsessionpeoplejoiningSet?.findIndex(
        (e) => e.user?.id === studentId
      ) > -1
    );
  };
  const closeDetailsDialog = () => {
    setModelStatus(false);
  };
  const updateSessionCardClickData = (data = null, status) => {
    if (!!data) {
      const filteredArr = upcomingSession;
      filteredArr.isRegistered = status;
      if (!status) {
        filteredArr.groupsessionpeoplejoiningSet =
          filteredArr.groupsessionpeoplejoiningSet?.filter(
            (e) => e.user?.id !== studentId
          );
      }
      setUpcomingSession(filteredArr);
      setSessionDetailData(filteredArr);
    }
  };

  const handleRegisterPress = (e, sessionDetailData) => {
    e?.stopPropagation();
    setLoading(true);

    if (sessionDetailData?.__typename === "GroupSessionInstanceType") {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("group_session_register_click", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        group_session_instance_id: sessionDetailData?.id,
        group_session_name: sessionDetailData?.groupSession?.name,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }

    registerForSession({
      variables: {
        input: {
          groupSessionID: sessionDetailData.groupSession.id,
          groupSessionInstanceID: sessionDetailData.id,
          userTimezone: functions.clientTimeZone(),
          sessionRegistrationPlatform: WEB_APP,
        },
      },
    })
      .then((res) => {
        setLoading(false);
        const isReg = true;
        updateSessionCardClickData(sessionDetailData, isReg);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleunRegisterPress = () => {
    if (sessionDetailData?.__typename === "GroupSessionInstanceType") {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("group_session_unregister_click", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        group_session_instance_id: sessionDetailData?.id,
        group_session_name: sessionDetailData?.groupSession?.name,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
    unRegisterFromSession({
      variables: {
        input: {
          groupSessionID: sessionDetailData.groupSession.id,
          groupSessionInstanceID: sessionDetailData.id,
          sessionRegistrationPlatform: constant.APP_PLATFORM,
        },
      },
    })
      .then(() => {
        const isReg = false;
        updateSessionCardClickData(sessionDetailData, isReg);
        closeDetailsDialog();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (params.sessionId && params.sessionType) {
      setModelStatus(true);
      let _sessionType = params.sessionType.toUpperCase();
      //change comapny to corporate value only
      if (_sessionType === COMPANY) {
        _sessionType = CORPORATE;
      }
      getUserSession({
        variables: {
          input: {
            userId: studentId,
            sessionId: params.sessionId,
            sessionType: _sessionType,
          },
        },
      });
    }
    setUpcomingSession(session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logImpression = useCallback(() => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;
    const groupSessionInstanceId = session?.id;
    const groupSessionName = session?.groupSession?.name;

    logAnalyticsEvent("group_session_impression", {
      user_id: userId,
      user_id_wone: userId,
      user_company_name: companyName,
      group_session_instance_id: groupSessionInstanceId,
      group_session_name: groupSessionName,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });
  }, [session, listName, listPosition, userId, companyName]);

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  return (
    <>
      <div key={session.id} ref={ref}>
        <div
          onClick={(e) =>
            handleSessionCardClick(
              e,
              session,
              session?.groupSession?.groupSessionFor
            )
          }
        >
          <div className="rls-date-time">
            {functions.displayFullUTCToLocal(
              session.instanceStartDateTime || session.startDateTime,
              session.instanceDisplayEndDateTime || session.endDateTime,
              isTodaysSession ? "hideDay" : "left"
            )}
          </div>
          <div className="rl-session">
            <div className="rls-thumb">
              <img
                src={
                  session?.groupSession?.photo
                    ? session?.groupSession?.photo
                    : ProfileFallback
                }
                alt="Article thumb"
              />
            </div>
            <div className="rls-desc">
              <p>
                Live Session · {session.teacher.userdetailObj.userObj.firstName}{" "}
                {session.teacher.userdetailObj.userObj.lastName}
              </p>
              <h6>{session.groupSession.name} </h6>
            </div>
          </div>
        </div>
      </div>

      {modelStatus && (
        <SessionDetail
          session={sessionDetailData}
          handleRegisterPress={handleRegisterPress}
          handleunRegisterPress={handleunRegisterPress}
          closeDetailsDialog={closeDetailsDialog}
          history={props.history}
          loading={loading}
          listName={listName}
          listPosition={listPosition}
        />
      )}
    </>
  );
};

const RecommendedVideoCard = ({ recording, listName, listPosition }) => {
  const navigate = useNavigate();
  const { ref, inView } = useInViews();

  const pagePath = window.location.pathname;
  const pageTitle = document.title;
  const companyName = localStorage.getItem("companyName") || "NA";
  const userId = localStorage.getItem("userID");

  const handleRecordingDetails = (e) => {
    console.log(e, recording, listName, listPosition);
    e.preventDefault();

    logAnalyticsEvent("recording_click", {
      user_id: userId,
      user_id_wone: userId,
      user_company_name: companyName,
      recording_id: recording?.id,
      recording_name: recording?.groupSession?.name,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });

    navigate({
      pathname: `/user/recordings/${recording.id}`,
      state: {
        title: `${recording.groupSession.name} - Recordings`,
        listName,
        listPosition,
      },
    });
  };

  const logImpression = useCallback(() => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    logAnalyticsEvent("recording_impression", {
      user_id: userId,
      user_id_wone: userId,
      user_company_name: companyName,
      recording_id: recording?.id,
      recording_name: recording?.groupSession?.name,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });
  }, [recording, listName, listPosition, userId, companyName]);

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);
  return (
    <div className="video-card" key={recording.id} ref={ref}>
      <Link
        to={`/user/recordings/${recording.id}`}
        onClick={(e) => handleRecordingDetails(e)}
      >
        <>
          <div className="video-thumb">
            <div
              className="image"
              style={{
                backgroundImage: `url(${
                  recording.recordingUrlThumbnail
                    ? recording.recordingUrlThumbnail
                    : Video_01
                })`,
              }}
            >
              <span className="play-icon">
                <img
                  src={PlayIcon}
                  alt="Play Recordings"
                  width="12px"
                  height="15px"
                />
              </span>
            </div>
          </div>
          <div className="video-thumb-desc">
            <h5>{recording.groupSession.name}</h5>
            <p>{recording.recordingDurationText}</p>
          </div>
        </>
      </Link>
    </div>
  );
};

export const RecommendedVideos = ({ recommendedVideos, listName, title }) => {
  return (
    <>
      <h3>{title} </h3>
      <div className="videos-card-container">
        {recommendedVideos &&
          recommendedVideos.map((item, index) => (
            <RecommendedVideoCard
              key={item.id}
              recording={item}
              listName={listName}
              listPosition={index + 1}
            />
          ))}
      </div>
    </>
  );
};

export const RecommendedArticleCard = ({ article, listName, listPosition }) => {
  const navigate = useNavigate();
  const { ref, inView } = useInViews();

  const companyName = localStorage.getItem("companyName") || "NA";
  const userId = localStorage.getItem("userID");

  const handleArticleDetails = (e) => {
    e.preventDefault();

    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    logAnalyticsEvent("article_click", {
      user_id: userId,
      user_id_wone: userId,
      user_company_name: companyName,
      article_id: article?.id,
      article_title: article?.title,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });

    navigate(`/user/articles/${article.id}`, {
      state: { title: `${article.title} - Articles`, listName, listPosition },
    });
  };

  const logImpression = useCallback(() => {
    const articleId = article?.id;
    const articleTitle = article?.title;
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    logAnalyticsEvent("article_impression", {
      user_id: userId,
      user_id_wone: userId,
      user_company_name: companyName,
      article_id: articleId,
      article_title: articleTitle,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });
  }, [article, listName, listPosition, userId, companyName]);

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  return (
    <div className="article-container" ref={ref}>
      <Link
        to={`/user/articles/${article.id}`}
        onClick={(e) => handleArticleDetails(e)}
      >
        <div className="articles">
          <div className="article-thumb">
            <img
              src={article.photo ? article.photo : ProfileFallback}
              alt="Article thumb"
            />
          </div>
          <div className="article-desc">
            <h6>{article.title}</h6>
            <p>by {article.author}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const RecommendedArticles = ({
  recommendedArticles,
  listName,
  title,
}) => {
  return (
    <>
      <h3>{title}</h3>
      {recommendedArticles &&
        recommendedArticles.map((item, index) => (
          <RecommendedArticleCard
            key={item.id}
            article={item}
            listName={listName}
            listPosition={index + 1}
          />
        ))}
    </>
  );
};

const WonderIndexDetails = (props) => {
  const woneindexType = props?.match?.params?.woneindexType;
  const navigate = useNavigate();

  let { pathname } = props.location;

  const { data } = useQuery(STUDENT_PROFILE_PAGE, {
    fetchPolicy: "cache-first",
    onError(error) {
      console.log("load student_profile_data error", error);
    },
  });

  let [pillarRecommendations, externalAssessment, studentData] = [
    null,
    null,
    null,
  ];

  if (data) {
    pillarRecommendations = data.studentProfilePage.pillarRecommendations;
    externalAssessment = data.studentProfilePage.externalAssessment;
    studentData = data.studentProfilePage.studentData;
  }

  const recommendedLiveSessionsListName =
    "WONEIndex" + capitalizeFirstLetter(woneindexType) + "PillarGroupSessions";
  const recommendedArticlesListName =
    "WONEIndex" + capitalizeFirstLetter(woneindexType) + "PillarArticles";
  const recommendedRecordingsListName =
    "WONEIndex" + capitalizeFirstLetter(woneindexType) + "PillarRecordings";

  const handleAssessmentDetail = (e, woneindexType) => {
    e.preventDefault();

    navigate(`/user/woneindex/${woneindexType}`);
  };

  if (
    pathname === `/user/woneindex/${woneindexType}` &&
    studentData?.assessmentTaken === false
  ) {
    return <Navigate to={{ pathname: "/user/woneindex" }} />;
  }
  return (
    !!pillarRecommendations && (
      <Page title={`${capitalizeFirstLetter(woneindexType)} - WONE Index`}>
        <div className="wone-index-details-container corporate-container">
          {!!externalAssessment && (
            <div className="wone-detail-header">
              <WoneDetailHeader
                woneIndexDetailType={woneindexType}
                externalAssessment={externalAssessment}
              />
            </div>
          )}

          <div className="container wone-detail-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-5 col-xxl-4">
                {!!externalAssessment && (
                  <AboutYourScore
                    woneIndexDetailType={woneindexType}
                    externalAssessment={externalAssessment}
                  />
                )}
                {pillarRecommendations[woneindexType]?.sessions.length > 0 && (
                  <RecommendedLiveSessions
                    props={props}
                    listName={recommendedLiveSessionsListName}
                    recommendedLiveSessions={pillarRecommendations[
                      woneindexType
                    ]?.sessions.slice(0, 3)}
                  />
                )}
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-5 col-xxl-4">
                {(pillarRecommendations[woneindexType]?.recordings.length > 0 ||
                  pillarRecommendations[woneindexType]?.articles.length >
                    0) && (
                  <div className="recommended-content">
                    <h2>Recommended content</h2>
                    <p>
                      We’ve curated a range of videos and articles that are
                      specifically designed to help you in this area.
                    </p>

                    {pillarRecommendations[woneindexType]?.recordings.length >
                      0 && (
                      <RecommendedVideos
                        listName={recommendedRecordingsListName}
                        recommendedVideos={pillarRecommendations[
                          woneindexType
                        ]?.recordings.slice(0, 2)}
                        title={"Recordings"}
                      />
                    )}
                    {pillarRecommendations[woneindexType]?.articles.length >
                      0 && (
                      <RecommendedArticles
                        listName={recommendedArticlesListName}
                        recommendedArticles={pillarRecommendations[
                          woneindexType
                        ]?.articles.slice(0, 2)}
                        title={"Articles"}
                      />
                    )}
                  </div>
                )}
                {!(
                  pillarRecommendations[woneindexType]?.recordings.length > 0 ||
                  pillarRecommendations[woneindexType]?.articles.length > 0 ||
                  pillarRecommendations[woneindexType]?.sessions.length > 0
                ) && (
                  <div className="recommended-content">
                    <h2>You’ve completed all the recommendations!</h2>
                    <p>
                      {woneindexType === "energy" && (
                        <>
                          Congratulations on prioritising your {woneindexType}!
                          Check out the
                          <Link
                            to="/user/woneindex/resilience"
                            onClick={(e) =>
                              handleAssessmentDetail(e, "resilience")
                            }
                          >
                            {" "}
                            Resilience{" "}
                          </Link>
                          and{" "}
                          <Link
                            to="/user/woneindex/activity"
                            onClick={(e) =>
                              handleAssessmentDetail(e, "activity")
                            }
                          >
                            Activity{" "}
                          </Link>
                        </>
                      )}
                      {woneindexType === "resilience" && (
                        <>
                          Congratulations on prioritising your {woneindexType}!
                          Check out the
                          <Link
                            to="/user/woneindex/energy"
                            onClick={(e) => handleAssessmentDetail(e, "energy")}
                          >
                            {" "}
                            Energy{" "}
                          </Link>
                          and{" "}
                          <Link
                            to="/user/woneindex/activity"
                            onClick={(e) =>
                              handleAssessmentDetail(e, "activity")
                            }
                          >
                            Activity{" "}
                          </Link>
                        </>
                      )}
                      {woneindexType === "activity" && (
                        <>
                          Congratulations on prioritising your {woneindexType}!
                          Check out the
                          <Link
                            to="/user/woneindex/energy"
                            onClick={(e) => handleAssessmentDetail(e, "energy")}
                          >
                            {" "}
                            Energy{" "}
                          </Link>
                          and{" "}
                          <Link
                            to="/user/woneindex/resilience"
                            onClick={(e) =>
                              handleAssessmentDetail(e, "resilience")
                            }
                          >
                            Resilience{" "}
                          </Link>
                        </>
                      )}
                      pillars for sessions that will keep increasing your
                      holistic health.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  );
};

export default WonderIndexDetails;
