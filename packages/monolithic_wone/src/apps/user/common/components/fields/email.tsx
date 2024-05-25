import React, { useEffect, useRef } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import EmailIcon from "Assets/icon/icon_email.svg"
import styles from "./styles.module.scss";

export interface InputEmailProps {
  inputProps?: {};
  onChange?: (event: React.FormEvent) => void;
  email?: string;
}

export const Email: React.FC<InputEmailProps> = ({
  inputProps,
  onChange,
  email,
}) => {
  let inputRef = useRef(null);
  useEffect(() => {
    if (email != null) {
      inputRef.current.value = email;
    }
  }, [email]);

  const handleChange = (event: React.FormEvent) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };
  return (


    <FormGroup floating className={styles["input-container"]}>
      <span className={styles["icon-wrapper"]}><img src={EmailIcon} alt="Email" /></span>
      <Input
        ref={inputRef}
        type="email"
        name="email"
        id="emailField"
        placeholder="EMAIL"
        onChange={handleChange}
        {...inputProps}
        className={styles["input"]}
      />
      <Label for="emailField">
        EMAIL
      </Label>
    </FormGroup>


  );
};
