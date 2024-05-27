import React, { useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useInViews } from "../../../utility/useInViews";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import "./card-new.styles.scss";
import ReacrdingThumbPH from "../../../Assets/images/reacrdingThumbPH.jpg";
import PlayIcon from "../../../Assets/playIcon.svg";
export const CardNew = (props) => {
  const navigate = useNavigate();
  const { ref, inView } = useInViews();
  const companyName = localStorage.getItem("companyName") || "NA";
  const userID = localStorage.getItem("userID");

  const impressionType = props?.recording
    ? "recording_impression"
    : "article_impression";
  const impressionId = props?.recording?.id || props?.article?.id;
  const impressionNameTitle =
    props?.recording?.groupSession?.name || props?.article?.title;

  let listName = props?.listName;
  const listPosition = props?.listPosition;

  const logImpression = useCallback(() => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    if (impressionType === "recording_impression") {
      logAnalyticsEvent(impressionType, {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        recording_id: impressionId,
        recording_name: impressionNameTitle,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    } else {
      logAnalyticsEvent(impressionType, {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        article_id: impressionId,
        article_title: impressionNameTitle,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  }, [
    userID,
    companyName,
    impressionId,
    impressionNameTitle,
    listName,
    listPosition,
    impressionType,
  ]);

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  const handleRecordingDetails = (e, id) => {
    e.preventDefault();

    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    navigate(`/user/${props.recording ? "recordings" : "articles"}/${id}`, {
      state: {
        title: props.recording
          ? `${props.recording.groupSession.name} - Recordings`
          : `${props.article.title} - Articles`,
        listName: listName,
        listPosition: listPosition,
      },
    });
    if (props.recording) {
      logAnalyticsEvent("recording_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        recording_id: props.recording.id,
        recording_name: props.recording.groupSession.name,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    } else {
      logAnalyticsEvent("article_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        article_id: props.article.id,
        article_title: props.article.title,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  };

  return (
    <>
      {props.recording ? (
        <>
          <div
            className="col-12 col-sm-4 col-md-4 col-xl-4 col-xxl-3 mb-4"
            ref={ref}
          >
            <Link
              to={`/user/recordings/${props.recording.id}`}
              onClick={(e) => handleRecordingDetails(e, props.recording.id)}
            >
              <div className="card-container">
                <div className="thumb-container">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${
                        props.recording.recordingUrlThumbnail == null
                          ? ReacrdingThumbPH
                          : props.recording.recordingUrlThumbnail
                      })`,
                    }}
                  >
                    <span className="play-icon">
                      <img src={PlayIcon} alt="Play Recordings" />
                    </span>
                  </div>
                </div>
                <div className="thumb-description">
                  {
                    <p className="plan-type">
                      {props.recording.recordingDurationText}
                    </p>
                  }
                  <h2 className="recording-title">
                    {props.recording.groupSession.name}
                  </h2>
                  <p className="teacher-name">
                    with{" "}
                    {props.recording.teacher.userdetailObj.userObj.firstName}{" "}
                    {props.recording.teacher.userdetailObj.userObj.lastName}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div
            className="col-12 col-sm-4 col-md-4 col-xl-4 col-xxl-3 mb-4"
            ref={ref}
          >
            <Link
              to={`/user/articles/${props.article.id}`}
              onClick={(e) => handleRecordingDetails(e, props.article.id)}
            >
              <div className="card-container">
                <div className="thumb-container">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${
                        props.article.photo == null
                          ? ReacrdingThumbPH
                          : props.article.photo
                      })`,
                      backgroundPosition: "0 0",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
                <div className="article-description">
                  <h2
                    className="article-title"
                    dangerouslySetInnerHTML={{ __html: props.article.title }}
                  ></h2>
                  <p className="article-author">
                    by{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: props.article.author }}
                    ></span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
