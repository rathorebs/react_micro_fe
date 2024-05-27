import moment from "moment";
import React from "react";
import withRouter from "utility/with-router";
import DateContainer from "../../../components/commons/DateContainer/date-container.component";
import SessionContainer from "../../../components/commons/SessionContainer";
import SessionDetail from "../../../components/commons/SessionDetail/session-detail.component";

import "../../common/Schedule.css";

import { useSchedule } from "./useSchedule";

const Schedule = (props) => {
  const selectedDate = moment().clone();
  const {
    loading,
    modelStatus,
    listPosition,
    listName,
    sessionDetailData,
    closeDetailsDialog,
    handleRegisterPress,
    handleSessionCardClick,
    sortedUserSessionWeek,
    handleunRegisterPress,
    sortedUserSessionToday,
  } = useSchedule();

  return (
    <div className="corporate-container">
      <div className="tsession-calendar">
        <DateContainer />

        {!!sortedUserSessionToday.length && (
          <SessionContainer
            sessionData={sortedUserSessionToday}
            heading={`Today, ${selectedDate.format("dddd Do MMMM")}`}
            history={props.history}
            loading={loading}
            handleRegisterPress={handleRegisterPress}
            handleSessionCardClick={handleSessionCardClick}
            listName={"LearnerScheduleTodaysSessions"}
          />
        )}

        {!!sortedUserSessionWeek.length && (
          <SessionContainer
            sessionData={sortedUserSessionWeek}
            heading={`Sessions this week`}
            history={props.history}
            loading={loading}
            handleRegisterPress={handleRegisterPress}
            handleSessionCardClick={handleSessionCardClick}
            listName={"LearnerScheduleThisWeeksSessions"}
          />
        )}
      </div>

      {/* ***************************************Initial Sesions Details Start*********************************** */}

      {!!sessionDetailData && modelStatus && (
        <SessionDetail
          session={sessionDetailData}
          history={props.history}
          classType={sessionDetailData.__typename}
          closeDetailsDialog={closeDetailsDialog}
          modelToogle={closeDetailsDialog}
          handleunRegisterPress={handleunRegisterPress}
          listPosition={listPosition}
          listName={listName}
        />
      )}
    </div>
  );
};
export default withRouter(Schedule);
