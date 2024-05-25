import React from "react";
import favouriteIconFalse from "../../../Assets/favourite_icon_false.svg";
import favouriteIconTrue from "../../../Assets/favourite_icon_true.svg";
import "./favourite.styles.scss";

const Favourite = ({ handleClick, status }) => {
  return (
    <div
      className={`${status ? "active-status" : null} favourite-btn-container`}
      onClick={handleClick}
    >
      <span>
        <img
          src={status ? favouriteIconTrue : favouriteIconFalse}
          alt="favourite icon"
        />
      </span>
      <span>Favourite</span>
    </div>
  );
};

export default Favourite;
