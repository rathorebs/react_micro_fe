import React from "react";
import "./card.css";
const Card = (props) => {
  return (
    <div className="rounded px-3 px-sm-4 py-3 py-sm-5 mb-0 rounded-0 card bg-white border-0">
      {props.children}
    </div>
  );
};
export default Card;
