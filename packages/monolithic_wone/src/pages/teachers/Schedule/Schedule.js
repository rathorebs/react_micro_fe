import React from "react";
import moment from "moment";

import FormEditFeedback from "../Feedback/FormEditFeedback";
import DateContainer from "../../../components/commons/DateContainer/date-container.component";
import SessionContainer from "../../../components/commons/SessionContainer";
import SessionDetail from "../../../components/commons/SessionDetail/session-detail.component";

import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
} from "apps/user/learner/components/page-container";

import { useSchedule } from "./useSchedule";

const Schedule = (props) => {
  const selectedDate = moment().clone();

  const {
    loading,
    modelStatus,
    openAddEditPopup,
    sessionDetailData,
    closeDetailsDialog,
    handleRegisterPress,
    handleSessionCardClick,
    sortedTeacherSessionWeek,
    handleunRegisterPress,
    handleAddEditFeedback,
    sortedTeacherSessionToday,
    closeFeedbackForm,
    handleClickToJoin,
    listName,
    listPosition,
  } = useSchedule();

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
          <DateContainer />

          {!!sortedTeacherSessionToday.length && (
            <SessionContainer
              userType="teacher"
              sessionData={sortedTeacherSessionToday}
              heading={`Today, ${selectedDate.format("dddd Do MMMM")}`}
              history={props.history}
              loading={loading}
              handleRegisterPress={handleRegisterPress}
              handleSessionCardClick={handleSessionCardClick}
              handleAddEditFeedback={handleAddEditFeedback}
              handleClickToJoin={handleClickToJoin}
              listName={"PractitionerScheduleTodaysSessions"}
            />
          )}

          {!!sortedTeacherSessionWeek.length && (
            <SessionContainer
              userType="teacher"
              sessionData={sortedTeacherSessionWeek}
              heading={`Sessions this week`}
              history={props.history}
              loading={loading}
              handleRegisterPress={handleRegisterPress}
              handleSessionCardClick={handleSessionCardClick}
              handleAddEditFeedback={handleAddEditFeedback}
              handleClickToJoin={handleClickToJoin}
              listName={"PractitionerScheduleThisWeeksSessions"}
            />
          )}
        </div>
        {!!sessionDetailData && modelStatus && (
          <SessionDetail
            userType="teacher"
            session={sessionDetailData}
            history={props.history}
            classType={sessionDetailData.__typename}
            closeDetailsDialog={closeDetailsDialog}
            modelToogle={closeDetailsDialog}
            handleunRegisterPress={handleunRegisterPress}
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
export default Schedule;
