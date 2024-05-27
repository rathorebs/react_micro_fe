import React from "react";
import SettingsNavigation from "./components/settings-navigation";
import SettingsNavigationDetail from "./components/settings-navigation-detail";
import appInfo from "utility/app-info";
import { LEARNER_SCREEN_PROFILE } from "utility/graphQl/query";
import { useQuery } from "@apollo/client";
import {
  PageContainer,
  PageHeader,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

import styles from "./index.module.scss";

const Settings = () => {
  const { loading, error, data } = useQuery(LEARNER_SCREEN_PROFILE, {
    onError(error) {
      console.error("Error while fetching settings page", error);
    },
    variables: {
      appInfo,
    },
  });

  if (loading) {
    return (
      <PageContainer>
        <PageHeader transparent />
        <PageLoading />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader transparent />
        <PageError />
      </PageContainer>
    );
  }

  const { settings } = data.learner.screens.profile;

  return (
    <PageContainer background="white">
      <div className={styles["settings-container"]}>
        <SettingsNavigation settings={settings} />
        <SettingsNavigationDetail
          settings={settings}
          hasHealthData={data?.learner?.biometrics?.hasHealthData}
        />
      </div>
    </PageContainer>
  );
};

export default Settings;
