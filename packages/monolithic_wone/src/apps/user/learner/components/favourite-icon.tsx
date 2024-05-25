import React from "react";
import FavouritelBlackFilled from "Assets/new_favourite_filled.svg";
import FavouriteBlackOutlined from "Assets/new_favourite_stroke.svg";

import styles from "./favourite-icon.module.scss";

interface FavouriteIconProps {
  status: boolean;
  loading?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const FavouriteIcon = ({
  loading,
  status,
  onClick,
  style,
}: FavouriteIconProps) => {
  return (
    <span className={styles["favourite-icon"]} style={style}>
      {loading ? (
        <div
          className={`spinner-grow text-light ${styles["spinner-border-xs"]}`}
        />
      ) : (
        <img
          src={status ? FavouritelBlackFilled : FavouriteBlackOutlined}
          alt="favourite-icon"
          onClick={onClick}
        />
      )}
    </span>
  );
};

export default FavouriteIcon;
