import React, { useCallback, useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { DefaultPlayer as Video } from "react-html5video";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import constant from "../../../Constant";
import {
  RECORDINGS_DETAILS,
  USER_FAVORITES_RECORDINGS,
} from "../../../utility/graphQl/query";

import {
  REPORT_RECORDING_OPEN,
  REPORT_RECORDING_VIDEO_START,
  REPORT_RECORDING_VIDEO_PROGRESS,
  REPORT_RECORDING_VIDEO_END,
} from "../../../utility/graphQl/mutation";

import Favourite from "../../../components/commons/favourite/favourite.component";
import ReacrdingThumbPH from "../../../Assets/images/reacrdingThumbPH.jpg";
import books_img from "../../../Assets/books.svg";
import "react-html5video/dist/styles.css";
import "./recording-detail.styles.scss";
import NotFound from "../../../components/NotFound";
import Page from "../../Page";

const RecordingsDetail = (props) => {
  const [recordingDetail, setRecordingDetail] = useState([]);
  const [favouriteStatus, setFavouriteStatus] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isPageFound, setPageFound] = useState(true);

  const groupUuidRef = useRef(null);
  const progressReportRef = useRef({
    10: false,
    25: false,
    50: false,
    75: false,
  });

  const { recordingId } = useParams();
  const userID = localStorage.getItem("userID");
  const companyName = localStorage.getItem("companyName") || "NA";
  const recordingName =
    recordingDetail?.groupSessionInstance?.groupSession?.name;
  const listName = props?.location?.state?.listName;
  const listPosition = props?.location?.state?.listPosition;

  const CREATE_UPDATE_USER_FAVOURITES = gql`
    mutation CreateUpdateUserFavourites($input: UserFavouritesInput!) {
      createUpdateUserFavourites(input: $input) {
        ok
        userFavorites {
          id
          recordings {
            id
          }
        }
      }
    }
  `;

  const [reportRecordingOpen] = useMutation(REPORT_RECORDING_OPEN, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      groupUuidRef.current = response.reportRecordingOpen.groupUuid;
    },
    onError(error) {
      console.log("reportRecordingOpen error", error);
    },
  });

  const [reportRecordingVideoStart] = useMutation(REPORT_RECORDING_VIDEO_START);

  const [reportRecordingVideoProgress] = useMutation(
    REPORT_RECORDING_VIDEO_PROGRESS
  );

  const [reportRecordingVideoEnd] = useMutation(REPORT_RECORDING_VIDEO_END);

  const handleOpen = useCallback(() => {
    reportRecordingOpen({
      variables: {
        recordingId: recordingId,
        at: new Date().getTime(),
        platform: constant.APP_PLATFORM,
      },
    });
  }, [reportRecordingOpen, recordingId]);

  const handlePlay = () => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    logAnalyticsEvent("recording_play_click", {
      user_id: userID,
      user_id_wone: userID,
      recording_id: recordingId,
      user_company_name: companyName,
      recording_name: recordingName,
      list_name: listName ?? undefined,
      list_position: listPosition ?? undefined,
      page_title: pageTitle,
      page_path: pagePath,
    });

    if (!isPlayed) {
      reportRecordingVideoStart({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
        },
      });

      setIsPlayed(true);
    }
  };

  const handleEnd = () => {
    if (!isEnded) {
      reportRecordingVideoEnd({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
        },
      });

      setIsEnded(true);
    }
  };

  const handleProgress = (event) => {
    if (!groupUuidRef.current) return;

    const { duration, currentTime } = event.target;
    const percentage = (currentTime / duration) * 100;
    if (!progressReportRef.current[10] && percentage >= 10 && percentage < 25) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });
      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
      };
    } else if (
      !progressReportRef.current[25] &&
      percentage >= 25 &&
      percentage < 50
    ) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });

      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
        25: true,
      };
    } else if (
      !progressReportRef.current[50] &&
      percentage >= 50 &&
      percentage < 75
    ) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });

      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
        25: true,
        50: true,
      };
    } else if (
      !progressReportRef.current[75] &&
      percentage >= 75 &&
      percentage < 100
    ) {
      reportRecordingVideoProgress({
        variables: {
          recordingId: recordingId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
          percentage,
          duration,
          currentTime,
        },
      });

      progressReportRef.current = {
        ...progressReportRef.current,
        10: true,
        25: true,
        50: true,
        75: true,
      };
    }
  };

  useQuery(RECORDINGS_DETAILS, {
    fetchPolicy: "no-cache",
    variables: { id: recordingId },
    onCompleted(response) {
      setRecordingDetail(response);
      getFavouriteRecording();
      handleOpen();
    },
    onError(error) {
      console.log("load recordings error", error);
      setPageFound(false);
    },
  });

  const [getFavouriteRecording] = useLazyQuery(USER_FAVORITES_RECORDINGS, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      if (response.userFavourites.recordings.length > 0) {
        const favouriteStatus = response.userFavourites.recordings.filter(
          (e) => e.id === recordingId
        );
        setFavouriteStatus(!!favouriteStatus.length ? true : false);
      }
    },
    onError(error) {
      console.log("load user_favorites error", error);
    },
  });
  const [userFavourites] = useMutation(CREATE_UPDATE_USER_FAVOURITES);

  const handleClick = (e) => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    e.preventDefault();
    !favouriteStatus &&
      logAnalyticsEvent("recording_add_to_favourites_click", {
        user_id: userID,
        user_id_wone: userID,
        recording_id: recordingId,
        user_company_name: companyName,
        recording_name: recordingName,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    userFavourites({
      variables: {
        input: {
          groupSessionInstances: recordingId,
          remove: favouriteStatus,
        },
      },
    })
      .then((res) => {
        setFavouriteStatus(!favouriteStatus);
        !favouriteStatus &&
          logAnalyticsEvent("recording_added_to_favourites", {
            user_id: userID,
            user_id_wone: userID,
            recording_id: recordingId,
            user_company_name: companyName,
            recording_name: recordingName,
            list_name: listName ?? undefined,
            list_position: listPosition ?? undefined,
            page_title: pageTitle,
            page_path: pagePath,
          });
      })
      .catch((error) => {
        // errors["UserFavourire"] = "load UserFavourire error";
        console.log("load user_favorites error", error);
      });
  };

  useEffect(() => {
    if (recordingName) {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("recording_view", {
        user_id: userID,
        user_id_wone: userID,
        recording_id: recordingId,
        user_company_name: companyName,
        recording_name: recordingName,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  }, [recordingName, listName, listPosition, recordingId, companyName, userID]);

  if (!isPageFound) {
    return <NotFound />;
  }

  return (
    recordingDetail &&
    !!recordingDetail.groupSessionInstance && (
      <Page
        title={`${recordingDetail.groupSessionInstance.groupSession.name} - Recordings`}
      >
        <div className="tsession-container corporate-container corporate-container-white">
          <div className="recordings-details">
            <div className="detail-header">
              <div className="col-left">
                <h4>
                  {recordingDetail.groupSessionInstance.groupSession.name} with{" "}
                  {
                    recordingDetail.groupSessionInstance.teacher.userdetailObj
                      .userObj.firstName
                  }{" "}
                </h4>
              </div>
              <div className="col-right fav-container">
                <Favourite handleClick={handleClick} status={favouriteStatus} />
              </div>
            </div>
            <div className="video-container">
              <Video
                autoPlay={false}
                muted={false}
                controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
                poster={
                  recordingDetail.groupSessionInstance.recordingUrlThumbnail ==
                  null
                    ? ReacrdingThumbPH
                    : recordingDetail.groupSessionInstance.recordingUrlThumbnail
                }
                onPlay={handlePlay}
                onEnded={handleEnd}
                onTimeUpdate={handleProgress}
              >
                <source
                  src={recordingDetail.groupSessionInstance.recordingUrl}
                  type="video/mp4"
                />
                {/*  <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default /> */}
              </Video>
            </div>
            <div className="video-desc">
              {recordingDetail.groupSessionInstance.groupSession
                .description && (
                <>
                  <h6>
                    {recordingDetail.groupSessionInstance.recordingDurationText}
                  </h6>
                  <h3>About this session</h3>{" "}
                  <p>
                    {
                      recordingDetail.groupSessionInstance.groupSession
                        .description
                    }
                  </p>
                </>
              )}
              {/* Below textual contents commented out based on TECH-976 */}
              {/* <h3>
              What’s a{" "}
              {recordingDetail.groupSessionInstance.groupSession.groupSessionFor.toLowerCase()}{" "}
              session?
            </h3>
            <p>
              These sessions are livestreamed and open for anyone in our{" "}
              {recordingDetail.groupSessionInstance.groupSession.groupSessionFor.toLowerCase()}{" "}
              to join. They provide an opportunity to learn from our most
              experienced practitioners in a nurturing environment and discover
              which practices you would like to deepen further on an individual
              level.
            </p> */}

              {recordingDetail.groupSessionInstance.groupSession
                .preparationMaterial && (
                <div className="preparation-material">
                  <span>
                    <img className="mr-2" src={books_img} alt="books" />
                  </span>
                  <span>
                    {
                      recordingDetail.groupSessionInstance.groupSession
                        .preparationMaterial
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    )
  );
};

export default RecordingsDetail;
