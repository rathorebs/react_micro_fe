import React from "react";
import { Input, Label, FormGroup } from "reactstrap";
import Tile from "components/tile";
import UserIcon from "Assets/icon/icon_user.svg";
//import CalendarIcon from "Assets/icon/icon_calendar.svg";
import CalendarIconNew from "Assets/icon/icon_calendar_new.svg";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputFirstNameProps {
  data?: any;
  firstName?: any;
  setFirstName: (value: string) => void;
  InputClassName?: string;
  LabelClassName?: string;
  showIcon?: boolean;
  markRequired?: boolean;
}

export interface InputLastNameProps {
  data?: any;
  lastName?: any;
  setLastName: (value: string) => void;
  editProfile?: boolean;
  InputClassName?: string;
  LabelClassName?: string;
}

export interface InputGenderProps {
  data?: any;
  setSelectGender?: (value: string) => void;
  selectGender?: string;
  InputClassName?: string;
  LabelClassName?: string;
  showIcon?: boolean;
  markRequired?: boolean;
  floating?: boolean;
  showLabel?: boolean;
}

export interface InputBirthdayProps {
  data?: any;
  birthdayDate?: any;
  setBirthdayDate?: (value: string) => void;
  editProfile?: boolean;
  InputClassName?: string;
  LabelClassName?: string;
}

export interface InputSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: (id, e) => void;
  label?: string;
}

export const FirstName: React.FC<InputFirstNameProps> = ({
  data,
  firstName,
  setFirstName,
  InputClassName,
  LabelClassName,
  showIcon,
  markRequired,
}) => {
  const isSameLabelAndPlaceholder = data.label === data.placeholder;

  return (
    <FormGroup floating className={styles["input-container"]}>
      {showIcon && (
        <span className={styles["icon-wrapper"]}>
          <img src={UserIcon} alt="Full Name" />
        </span>
      )}
      <Input
        type="text"
        name={data?.id}
        id={data?.id}
        placeholder={data?.placeholder || data.label}
        required={data?.required}
        maxLength={data?.maxLength}
        minLength={data?.minLength}
        className={clsx(styles["input"], InputClassName)}
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <Label className={LabelClassName} for={data?.id}>
        {(isSameLabelAndPlaceholder ||
        data.placeholder == null ||
        data?.id === "injuries"
          ? data?.label
          : data.placeholder) + (data?.required && markRequired ? "*" : "")}
      </Label>
    </FormGroup>
  );
};

export const LastName: React.FC<InputLastNameProps> = ({
  data,
  lastName,
  setLastName,
  editProfile,
  InputClassName,
  LabelClassName,
}) => {
  return (
    <FormGroup floating className={styles["input-container"]}>
      {!editProfile && (
        <span className={styles["icon-wrapper"]}>
          <img src={UserIcon} alt="Full Name" />
        </span>
      )}

      <Input
        type="text"
        name={data?.id}
        id={data?.id}
        placeholder={data?.label}
        required={data?.required}
        maxLength={data?.maxLength}
        minLength={data?.minLength}
        className={clsx(styles["input"], InputClassName)}
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <Label className={editProfile && LabelClassName} for={data?.id}>
        {data?.label + (data?.required && !editProfile ? "*" : "")}
      </Label>
    </FormGroup>
  );
};

export const Gender: React.FC<InputGenderProps> = ({
  data,
  setSelectGender,
  selectGender,
  InputClassName,
  LabelClassName,
  showIcon,
  markRequired,
  floating,
  showLabel,
}) => {
  return (
    <FormGroup floating={floating} className={styles["input-container"]}>
      {showIcon && (
        <span className={styles["icon-wrapper"]}>
          <img src={UserIcon} alt="Full Name" />
        </span>
      )}
      <Input
        type="select"
        name={data?.id}
        id={data?.id}
        required={data?.required}
        placeholder={data?.label}
        onChange={(e) => setSelectGender(e.target.value)}
        className={clsx(styles["input-select"], InputClassName)}
        value={selectGender}
      >
        <option className={styles["option-placeholder"]} value="">
          {data?.label + (data?.required && markRequired ? "*" : "")}
        </option>
        {data.options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Input>
      {showLabel && (
        <Label className={LabelClassName} for={data?.id}>
          {data?.label}
        </Label>
      )}
    </FormGroup>
  );
};

export const Birthday: React.FC<InputBirthdayProps> = ({
  data,
  birthdayDate,
  setBirthdayDate,
  editProfile,
  InputClassName,
  LabelClassName,
}) => {
  return (
    <FormGroup floating={editProfile} className={styles["input-container"]}>
      {!editProfile && (
        <span className={styles["icon-wrapper"]}>
          <img src={CalendarIconNew} alt="Full Name" />
        </span>
      )}
      <Input
        name={data?.id}
        id={data?.id}
        placeholder={
          !editProfile ? data?.label + (data?.required ? "*" : "") : undefined
        }
        required={data?.required}
        className={clsx(styles["input-birthday"], InputClassName)}
        onChange={(e) => setBirthdayDate(e.target.value)}
        value={birthdayDate}
        type={editProfile ? "date" : "text"}
        max={new Date().toISOString().split("T")[0]}
        min="1923-12-31"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) =>
          e.target.value || editProfile
            ? (e.target.type = "date")
            : (e.target.type = "text")
        }
      />
      {editProfile && (
        <Label className={LabelClassName} for={data?.id}>
          {data?.label + (data?.required ? "*" : "")}
        </Label>
      )}

      {/* <span className={styles["icon-calendar"]}><img src={CalendarIcon} alt="Calendar" /></span> */}
    </FormGroup>
  );
};

export const Switch: React.FC<InputSwitchProps> = ({
  onChange,
  disabled,
  checked,
  id,
  label,
}) => {
  return (
    <Tile>
      <FormGroup switch className={styles["switch-container"]}>
        <Label
          className={
            disabled ? styles["switch-label-active"] : styles["switch-label"]
          }
        >
          {label}
        </Label>
        <Input
          type="switch"
          role="switch"
          className={styles["switch-item"]}
          onChange={(e) => onChange(id, e.target.checked)}
          disabled={disabled}
          checked={checked}
        />
      </FormGroup>
    </Tile>
  );
};
