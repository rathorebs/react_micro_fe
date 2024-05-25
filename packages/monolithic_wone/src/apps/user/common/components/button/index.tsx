import React from "react";
import { Button as ReactstrapButton } from "reactstrap";
import styles from "./index.module.scss";

export type ButtonProps = {
  onClick?: (any) => void;
  variant?: "primary" | "secondary" | "disabled";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  children?: React.ReactNode;
  tag?: "a" | "input";
  href?: string;
  value?: string;
  action?: string;
  style?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  variant = "primary",
  loading,
  disabled,
  type,
  children,
  tag,
  href,
  value,
  action,
  style,
}) => {
  if (tag === "input") {
    // Use value when tag is "input"
    return (
      <ReactstrapButton
        style={style}
        onClick={onClick}
        className={`${styles[variant]} ${className}`}
        disabled={disabled}
        type={type}
        tag={tag}
        href={href}
        value={value}
      />
    );
  } else {
    return (
      <ReactstrapButton
        style={style}
        onClick={onClick}
        className={
          (action === "join" && variant === "primary") ||
          (action === "track_biometrics" && variant === "primary")
            ? `${styles["primary-join"]} ${className}`
            : `${styles[variant]} ${className}`
        }
        disabled={disabled}
        type={type}
        tag={tag}
        href={href}
      >
        {loading ? (
          <div className={`spinner-border ${styles["spinner-border-xs"]}`} />
        ) : (
          children
        )}
      </ReactstrapButton>
    );
  }
};
