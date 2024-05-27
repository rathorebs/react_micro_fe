import React, { useState } from "react";
import appInfo from "utility/app-info";
import { Switch } from "apps/user/common/components/fields/inputs";
import { LEARNER_UPDATE_CALENDAR_SETTINGS_TOGGLE } from "utility/graphQl/mutation";
import { useMutation } from "@apollo/client";
import { LearnerCalendarSettings } from "apps/user/learner/api/types";

import styles from "./styles.module.scss";

interface CalendarProps {
  calendar: LearnerCalendarSettings;
}

const Calendar = ({ calendar }: CalendarProps) => {
  const [updateToggleCalendar] = useMutation(
    LEARNER_UPDATE_CALENDAR_SETTINGS_TOGGLE
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { toggles } = calendar;

  const handleChange = (id, value) => {
    updateToggleCalendar({
      variables: {
        appInfo,
        checked: value,
        id: id,
      },
    }).catch((error) => {
      setErrorMessage(error.message);
      console.error(error, "Error in calendar toggle");
    });
  };

  const handleDisabled = (id: string) => {
    const data = toggles.find((item) => item.id === "disableAll");
    if (data.checked && id === "disableAll") {
      return false;
    } else if (!data.checked) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className={styles["calendar"]}>
      <h1 className={styles["calendar-title"]}>{calendar.title}</h1>
      <div className={styles["calendar-switches"]}>
        {toggles &&
          toggles.map((item) => (
            <Switch
              key={item.id}
              id={item.id}
              label={item.label}
              checked={item.checked}
              onChange={handleChange}
              disabled={handleDisabled(item.id)}
            />
          ))}
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
