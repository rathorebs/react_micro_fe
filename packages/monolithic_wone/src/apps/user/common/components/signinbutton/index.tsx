import React from "react";
import styles from "./sign-in-button.module.scss";

interface SignInButtonProps {
  title: string;
  image: string;
}

const SignInButton = ({ title, image }: SignInButtonProps) => {
  return (
    <div className={styles["sign-in-button-container"]}>
      <img src={image} alt={image} />
      <div className={styles["title"]}>{title}</div>
    </div>
  );
};

export default SignInButton;
