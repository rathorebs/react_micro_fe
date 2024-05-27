import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import {
  LearnerArticle,
  LearnerContentList,
  LearnerRecording,
  LearnerGroupSession,
  LearnerPractitioner,
  LearnerPrivateSession,
} from "apps/user/learner/api/types";
import { toKebabCase } from "utility/Function";

import ArrowRightIcon from "Assets/icon-right.svg";
import StarIcon from "Assets/holidaysFireworksStar.svg";
import ZigZagIcon from "Assets/icon/biometrics.svg";

import Card from "./card";

import styles from "./preview.module.scss";

interface HeadingProps {
  contentListId: string;
  kebabCaseId: string;
  seeMore?: boolean;
  icon?: string;
  label: string;
  hide?: boolean;
  featured?: boolean;
  biometrics?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  contentListId,
  kebabCaseId,
  seeMore,
  icon,
  label,
  hide,
  featured,
  biometrics,
}) => {
  // Set default icon for featured lists
  if (featured) {
    icon = StarIcon;
  }
  if (biometrics) {
    icon = ZigZagIcon;
  }

  if (hide) {
    return null;
  }

  const heading = (
    <div className={styles["heading"]}>
      {icon && <img src={icon} alt={"icon"} />}
      <h2 className={styles["label"]}>{label}</h2>
      {(featured || biometrics) && <span className={styles["line"]} />}
      {seeMore && (
        <img
          src={ArrowRightIcon}
          alt="Arrow pointing right"
          className={styles["arrow-right"]}
        />
      )}
    </div>
  );

  if (seeMore) {
    return (
      <Link
        to={`content-lists/${kebabCaseId}`}
        state={{ id: contentListId, pageTitlePrefix: label }}
      >
        {heading}
      </Link>
    );
  }

  return heading;
};

interface ListProps {
  name: string;
  items: (
    | LearnerArticle
    | LearnerRecording
    | LearnerGroupSession
    | LearnerPrivateSession
    | LearnerPractitioner
  )[];
  limit?: number;
}

const List: React.FC<ListProps> = ({ name, items, limit }: ListProps) => {
  if (items.length === 0) {
    return null;
  }

  items = limit ? items.slice(0, limit) : items;

  return (
    <ul className={clsx("row g-3", styles["items"])}>
      {items.map((item, index) => (
        <li
          className={clsx(
            "col-md-12",
            "col-lg-6",
            (!limit || limit > 2) && "col-xl-4"
          )}
          key={item.id}
        >
          <Card
            item={item}
            listName={name}
            listPosition={index + 1}
            showBiometrics={name === "LearnerBiometricsSessionsHistory"}
          />
        </li>
      ))}
    </ul>
  );
};

interface ContentListPreviewProps {
  data: LearnerContentList;
  seeMore?: boolean;
  hideHeading?: boolean;
  limit?: number;
  icon?: string;
  featured?: boolean;
  biometrics?: boolean;
}

export const ContentListPreview: React.FC<ContentListPreviewProps> = ({
  data,
  seeMore,
  hideHeading,
  icon,
  limit,
  featured,
  biometrics,
}) => {
  const { __typename, id, label, items } = data;

  // Don't render if there are no items
  if (items.length === 0) {
    return null;
  }

  const kebabCaseId = toKebabCase(id);

  return (
    <section id={kebabCaseId} className={styles["container"]}>
      <Heading
        contentListId={id}
        kebabCaseId={kebabCaseId}
        seeMore={seeMore}
        icon={icon}
        label={label}
        hide={hideHeading}
        featured={featured ?? __typename.startsWith("LearnerFeatured")}
        biometrics={
          biometrics ?? __typename.startsWith("LearnerIndexBiometrics")
        }
      />
      <List name={id} items={items} limit={limit} />
    </section>
  );
};

export default ContentListPreview;
