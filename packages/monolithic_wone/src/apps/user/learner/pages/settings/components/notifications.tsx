import React, { useState } from "react";
import appInfo from "utility/app-info";
import { Switch } from "apps/user/common/components/fields/inputs";
import { LEARNER_UPDATE_NOTIFICATION_SETTINGS_TOGGLE } from "utility/graphQl/mutation";
import { useMutation } from "@apollo/client";
import { LearnerNotificationsSettings } from "apps/user/learner/api/types";

import styles from "./styles.module.scss";

interface NotificationsProps {
  notifications: LearnerNotificationsSettings;
}

const Notifications = ({ notifications }: NotificationsProps) => {
  const [updateToggleNotification] = useMutation(
    LEARNER_UPDATE_NOTIFICATION_SETTINGS_TOGGLE
  );
  const [errorMessage, setErrorMessage] = useState("");

  const { toggles } = notifications;

  const handleChange = (id, value) => {
    updateToggleNotification({
      variables: {
        appInfo,
        checked: value,
        id: id,
      },
    }).catch((error) => {
      setErrorMessage(error.message);
      console.error(error, "Error in notification toggle");
    });
  };

  return (
    <div className={styles["notifications"]}>
      <h1 className={styles["notifications-title"]}>{notifications.title}</h1>
      <div className={styles["notifications-switches"]}>
        {toggles &&
          toggles.map((item) => (
            <Switch
              key={item.id}
              id={item.id}
              label={item.label}
              checked={item.checked}
              onChange={handleChange}
              disabled={false}
            />
          ))}
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
