import React from "react";
import clsx from "clsx";
import styles from "./index-score.module.scss";
import { svgIcons } from "utility/svgIcons";

const {
  IconArrowDownBlackBig,
  IconArrowUpBlackBig,
  IconArrowDownWhiteMedium,
  IconArrowUpWhiteMedium,
  IconArrowDownBlackSmall,
  IconArrowUpBlackSmall,
} = svgIcons();
interface IndexScoreProps {
  indexScoreData: any;
  size: "big" | "medium" | "small";
  className?: string;
}
const IndexScore = ({ indexScoreData, size, className }: IndexScoreProps) => {
  const indexIcon = () => {
    let indexScore = indexScoreData?.icon;
    if (size === "big") {
      if (indexScore === "index-down") {
        return IconArrowDownBlackBig;
      } else {
        return IconArrowUpBlackBig;
      }
    } else if (size === "medium") {
      if (indexScore === "index-down") {
        return IconArrowDownWhiteMedium;
      } else {
        return IconArrowUpWhiteMedium;
      }
    } else if (size === "small") {
      if (indexScore === "index-down") {
        return IconArrowDownBlackSmall;
      } else {
        return IconArrowUpBlackSmall;
      }
    }
  };

  return (
    <div className={clsx(styles["index-container"], className)}>
      {indexScoreData && (
        <span className={styles[`index-score-${size}`]}>
          {indexScoreData?.value}
        </span>
      )}
      {indexScoreData?.value > 0 && indexScoreData?.icon && (
        <span className={styles[`index-arrow-${size}`]}>{indexIcon()}</span>
      )}
    </div>
  );
};
export default IndexScore;
