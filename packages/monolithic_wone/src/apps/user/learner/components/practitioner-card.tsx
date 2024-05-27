import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";

import { LearnerPractitionerCardPartsFragment } from "../api/types";

import { useInViews } from "utility/useInViews";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";

import styles from "./practitioner-card.module.scss";

interface PractitionerCardProps {
  practitioner: LearnerPractitionerCardPartsFragment;
  listName?: string;
  listPosition?: number;
}

const PractitionerCard = ({
  practitioner: { id, photoUrl, fullName, services },
  listName,
  listPosition,
}: PractitionerCardProps) => {
  const { ref, inView } = useInViews();

  const userID = localStorage.getItem("userID");
  const companyName = localStorage.getItem("companyName") || "NA";

  const logImpression = useCallback(
    () =>
      logAnalyticsEvent("practitioner_impression", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        practitioner_id: id,
        practitioner_full_name: fullName,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      }),
    [id, fullName, listName, listPosition, userID, companyName]
  );

  const logClick = useCallback(
    () =>
      logAnalyticsEvent("practitioner_click", {
        user_id: userID,
        user_id_wone: userID,
        user_company_name: companyName,
        practitioner_id: id,
        practitioner_full_name: fullName,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      }),
    [id, fullName, listName, listPosition, userID, companyName]
  );

  useEffect(() => {
    if (inView) {
      logImpression();
    }
  }, [inView, logImpression]);

  return (
    <Link
      ref={ref}
      to={`/user/practitioners/${id}`}
      onClick={logClick}
      state={{ listName, listPosition, pageTitlePrefix: fullName }}
      className={styles["link"]}
    >
      <Card className={styles["card"]}>
        <div className={styles["image-container"]}>
          <img src={photoUrl} alt="expert-pic" />
        </div>
        <CardBody className={styles["detail"]}>
          <CardTitle className={styles["title"]}>{fullName}</CardTitle>
          <CardSubtitle className={styles["subtitle"]}>{services}</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PractitionerCard;
