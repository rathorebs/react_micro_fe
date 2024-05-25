import { Button } from "reactstrap";
import styles from "./index.module.scss";

export const PrimaryButton = ({
  className,
  children,
  onClick,
  loading,
  disabled,
  type,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} ${styles.primaryButton}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton = ({
  className,
  children,
  onClick,
  loading,
  disabled,
  type,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} ${styles.secondaryButton}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};
