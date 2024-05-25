import React from "react";
import MagnifyingGlass from "../../../Assets/MagnifyingGlass.svg";
import "./search-box.styles.scss";
const SearchBox = ({ placeholder, handleChange }) => {
  return (
    <div className="search-box-container">
      <span>
        <img src={MagnifyingGlass} alt="search-icon" />
      </span>{" "}
      <input
        className="search-box"
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
