import React, { memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { useInViews } from "../../../utility/useInViews";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import constants from "../../../Constant";
import functions from "../../../functions";
import session_eclipse_img from "../../../Assets/session-eclipse-img.png";
import session_eclipse_blue_img from "../../../Assets/session-eclipse-blue-img.png";
import "./session-card.styles.scss";
import RegisterButton from "../../../pages/users/RegisterButton";
import RegisterButtonTeacher from "../../../pages/teachers/RegisterButton";
import { capitalizeFirstLetter } from "../../../utility/Function";

const SessionCard = (props) => {
  const { ref, inView } = useInViews();
  const companyName = localStorage.getItem("companyName") || "NA";
  const userID = localStorage.getItem("userID");
  const location = useLocation();
  const param = useParams();
  const isSessionDetailPage = location.pathname.includes(param.sessionId);

  const {
    session,
    handleSessionCardClick,
    isTodaysSession,
    userType,
    listPosition,
    listName,
  } = props;

  let sessionType = session?.groupSession?.groupSessionFor || "private";

  if (
    sessionType.toLowerCase() === "corporate" ||
    sessionType.toLowerCase() === "community"
  ) {
    sessionType = "group";
  }

  const teacherName = functions.getTeacherFullName(session, userType);
  const isLeadingTheSession = (session) => {
    if (session.__typename === "GroupSessionInstanceType") {
      return session.isLeadingTheSession;
    } else if (session.__typename === "ClassSessionType") {
      //for the ClassSessionType practitioner is always teacher
      return userType === "teacher";
    } else {
      throw Error("Unexpected session type");
    }
  };
  const impressionId = session?.id;
  const impressionNameTitle = session?.groupSession?.name;

  const logImpression = useCallback(() => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;
    if (!isSessionDetailPage) {
      logAnalyticsEvent("group_session_impression", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        group_session_instance_id: impressionId,
        group_session_name: impressionNameTitle,
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
    isSessionDetailPage,
  ]);

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);
  // if practitioner is a learner isLeadingTheSession will return false
  const circleImage =
    userType === "teacher" && isLeadingTheSession(session)
      ? session_eclipse_blue_img
      : session_eclipse_img;
  return (
    <div
      className="d-flex flex-row position-relative mb-3 session-card"
      ref={ref}
    >
      <div>
        <img width="10" src={circleImage} alt="" />
      </div>
      <div className="flex-grow-1 ml-2">
        <div>
          <p className="p-0 mb-2 fiord font-sofia f18">
            {functions.displayFullUTCToLocal(
              session.instanceStartDateTime || session.startDateTime,
              session.instanceDisplayEndDateTime || session.endDateTime,
              isTodaysSession ? "show day on left" : "left"
            )}
          </p>
        </div>
        <div
          className="d-flex flex-row justify-content-start bg-white cursor-pointer"
          onClick={(e) =>
            handleSessionCardClick(
              e,
              session,
              sessionType,
              listName,
              listPosition
            )
          }
        >
          <div>
            <img
              className="thumbnail-img"
              src={
                session?.groupSession?.photo ||
                session?.teacher?.userdetailObj?.photo ||
                session?.student?.userdetailObj?.photo ||
                constants.PERSON_PLACEHOLDER_IMAGE
              }
              alt="thumb"
            />
          </div>
          <div className="d-flex flex-md-row flex-column w-100 align-items-md-center align-items-start p-3">
            <div className="flex-grow-1">
              <p className="pb-2 m-0 font-sofia">
                {session?.groupSession?.name || session?.classObj?.name}{" "}
              </p>
              <p className="p-0 flex-row font-poppins m-0">
                {!session?.isLeadingTheSession && `${teacherName}`}
                <span>
                  {session?.isLeadingTheSession &&
                    session?.groupSession?.corporateCompany?.name &&
                    session?.groupSession?.classObj?.name}
                  {session?.groupSession?.corporateCompany?.name &&
                    ` • ${capitalizeFirstLetter(
                      session?.groupSession?.corporateCompany?.name
                    )} `}
                  {session?.isLeadingTheSession &&
                    !session?.groupSession?.corporateCompany &&
                    session?.groupSession?.classObj?.name}
                </span>
              </p>
            </div>
            <div>
              {userType === "teacher" ? (
                <RegisterButtonTeacher {...props} />
              ) : (
                <RegisterButton {...props} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SessionCard);

SessionCard.propTypes = {
  session: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  practionerAsStudent: PropTypes.bool,
  history: PropTypes.object.isRequired,
  handleRegisterPress: PropTypes.func.isRequired,
  handleSessionCardClick: PropTypes.func.isRequired,
  listName: PropTypes.string.isRequired,
  listPosition: PropTypes.number.isRequired,
};
