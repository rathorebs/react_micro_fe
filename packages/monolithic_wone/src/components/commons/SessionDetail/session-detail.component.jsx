import React, { useEffect } from "react";
import moment from "moment";
import functions from "../../../functions";
import constants from "../../../Constant";
import books_img from "../../../Assets/books.svg";
import RegisterButton from "../../../pages/users/RegisterButton";
import RegisterButtonTeacher from "../../../pages/teachers/RegisterButton";
import ModelDetailContainer from "../ModelDetailContainer/model-detail-container.component";
import close_icon from "../../../Assets/close_icon.svg";
import landscape_fallback from "../../../Assets/images/landscape_fallback.jpg";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import "./session-detail.styles.scss";

const SessionDetail = (props) => {
  const {
    userType,
    classType,
    session,
    closeDetailsDialog,
    modelToogle,
    listPosition,
    listName,
  } = props;

  const fullName = functions.getTeacherFullName(session, userType);

  const companyName = localStorage.getItem("companyName") || "NA";
  const userId = localStorage.getItem("userID");
  const groupSessionName = session?.groupSession?.name;
  const groupSessionInstanceId = session?.id;
  const sessionType = session?.__typename;

  useEffect(() => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    if (sessionType === "GroupSessionInstanceType") {
      logAnalyticsEvent("group_session_view", {
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
    }
  }, [
    sessionType,
    groupSessionName,
    groupSessionInstanceId,
    companyName,
    listName,
    listPosition,
    userId,
  ]);

  return (
    <ModelDetailContainer modelToogle={modelToogle}>
      {!session ? (
        <div className="spinner-border spinner-border-sm mr-2" />
      ) : (
        <>
          <div className="modal-header">
            <div className="bg-container">
              <img
                className="_teacher-demo-image"
                src={session.teacher?.landscapePhoto || landscape_fallback}
                alt="landscap-img"
              />
            </div>
            <button
              className="close custom-close"
              onClick={() => closeDetailsDialog(false)}
            >
              <span>
                <img className="mr-2" src={close_icon} alt="Close" />
              </span>
            </button>
          </div>
          <div className="model-body-inner custom-practitioner">
            <div className="row">
              <div className="col-12 col-sm-5 col-md-5 col-xl-5 col-xxl-5 mb-left-sec">
                <p className="model-session-details">Session detail</p>
                {classType === "ClassSessionType" ? (
                  <>
                    <h1>
                      {session.classObj.name} with {fullName}
                    </h1>

                    <div className="model-session-detail-time">
                      {functions.displayFullUTCToLocal(
                        session.startDateTime,
                        session.endDateTime,
                        "right"
                      )}
                      &nbsp;|&nbsp;
                      {functions.capitalize(session.classType.name)}
                    </div>
                  </>
                ) : (
                  <>
                    <h1>
                      {session.groupSession.name} with {fullName}
                    </h1>
                    <div className="model-session-detail-time">
                      {functions.displayFullUTCToLocal(
                        session.instanceStartDateTime,
                        session.instanceDisplayEndDateTime
                          ? session.instanceDisplayEndDateTime
                          : session.instanceEndDateTime,
                        "right"
                      )}
                      &nbsp;|&nbsp;
                      {functions.capitalize(
                        session.groupSession.classType.name
                      )}
                    </div>
                  </>
                )}
                <div className="mt-3">
                  {userType === "teacher" ? (
                    <RegisterButtonTeacher showUnRegBtn={true} {...props} />
                  ) : (
                    <RegisterButton showUnRegBtn={true} {...props} />
                  )}
                </div>
              </div>
              {(!!session?.classObj?.description ||
                !!session?.groupSession.description) && (
                <div className="col-12 col-sm-7 col-md-7 col-xl-7 col-xxl-7 mb-right-sec">
                  {!!session?.classObj?.description ? (
                    <>
                      <h2>Description</h2>
                      {session.classObj.description
                        .split(/\r?\n/)
                        .map((p, index) => (
                          <p key={index}>{p}</p>
                        ))}
                    </>
                  ) : (
                    <>
                      <h2 className="mt-0">About this session</h2>
                      {session.groupSession.description
                        .split(/\r?\n/)
                        .map((p, index) => (
                          <p key={index}>{p}</p>
                        ))}
                      {/* Below textual contents commented out based on TECH-976 */}
                      {/* <h2 className="mt-2">
                          {session.groupSession.groupSessionFor === "COMMUNITY"
                            ? `What is a community session?`
                            : `What is a company session?`}
                        </h2>
                        <p>
                          {session.groupSession.groupSessionFor === "COMMUNITY"
                            ? `These sessions are open for anyone in our community to join. They provide an opportunity to learn from our most experienced practitioners in a nurturing environment and discover which practices you would like to deepen further on an individual level.`
                            : `These sessions are bespoke to your company and open for anyone in the team to join. They provide an opportunity to learn from our most experienced practitioners in a nurturing environment.`}
                        </p> */}

                      <p className="d-flex align-items-center light book-blocks">
                        <img className="mr-2" src={books_img} alt="books" />
                        {session.groupSession.preparationMaterial}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            {classType === "ClassSessionType" ? (
              <>
                {session && session?.feedbackByStudentId?.length > 0 && (
                  <p className="teacher-previous-feedback">
                    Previous feedback notes
                  </p>
                )}
                {session &&
                  session?.feedbackByStudentId?.map((feedback, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div key={index} className="tsession-feedback-right">
                          <div className="tsession-feedback-user-detail">
                            <img
                              src={feedback.teacher.userdetailObj.photo}
                              className="tsession-feedback-image"
                              alt=""
                            />
                            <div className="teacher-user-detail-user-name">
                              <h2>
                                {feedback.teacher.userdetailObj.userObj
                                  .firstName === null
                                  ? "anonymous"
                                  : `${feedback.teacher.userdetailObj.userObj.firstName} ${feedback.teacher.userdetailObj.userObj.lastName}`}
                              </h2>
                              <p className="px-0">
                                {feedback.session.classObj.name}
                              </p>
                            </div>
                            <p className="teacher-user-detail-date">
                              {moment(feedback.updatedAt).format("D MMM YYYY")}
                            </p>
                          </div>
                          <hr className="solid"></hr>
                          <div className="tsession-feedback-user-message">
                            <h2>{feedback.title}</h2>
                            <p>{feedback.notes}</p>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </>
            ) : (
              <>
                {!!session?.groupsessionpeoplejoiningSet.length &&
                  userType === "teacher" &&
                  session?.isLeadingTheSession && (
                    <>
                      <h2 className="people-joining-h2 pl-0">
                        People joining (
                        {session.groupsessionpeoplejoiningSet.length})
                      </h2>
                      <div className="tsession-people-joining">
                        {session?.groupsessionpeoplejoiningSet &&
                          session?.groupsessionpeoplejoiningSet?.map(
                            (resImg, index) => {
                              return (
                                <img
                                  title={`${resImg.user?.firstName} ${resImg.user?.lastName}`}
                                  className="people-joining-image lazy"
                                  src={
                                    resImg.user?.userdetail?.photo ||
                                    constants.PERSON_PLACEHOLDER_IMAGE
                                  }
                                  alt="thumb"
                                  key={index}
                                />
                              );
                            }
                          )}
                      </div>
                    </>
                  )}
              </>
            )}
          </div>
        </>
      )}
    </ModelDetailContainer>
  );
};

export default SessionDetail;
