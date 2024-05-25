import React, { useRef, useState } from "react";

import LoginPage_lock_icon from "../../../Assets/LoginPage_lock_icon.svg";

// Note: These should be svg's as well
import pass_vis_off from "../../../Assets/images/visibility_off.png";
import pass_vis_on from "../../../Assets/images/visibility_on.png";

import styles from "./field.module.scss";

const PasswordField = ({ onChange, inputProps, ...rest }) => {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };

  return (
    <div className={styles.field} {...rest}>
      <img src={LoginPage_lock_icon} alt="" />
      <input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        onChange={handleChange}
        {...inputProps}
      />
      <img
        src={showPassword ? pass_vis_off : pass_vis_on}
        onClick={handleShow}
        alt=""
        className="cursor-pointer"
      />
    </div>
  );
};

export default PasswordField;
