import React from "react";
import FormEditFeedback from "../Feedback/FormEditFeedback";
import SessionContainer from "../../../components/commons/SessionContainer";
import SessionDetail from "../../../components/commons/SessionDetail/session-detail.component";

import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
} from "apps/user/learner/components/page-container";
import { useSession } from "./useSession";

const SESSIONS_HEADING = "Upcoming live sessions";

const Sessions = (props) => {
  const {
    loading,
    openAddEditPopup,
    handleSessionCardClick,
    modelStatus,
    upcomingSession,
    sessionDetailData,
    closeDetailsDialog,
    handleRegisterPress,
    closeFeedbackForm,
    handleAddEditFeedback,
    handleunRegisterPress,
    handleClickToJoin,
    listName,
    listPosition,
  } = useSession();

  if (loading) {
    return (
      <PageContainer background="white">
        <PageHeader transparent />
        <PageContent maxWidth="lg">
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer transparent className="custom-practitioner">
      <PageContent className="practitioner-page-content">
        <div className="tsession-calendar">
          {!!upcomingSession.length && (
            <SessionContainer
              userType="teacher"
              sessionData={upcomingSession}
              heading={SESSIONS_HEADING}
              history={props.history}
              loading={loading}
              handleRegisterPress={handleRegisterPress}
              handleSessionCardClick={handleSessionCardClick}
              handleAddEditFeedback={handleAddEditFeedback}
              handleClickToJoin={handleClickToJoin}
              listName={"PractitionerSessionsUpcomingGroupSessions"}
            />
          )}
        </div>

        {modelStatus && (
          <SessionDetail
            userType="teacher"
            session={sessionDetailData}
            handleRegisterPress={handleRegisterPress}
            handleunRegisterPress={handleunRegisterPress}
            closeDetailsDialog={closeDetailsDialog}
            history={props.history}
            loading={loading}
            handleAddEditFeedback={handleAddEditFeedback}
            handleClickToJoin={handleClickToJoin}
            listName={listName}
            listPosition={listPosition}
          />
        )}
        {openAddEditPopup && (
          <FormEditFeedback
            sessionDetailData={sessionDetailData}
            closeForm={closeFeedbackForm}
          />
        )}
      </PageContent>
    </PageContainer>
  );
};

export default Sessions;
