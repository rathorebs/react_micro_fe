import React from "react";
import ArrowLeftBlackIcon from "Assets/iconChevron.svg";
import AccountIcon from "Assets/icon-article.svg";
import WoneIcon from "Assets/fill-9.svg";
import LegalIcon from "Assets/icon-article-new.svg";
import BiometricIcon from "Assets/healthMedicineHeartbeatHeart.svg";
import { LearnerSettings } from "apps/user/learner/api/types";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

interface SettingsNavigationProps {
  settings: LearnerSettings;
}

interface NavigationButtonProps {
  title: string;
  route?: string;
  link?: string;
  email?: string;
}

interface NavigationButtonContainerProps {
  icon?: string;
  title?: string;
  children?: React.ReactNode;
}

const NavigationButton = ({
  title,
  route,
  link,
  email,
}: NavigationButtonProps) => {
  const location = useLocation();
  let { pathname } = location;
  const length = pathname.split("/").length;
  const routeName = pathname.split("/")[length - 1];
  const navigate = useNavigate();

  const handleNavigation = (route, link) => {
    if (route) {
      if (route === "settings") {
        navigate(`/user/profile/settings`);
      } else if (route === "userpolicy") {
        navigate(`/user/terms/acceptableusepolicy`);
      } else {
        navigate(`/user/profile/settings/${route}`);
      }
    } else if (link) {
      window.open(link, "_blank");
    } else if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div
      onClick={() => handleNavigation(route, link)}
      className={
        routeName === route
          ? styles["navigation-button-active"]
          : styles["navigation-button"]
      }
    >
      <p>{title}</p>
      <img src={ArrowLeftBlackIcon} alt="arrow" />
    </div>
  );
};

const NavigationButtonContainer = ({
  icon,
  title,
  children,
}: NavigationButtonContainerProps) => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["header"]}>
        <img src={icon} alt={title} />
        {title && <p>{title}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

const SettingsNavigation = ({ settings }: SettingsNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles["settings-navigation"]}>
      <div onClick={() => navigate("/user/profile")} className={styles["back"]}>
        <img src={ArrowLeftBlackIcon} alt="arrow" />
        <p>Behind the scenes</p>
      </div>
      <NavigationButtonContainer icon={AccountIcon} title="Account">
        <NavigationButton title={settings.profile.title} route="settings" />
        <NavigationButton title="CHANGE PASSWORD" route="changepassword" />
        <NavigationButton
          title={settings.notifications.title}
          route="notifications"
        />
        <NavigationButton
          title={settings.membership.title}
          route="membership"
        />
        <NavigationButton title={settings.calendar.title} route="calendar" />
      </NavigationButtonContainer>
      {settings.biometrics && (
        <NavigationButtonContainer icon={BiometricIcon} title="Biometrics">
          <NavigationButton
            title={settings.biometrics.providers.title}
            route="managedevices"
          />
          <NavigationButton
            title={settings.biometrics.howItWorks.title}
            route="how-it-works"
          />
        </NavigationButtonContainer>
      )}
      <NavigationButtonContainer icon={WoneIcon}>
        <NavigationButton
          title={settings.ourMission.title}
          route="ourmission"
        />
        <NavigationButton
          title="CONTACT US"
          email="support@walkingonearth.com"
        />
      </NavigationButtonContainer>
      <NavigationButtonContainer icon={LegalIcon} title="legal">
        <NavigationButton
          title="TERMS AND CONDITION"
          link="https://www.walkingonearth.com/terms"
        />
        <NavigationButton
          title="PRIVACY POLICY"
          link="https://www.walkingonearth.com/privacypolicy"
        />
        <NavigationButton title="ACCEPTABLE USER POLICY" route="userpolicy" />
      </NavigationButtonContainer>
    </div>
  );
};

export default SettingsNavigation;
