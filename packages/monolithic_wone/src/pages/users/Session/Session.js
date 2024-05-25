import React from "react";

import { useSession } from "./useSession";

import SessionContainer from "../../../components/commons/SessionContainer";
import SessionDetail from "../../../components/commons/SessionDetail/session-detail.component";

import "react-toastify/dist/ReactToastify.css";

const SESSIONS_HEADING = "Upcoming live sessions";

const Sessions = (props) => {
  const {
    loading,
    handleClickJoin,
    handleSessionCardClick,
    modelStatus,
    listName,
    listPosition,
    upcomingSession,
    sessionDetailData,
    closeDetailsDialog,
    handleRegisterPress,
    handleAddEditFeedback,
    handleunRegisterPress,
  } = useSession();

  return (
    <div className="corporate-container">
      <div className="tsession-calendar">
        {!!upcomingSession.length && (
          <SessionContainer
            sessionData={upcomingSession}
            heading={SESSIONS_HEADING}
            history={props.history}
            loading={loading}
            handleClickJoin={handleClickJoin}
            handleRegisterPress={handleRegisterPress}
            handleSessionCardClick={handleSessionCardClick}
            handleAddEditFeedback={handleAddEditFeedback}
            listName={"LearnerSessionsUpcomingGroupSessions"}
          />
        )}
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
    </div>
  );
};

export default Sessions;
