import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import { toKebabCase } from "utility/Function";
import WeeklyGoalModal from "./weekly-goal-modal";
import Tile from "components/tile";
import ArrowIcon from "Assets/icon-right.svg";
import FavouriteSessionIcon from "Assets/interfaceEssentialCertificateStar.svg";
import WeeklyGoalIcon from "Assets/weatherClimateWind.svg";

import styles from "./styles.module.scss";
interface ProfileDetailsProps {
  goalTitle: string;
  hoursPerWeek: {
    value: number;
    progressValue: number;
    maxValue: number;
    minValue: number;
    input: {
      required: boolean;
      label: string;
      min: number;
      max: number;
    };
  };
  favourites: {
    title: string;
    articles: {
      count: number;
      label: string;
      contentList: any;
    };
    recordings: {
      count: number;
      label: string;
      contentList: any;
    };
  };
}

interface ProfileDetailTileProps {
  value?: number;
  progressValue?: number;
  label?: string;
  onClick?: () => void;
  inputRange?: boolean;
  minValue?: number;
  maxValue?: number;
}

const ProfileDetailTile = ({
  value,
  label,
  inputRange,
  onClick,
  minValue,
  maxValue,
  progressValue,
}: ProfileDetailTileProps) => {
  return (
    <Tile>
      <div className={styles["child-container"]} onClick={onClick}>
        <div className={styles["wone-goal-time"]}>
          <div className={styles["wone-goal-time-content"]} onClick={onClick}>
            <p className={styles["wone-goal-hour"]}>{value}</p>
            <h3 className={styles["wone-goal-subheading"]}>{label}</h3>
          </div>
          <img src={ArrowIcon} alt="arrow-icon" />
        </div>
        {inputRange && (
          <div>
            <Progress
              barClassName={styles["custom-progress"]}
              className={styles["progress-bar"]}
              value={progressValue}
              min={minValue}
              max={maxValue}
            />
          </div>
        )}
      </div>
    </Tile>
  );
};

const ProfileFavouriteTile = ({ favourite }) => {
  if (!favourite) return null;

  const { count, label, contentList } = favourite;
  const kebabCaseId = toKebabCase(contentList.id);

  return (
    <Link
      to={`content-lists/${kebabCaseId}`}
      state={{ id: contentList.id, pageTitlePrefix: label }}
    >
      <Tile>
        <div className={styles["child-container"]}>
          <div className={styles["wone-goal-time"]}>
            <div className={styles["wone-goal-time-content"]}>
              <p className={styles["wone-goal-hour"]}>{count}</p>
              <h3 className={styles["wone-goal-subheading"]}>{label}</h3>
            </div>
            <img src={ArrowIcon} alt="arrow-icon" />
          </div>
        </div>
      </Tile>
    </Link>
  );
};

const ProfileDetails = ({
  goalTitle,
  hoursPerWeek,
  favourites,
}: ProfileDetailsProps) => {
  const [woneModal, setWoneModal] = useState(false);
  const [goalValue, setGoalValue] = useState(hoursPerWeek?.value);
  const [minValue, setMinValue] = useState(hoursPerWeek?.minValue);
  const [maxValue, setMaxValue] = useState(hoursPerWeek?.maxValue);
  const [progressValue, setProgressValue] = useState(
    hoursPerWeek?.progressValue
  );

  const openGoalModal = () => {
    setWoneModal(true);
  };
  const closeGoalModal = () => {
    setWoneModal(false);
  };
  return (
    <div className={styles["wone-profile-goal"]}>
      <div className={styles["wone-goal-container"]}>
        {goalTitle && (
          <div className={styles["wone-goal-title-div"]}>
            <img src={WeeklyGoalIcon} alt="goal-icon" />
            <h2>{goalTitle}</h2>
          </div>
        )}
        {hoursPerWeek && (
          <ProfileDetailTile
            progressValue={progressValue}
            value={goalValue}
            label="Hours per week"
            inputRange={hoursPerWeek?.input?.required}
            onClick={openGoalModal}
            minValue={minValue}
            maxValue={maxValue}
          />
        )}
      </div>
      <div>
        {favourites && favourites?.title && (
          <div className={styles["profile-favourite-title-div"]}>
            <img src={FavouriteSessionIcon} alt="session-icon" />
            <h2>{favourites.title}</h2>
          </div>
        )}
        <ProfileFavouriteTile favourite={favourites?.recordings} />
        <ProfileFavouriteTile favourite={favourites?.articles} />
      </div>
      <WeeklyGoalModal
        isOpen={woneModal}
        goalData={hoursPerWeek}
        goalValue={goalValue}
        onClick={closeGoalModal}
        setGoalValue={setGoalValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        setProgressValue={setProgressValue}
      />
    </div>
  );
};
export default ProfileDetails;
