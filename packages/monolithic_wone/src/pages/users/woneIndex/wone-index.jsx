import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import { STUDENT_PROFILE_PAGE } from "../../../utility/graphQl/query";
import functions from "../../../functions";
import WoneIndexHeader from "../woneIndex/woneIndexHeader/woneIndexHeader.component";
import WoneIndexScore from "../woneIndex/woneIndexScore/woneIndexScore.component";
import ModelDetailContainer from "../../../components/commons/ModelDetailContainer/model-detail-container.component";
import close_icon from "../../../Assets/close_icon.svg";

import "./wone-index.styles.scss";

const QUERY_UPDATE_STUDENT_DETAIL = gql`
  mutation UpdateStudentdetail($id: ID!, $input: StudentDetailUpdateInput!) {
    updateStudentdetail(id: $id, input: $input) {
      ok
      studentDetail {
        assessmentTaken
      }
    }
  }
`;

const RetakeAssessmentAnyTime = ({ assessmentData, assessmentTaken }) => {
  const { externalAssessmentUrl, retakeAssessmentDisplayButtonText } =
    assessmentData;
  const handleRetakeStartAssessment = (
    e,
    externalAssessmentUrl,
    assessmentTaken
  ) => {
    e.preventDefault();
    const companyName = localStorage.getItem("companyName") || "NA";
    const userID = localStorage.getItem("userID");
    if (assessmentTaken) {
      logAnalyticsEvent("start_reassessment", {
        user_id: userID,
        user_id_wone: userID,
        company_name: companyName,
      });
      const win = window.open(externalAssessmentUrl, "_self");
      win.focus();
    }
  };
  return (
    <>
      {assessmentData?.externalAssessment && (
        <div className='retake-anytime-container'>
          <Link
            to='/'
            onClick={(e) =>
              handleRetakeStartAssessment(
                e,
                externalAssessmentUrl,
                assessmentTaken
              )
            }
          >
            <div className='btn-retake-assessment'>
              {retakeAssessmentDisplayButtonText}
            </div>
          </Link>
          <p>
            You last took the survey on{" "}
            {functions.full_date_convert_utc_to_local_dd_mm_yyyyy(
              assessmentData?.externalAssessment?.createdAt
            )}
            , we recommend taking the survey at least once every 3 months.
          </p>
        </div>
      )}
    </>
  );
};

const RetakeAssessment = ({
  retakeAssessment,
  assessmentData,
  assessmentTaken,
}) => {
  const { externalAssessmentUrl, retakeAssessmentReminderDisplayButtonText } =
    assessmentData;
  const [modelStatus, setModelStatus] = useState(retakeAssessment);
  const closeDetailsDialog = () => {
    setModelStatus(false);
  };
  const handleRetakeStartAssessment = (
    e,
    externalAssessmentUrl,
    assessmentTaken,
    retakeAssessment
  ) => {
    e.preventDefault();
    const companyName = localStorage.getItem("companyName") || "NA";
    const userID = localStorage.getItem("userID");
    if (assessmentTaken && retakeAssessment) {
      logAnalyticsEvent("start_reassessment", {
        user_id: userID,
        user_id_wone: userID,
        company_name: companyName,
      });
      const win = window.open(externalAssessmentUrl, "_self");
      win.focus();
    } else {
      setModelStatus(false);
    }
  };
  return (
    <>
      {modelStatus && (
        <ModelDetailContainer
          modelToogle={closeDetailsDialog}
          modelClass='retake-model'
        >
          <div className='retake-model-container'>
            <div className='modal-header'>
              <div className='wone-modal-header'>
                <button
                  className='close custom-close'
                  onClick={() => closeDetailsDialog(false)}
                >
                  <span>
                    <img className='mr-2' src={close_icon} alt='Close' />
                  </span>
                </button>
              </div>
            </div>

            <div className='model-body-inner retake-model-body-container p-0'>
              <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12>'>
                  <h1>Time for another assessment!</h1>
                  <p>
                    It’s been over 3 months since your last assessment.
                    <br /> Take it again to see how you’ve improved
                  </p>
                  <Link
                    to='/'
                    onClick={(e) =>
                      handleRetakeStartAssessment(
                        e,
                        externalAssessmentUrl,
                        assessmentTaken,
                        retakeAssessment
                      )
                    }
                  >
                    <div className='btn-retake-assessment'>
                      {retakeAssessmentReminderDisplayButtonText}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ModelDetailContainer>
      )}
    </>
  );
};
const WoeIndex = (props) => {
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assessmentTaken, setAssessmentTaken] = useState(false);
  const [waitingForAssessmentResults, setWaitingForAssessmentResults] =
    useState(null);
  const [retakeAssessment, setRetakeAssessment] = useState(false);
  const [modelStatus, setModelStatus] = useState(false);
  const userID = localStorage.getItem("userID");

  const navigate = useNavigate();

  const [getStudentProfile, { stopPolling }] = useLazyQuery(
    STUDENT_PROFILE_PAGE,
    {
      fetchPolicy: "cache-and-network",
      pollInterval: 15000,
      onCompleted(response) {
        const { studentProfilePage } = response;
        const isAssessmentTaken =
          studentProfilePage?.studentData?.assessmentTaken;
        const isRetakeAssessment = studentProfilePage?.retakeAssessmentReminder;
        const isWaitingForAssessmentResults =
          studentProfilePage?.isWaitingForAssessmentResults;
        if (studentProfilePage.externalAssessment != null) {
          stopPolling();
        }
        if (isWaitingForAssessmentResults && !waitingForAssessmentResults) {
          setModelStatus(true);
        }
        setWaitingForAssessmentResults(isWaitingForAssessmentResults);
        setAssessmentData(studentProfilePage);
        setAssessmentTaken(isAssessmentTaken);
        setRetakeAssessment(isRetakeAssessment);
        setLoading(false);
      },
      onError(error) {
        console.log("load student_profile_data error", error);
        setLoading(false);
      },
    }
  );

  const [updateStudentDetailData] = useMutation(QUERY_UPDATE_STUDENT_DETAIL);

  const updateStudentConditional = () => {
    updateStudentDetailData({
      variables: {
        id: localStorage.getItem("studentID"),
        input: {
          assessmentTaken: true,
          shouldRetakeAssessment: false,
        },
      },
    })
      .then((res) => {
        navigate(`/user/woneindex`);
        getStudentProfile();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (
      window.location.pathname ===
      "/user/woneindex/external-assessment/complete"
    ) {
      updateStudentConditional();
    } else {
      getStudentProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartAssessment = (e, externalAssessmentUrl, assessmentTaken) => {
    e.preventDefault();
    const companyName = localStorage.getItem("companyName") || "NA";
    if (!assessmentTaken) {
      logAnalyticsEvent("start_assessment", {
        user_id: userID,
        user_id_wone: userID,
        company_name: companyName,
      });
      const win = window.open(externalAssessmentUrl, "_self");
      win.focus();
    } else {
      getStudentProfile();
      setModelStatus(true);
    }
  };

  const closeDetailsDialog = () => {
    setModelStatus(false);
    window.history.replaceState({}, {}, `/user/woneindex`);
  };

  return (
    <div className='woe-index-container tsession-container corporate-container'>
      <div className='woe-index-container-inner'>
        {!loading ? (
          <>
            {!!assessmentData ? (
              <>
                <WoneIndexHeader assessmentData={assessmentData} />
                {assessmentTaken && !waitingForAssessmentResults && (
                  <RetakeAssessmentAnyTime
                    assessmentTaken={assessmentTaken}
                    assessmentData={assessmentData}
                  />
                )}
                <WoneIndexScore
                  waitingForAssessmentResults={waitingForAssessmentResults}
                  assessmentData={assessmentData}
                  handleStartAssessment={handleStartAssessment}
                  assessmentTaken={assessmentTaken}
                  modelStatus={modelStatus}
                  closeDetailsDialog={closeDetailsDialog}
                />
              </>
            ) : (
              <div className='something-went-wrong'>
                <h6>We're sorry!</h6>
                <p>Something went wrong...</p>
              </div>
            )}
          </>
        ) : (
          <div className='loader-container'>
            <ContentLoader
              viewBox='0 0 400 160'
              height={160}
              width={400}
              backgroundColor='transparent'
            >
              <circle cx='150' cy='86' r='8' />
              <circle cx='194' cy='86' r='8' />
              <circle cx='238' cy='86' r='8' />
            </ContentLoader>
          </div>
        )}
        {retakeAssessment && (
          <RetakeAssessment
            retakeAssessment={retakeAssessment}
            assessmentTaken={assessmentTaken}
            assessmentData={assessmentData}
          />
        )}
      </div>
    </div>
  );
};
export default WoeIndex;
