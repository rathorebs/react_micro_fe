import React from "react";
import { Button } from "apps/user/common/components/button";
import { Link } from "react-router-dom";
import WoneJourneyIcon from "Assets/shoppingEcommerceGraphAnalitycsSquare.svg";
import DefaultProfile from "Assets/icon/avatar-default.svg";
import SettingsIcon from "Assets/setting-icon.svg";
import styles from "./styles.module.scss";
import { toKebabCase } from "utility/Function";
import Tile from "components/tile";
import FavouriteSessionIcon from "Assets/interfaceEssentialCertificateStar.svg";
import ArrowIcon from "Assets/icon-right.svg";
interface ProfileHeroProps {
  fullName: string;
  photoUrl: string;
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
  journeyData: {
    discover?: {
      buttonText?: string;
      subtitleHtml?: string;
      titleHtml?: string;
    };
    memberSince: string;
    title: string;
    timeInvested: {
      value: string;
      metric: string;
      label: string;
    };
    sessionsAttended: {
      value: string;
      label: string;
    };
  };
}

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

const ProfileHero = ({
  fullName,
  photoUrl,
  journeyData,
  favourites,
}: ProfileHeroProps) => {
  return (
    <div className={styles["profile-hero-container"]}>
      <Link to="settings" className={styles["settings-icon"]}>
        <img src={SettingsIcon} alt="settings-icon" />
      </Link>
      <div className={styles["profile-hero"]}>
        <div className={styles["profile-data"]}>
          <div className={styles["profile-pic"]}>
            {photoUrl !== null ? (
              <img src={photoUrl} alt="profile-pic" />
            ) : (
              <img src={DefaultProfile} alt="profile-pic" />
            )}
          </div>
          <div className={styles["user-detail"]}>
            <h1 className={styles["user-name"]}>{fullName}</h1>
            <p className={styles["member-join-detail"]}>
              {journeyData.memberSince}
            </p>
          </div>
        </div>
        {journeyData.discover ? (
          <div className={styles["discover-div"]}>
            <div className={styles["discover-content"]}>
              <div className={styles["discover-header"]}>
                <img src={WoneJourneyIcon} alt="journey-icon" />
                <h3>{journeyData.discover?.titleHtml}</h3>
              </div>
              <div className={styles["discover-text"]}>
                {journeyData.discover?.subtitleHtml}
              </div>
            </div>
            <Link to="/sessions" className={styles["discover-button"]}>
              <Button>{journeyData.discover?.buttonText}</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles["profile-journey"]}>
              {journeyData &&
                journeyData?.sessionsAttended &&
                journeyData?.timeInvested && (
                  <div className={styles["profile-title-div"]}>
                    <img src={WoneJourneyIcon} alt="journey-icon" />
                    <h2>{journeyData?.title}</h2>
                  </div>
                )}

              <div className={styles["profile-time-session"]}>
                <span className={styles["session-time-detail"]}>
                  <span className={styles["time"]}>
                    <p className={styles["time-invested"]}>
                      {journeyData?.timeInvested?.value}
                    </p>
                    <p className={styles["hours"]}>
                      {journeyData?.timeInvested?.metric}
                    </p>
                  </span>
                  <p className={styles["total-time-heading"]}>
                    {journeyData?.timeInvested?.label}
                  </p>
                </span>
                <span>
                  <p className={styles["session-count"]}>
                    {journeyData?.sessionsAttended?.value}
                  </p>
                  <p className={styles["session-heading"]}>
                    {journeyData?.sessionsAttended?.label}
                  </p>
                </span>
              </div>
            </div>
            <div className={styles["profile-favourites"]}>
              {favourites && favourites?.title && (
                <div className={styles["profile-favourite-title-div"]}>
                  <img src={FavouriteSessionIcon} alt="session-icon" />
                  <h2>{favourites.title}</h2>
                </div>
              )}
              <div className={styles["profile-favourite-container"]}>
                <ProfileFavouriteTile favourite={favourites?.recordings} />
                <ProfileFavouriteTile favourite={favourites?.articles} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHero;
