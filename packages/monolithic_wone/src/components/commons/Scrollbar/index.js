import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./scrollbar.css";

const Scrollbar = (props) => {
  return (
    <Scrollbars
      autoHide={true}
      renderThumbVertical={(props) => (
        <div {...props} className="thumb-vertical" />
      )}
      className={`${props.classes} custom-scorllBar`}
    >
      {props.children}
    </Scrollbars>
  );
};
export default Scrollbar;
