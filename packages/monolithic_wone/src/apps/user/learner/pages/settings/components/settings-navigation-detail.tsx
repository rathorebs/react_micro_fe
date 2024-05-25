import React from "react";
import EditProfile from "./edit-profile";
import ChangePassword from "./change-password";
import Calendar from "./calendar";
import SettingsMembership from "./settings-membership";
import SettingsOurMission from "./settings-our-mission";
import Notifications from "./notifications";
import ManageDevices from "./manage-devices";
import HowItWorks from "./how-it-works";
import {
  LearnerSettings,
  LearnerBiometrics,
} from "apps/user/learner/api/types";
import { useParams } from "react-router-dom";

import styles from "./styles.module.scss";

interface SettingsNavigationDetailProps {
  settings: LearnerSettings;
  hasHealthData: LearnerBiometrics["hasHealthData"];
}

const SettingsNavigationDetail = ({
  settings,
  hasHealthData,
}: SettingsNavigationDetailProps) => {
  const { subnav } = useParams();

  const DetailView = {
    changepassword: <ChangePassword />,
    notifications: <Notifications notifications={settings.notifications} />,
    calendar: <Calendar calendar={settings.calendar} />,
    membership: <SettingsMembership membership={settings.membership} />,
    ourmission: <SettingsOurMission mission={settings.ourMission} />,
    managedevices: settings.biometrics && (
      <ManageDevices
        provider={settings.biometrics.providers}
        hasHealthData={hasHealthData}
      />
    ),
    "how-it-works": settings.biometrics && (
      <HowItWorks howItWorks={settings.biometrics.howItWorks} />
    ),
  };

  return (
    <div className={styles["settings-navigation-detail"]}>
      {subnav ? (
        DetailView[subnav]
      ) : (
        <EditProfile fields={settings.profile.fields} />
      )}
    </div>
  );
};

export default SettingsNavigationDetail;
