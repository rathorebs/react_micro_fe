import { useNavigate, Link } from "react-router-dom";
import { DefaultPlayer as Video } from "react-html5video";
import ModelDetailContainer from "../../../../components/commons/ModelDetailContainer/model-detail-container.component";
import { RecommendedVideos } from "../wonderIndexDetails/wonderIndexDetails.component";
import { RecommendedArticles } from "../wonderIndexDetails/wonderIndexDetails.component";
import close_icon from "../../../../Assets/close_icon.svg";
import "./woneIndexScore.styles.scss";

const WoneIndexScore = ({
  assessmentData,
  handleStartAssessment,
  assessmentTaken,
  modelStatus,
  closeDetailsDialog,
  waitingForAssessmentResults,
}) => {
  const {
    externalAssessment,
    externalAssessmentUrl,
    externalAssessmentDisplayButtonText,
    externalAssessmentWaitingVideoClip,
    externalAssessmentWaitingVideoTitle,
    externalAssessmentWebAppDisplayText,
  } = assessmentData;
  const navigate = useNavigate();
  const handleAssessmentDetail = (e, woneindexType) => {
    e.preventDefault();

    navigate(`/user/woneindex/${woneindexType}`, {
      state: {
        externalAssessment: externalAssessment,
      },
    });
  };

  const onEndedTest = () => {
    closeDetailsDialog(false);
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const recommendedArticlesListName = (pillar) => {
    return "WONEIndex" + capitalizeFirstLetter(pillar) + "PillarArticles";
  };

  const recommendedRecordingsListName = (pillar) => {
    return "WONEIndex" + capitalizeFirstLetter(pillar) + "PillarRecordings";
  };

  const recommendation = (pillar) => {
    return (
      (assessmentData.pillarRecommendations[pillar]?.recordings.length > 0 ||
        assessmentData.pillarRecommendations[pillar]?.articles.length > 0) && (
        <div className="recommended-content">
          {assessmentData.pillarRecommendations[pillar]?.recordings.length >
            0 && (
            <RecommendedVideos
              listName={recommendedRecordingsListName(pillar)}
              recommendedVideos={assessmentData.pillarRecommendations[
                pillar
              ]?.recordings.slice(0, 1)}
            />
          )}
          {assessmentData.pillarRecommendations[pillar]?.articles.length >
            0 && (
            <RecommendedArticles
              listName={recommendedArticlesListName(pillar)}
              recommendedArticles={assessmentData.pillarRecommendations[
                pillar
              ]?.articles.slice(0, 1)}
            />
          )}
        </div>
      )
    );
  };

  return (
    <>
      {modelStatus && (
        <ModelDetailContainer modelToogle={closeDetailsDialog}>
          <div className="modal-header">
            <div className="wone-modal-header">
              <button
                className="close custom-close"
                onClick={() => closeDetailsDialog(false)}
              >
                <span>
                  <img className="mr-2" src={close_icon} alt="Close" />
                </span>
              </button>
              <div className="video-header-container">
                {externalAssessmentWaitingVideoTitle}
              </div>
            </div>
          </div>

          <div className="model-body-inner video-body-container p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12>">
                <Video
                  autoPlay
                  onEnded={onEndedTest}
                  controls={[
                    "PlayPause",
                    "Seek",
                    "Time",
                    "Volume",
                    "Fullscreen",
                  ]}
                >
                  <source
                    src={externalAssessmentWaitingVideoClip}
                    type="video/mp4"
                  />
                </Video>
              </div>
            </div>
          </div>
        </ModelDetailContainer>
      )}
      {(waitingForAssessmentResults || externalAssessment == null) && (
        <div className="wone-index-score">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12>">
              <div className="score-box-common">
                <h6
                  dangerouslySetInnerHTML={{
                    __html: externalAssessmentWebAppDisplayText,
                  }}
                ></h6>
                <Link
                  to="/"
                  onClick={(e) =>
                    handleStartAssessment(
                      e,
                      externalAssessmentUrl,
                      assessmentTaken
                    )
                  }
                >
                  <div
                    className={
                      assessmentTaken
                        ? "btn-assessment diabled"
                        : "btn-assessment"
                    }
                  >
                    {externalAssessmentDisplayButtonText}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {externalAssessment !== null && (
        <div className="wone-index-score">
          <h3>Score breakdown</h3>
          <div className="row score-breakdown">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div className="score-box-left">
                <div className="score-header-energy">
                  {externalAssessment.energyScorePercentage}
                  <span>%</span>
                </div>
                <h4>Energy</h4>

                <div className="score-body">
                  <p>{externalAssessment.energyDescription}</p>

                  {recommendation("energy")}

                  <div className="btn-container">
                    <Link
                      to={`/user/woneindex/energy`}
                      onClick={(e) => handleAssessmentDetail(e, "energy")}
                    >
                      <span className="btn-assessment learn-more">
                        Learn more
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div className="score-box-left second">
                <div className="score-header-resilience">
                  {externalAssessment.resilienceScorePercentage}
                  <span>%</span>
                </div>
                <h4>Resilience</h4>

                <div className="score-body">
                  <p>{externalAssessment.resilienceDescription}</p>
                  {recommendation("resilience")}
                  <div className="btn-container">
                    <Link
                      to={`/user/woneindex/resilience`}
                      onClick={(e) => handleAssessmentDetail(e, "resilience")}
                    >
                      <span className="btn-assessment">Learn more</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-14 col-lg-4 col-xl-4 col-xxl-4">
              <div className="score-box-right">
                <div className="score-header-nutrition-activity">
                  {externalAssessment.nutritionScorePercentage}
                  <span>%</span>
                </div>
                <h4>Activity</h4>
                <div className="score-body">
                  <p>{externalAssessment.nutritionDescription}</p>
                  {recommendation("activity")}
                  <div className="btn-container">
                    <Link
                      to={`/user/woneindex/activity`}
                      onClick={(e) => handleAssessmentDetail(e, "activity")}
                    >
                      <span className="btn-assessment">Learn more</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default WoneIndexScore;
