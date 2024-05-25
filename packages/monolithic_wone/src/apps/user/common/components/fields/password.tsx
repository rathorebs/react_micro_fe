import React, { useState, useRef } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import PasswordIcon from "Assets/icon/icon_password.svg";
import Password_Vis_On from "Assets/icon/eye_password_show.svg";
import Password_Vis_Off from "Assets/icon/eye_password_hide.svg";
import clsx from "clsx";
import styles from "./styles.module.scss";
export interface InputPasswordProps {
  inputProps?: {};
  onChange?: (event: React.FormEvent) => void;
}

export interface CustomPasswordProps {
  id?: string;
  type?: any;
  value?: any;
  required?: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  setValue?: any;
  iconLeft?: boolean;
  iconRight?: boolean;
  name?: string;
  className?: string;
  onChange?: (event: React.FormEvent) => void;
}

export const Password: React.FC<InputPasswordProps> = ({
  inputProps,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (event: React.FormEvent) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormGroup floating className={styles["input-container"]}>
      <span className={styles["icon-wrapper"]}>
        <img src={PasswordIcon} alt="Email" />
      </span>
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        id="passwordField"
        placeholder="PASSWORD"
        onChange={handleChange}
        {...inputProps}
        className={styles["inputPassword"]}
      />
      <Label for="passwordField">PASSWORD</Label>
      <span
        className={styles["icon-wrapper-password-state"]}
        onClick={handleShow}
      >
        <img
          src={showPassword ? Password_Vis_Off : Password_Vis_On}
          alt={showPassword ? "Hide Password" : "Show Password"}
        />
      </span>
    </FormGroup>
  );
};

export const PasswordField: React.FC<InputPasswordProps> = ({
  inputProps,
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef(null);
  const handleChange = (event: React.FormEvent) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormGroup floating className={styles["input-container"]} {...rest}>
      <span className={styles["icon-wrapper"]}>
        <img src={PasswordIcon} alt="Email" />
      </span>
      <input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="PASSWORD"
        onChange={handleChange}
        {...inputProps}
        className={styles["inputFieldPassword"]}
      />
      {/* <Label for="passwordField">PASSWORD</Label> */}
      <span
        className={styles["icon-wrapper-password-state"]}
        onClick={handleShow}
      >
        <img
          src={showPassword ? Password_Vis_Off : Password_Vis_On}
          alt={showPassword ? "Hide Password" : "Show Password"}
        />
      </span>
    </FormGroup>
  );
};

export const CustomPassword: React.FC<CustomPasswordProps> = ({
  id,
  type,
  value,
  required,
  placeholder,
  minLength,
  maxLength,
  setValue,
  iconLeft,
  iconRight,
  className,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormGroup floating className={styles["input-password-container"]}>
      {iconLeft && (
        <span className={styles["icon-wrapper"]}>
          <img src={PasswordIcon} alt="Password" />
        </span>
      )}
      <Input
        type={showPassword ? "text" : "password"}
        name={id}
        id={id}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className={clsx(styles["inputPassword"], className)}
      />
      <Label className={styles["nav-label"]} for={id}>
        {placeholder}
      </Label>
      {iconRight && (
        <span
          className={styles["icon-wrapper-password-state"]}
          onClick={handleShow}
        >
          <img
            src={showPassword ? Password_Vis_Off : Password_Vis_On}
            alt={showPassword ? "Hide Password" : "Show Password"}
          />
        </span>
      )}
    </FormGroup>
  );
};
