import React from "react";
import Wone_Logo from "Assets/wone_logo.svg";
import Check_Icon_Membership from "Assets/iconCheck.svg";
import { LearnerMembership } from "apps/user/learner/api/types";
import styles from "./styles.module.scss";
interface SettingsMembershipProps {
  membership: LearnerMembership;
}
const SettingsMembership = ({ membership }: SettingsMembershipProps) => {
  return (
    <div className={styles["settings-membership"]}>
      <h1>{membership?.title}</h1>
      <img
        src={Wone_Logo}
        className={styles["membership-logo"]}
        alt="walk-on-earth-logo"
        width="82px"
        height="20px"
      />
      <h2>{membership?.type}</h2>
      <h3>{membership.advantages.heading}</h3>
      {membership?.advantages?.items.map((item, index) => (
        <div key={index} className={styles["membership-items"]}>
          <div className={styles["membership-thumb"]}>
            <img
              src={Check_Icon_Membership}
              className={styles["membership-check-icon"]}
              alt="walk-on-earth-logo"
              width="12px"
              height="9px"
            />
          </div>

          <div className={styles["membership-name-desc"]}>
            <h6>{item.name}</h6>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsMembership;
