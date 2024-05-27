import React from "react";
import styles from "./styles.module.scss";
import { LearnerOurMission } from "apps/user/learner/api/types";
interface SettingsOurMissionProps {
  mission: LearnerOurMission;
}
const SettingsOurMission = ({ mission }: SettingsOurMissionProps) => {
  return (
    <div className={styles["settings-our-mission"]}>
      <h1>{mission?.title}</h1>

      <h2>{mission?.heading}</h2>

      <div className={styles["our-mission-thumb"]}>
        <img src={mission.imageUrl} alt="Our Mission" width="100%" />
      </div>
      <div
        className={styles["mission-contents"]}
        dangerouslySetInnerHTML={{ __html: mission.contentHtml }}
      />
    </div>
  );
};

export default SettingsOurMission;
