import { useEffect, useRef } from "react";

import LoginPage_email_icon from "../../../Assets/LoginPage_email_icon.svg";

import styles from "./field.module.scss";

const EmailField = ({ onChange, inputProps, email, ...rest }) => {
  let inputRef = useRef(null);

  useEffect(() => {
    if (email != null) {
      inputRef.current.value = email;
    }
  }, [email]);

  const handleChange = (event) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };

  return (
    <div className={styles.field} {...rest}>
      <img src={LoginPage_email_icon} alt="" />
      <input
        ref={inputRef}
        type="email"
        name="email"
        placeholder="Email address"
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default EmailField;
