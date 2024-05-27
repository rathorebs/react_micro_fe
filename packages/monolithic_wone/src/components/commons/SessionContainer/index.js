import React, { memo } from "react";
import SessionCard from "../SessionCard";
import PropTypes from "prop-types";
import { getDayType } from "../../../utility/Function";

const SessionContainer = (props) => {
  const { heading, sessionData, listName } = props;

  return (
    <div className="today-tsession pt-0 mb-5">
      <h3>{heading}</h3>
      {sessionData.map((session, index) => {
        return (
          <SessionCard
            {...props}
            key={index}
            listName={listName}
            listPosition={index + 1}
            session={session}
            isTodaysSession={getDayType(session).toLowerCase() === "today"}
          />
        );
      })}
    </div>
  );
};

export default memo(SessionContainer);

SessionContainer.defaultProps = {
  userType: "student",
  practionerAsStudent: false,
};

SessionContainer.propTypes = {
  userType: PropTypes.string,
  practionerAsStudent: PropTypes.bool,
  sessionData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  handleRegisterPress: PropTypes.func.isRequired,
  handleSessionCardClick: PropTypes.func.isRequired,
  listName: PropTypes.string.isRequired,
};
