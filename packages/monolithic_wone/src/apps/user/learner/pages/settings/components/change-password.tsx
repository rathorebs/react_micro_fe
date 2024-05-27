import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CustomPassword } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import { QUERY_CHANGE_PASSWORD } from "utility/graphQl/mutation";
import { useMutation } from "@apollo/client";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [changePassword, { loading }] = useMutation(QUERY_CHANGE_PASSWORD);

  let buttonState = false;
  if (
    oldPassword?.length > 0 &&
    password?.length > 0 &&
    confirmPassword?.length > 0
  ) {
    buttonState = true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPassword === password) {
      setErrorMessage("The new and old passwords cannot be the same.");
    } else {
      if (password !== confirmPassword) {
        setErrorMessage(
          "The password confirmation does not match your new password."
        );
      } else {
        changePassword({
          variables: {
            input: {
              oldPassword: oldPassword,
              newPassword: confirmPassword,
            },
          },
        })
          .then((res) => {
            setErrorMessage("Your password has been updated");
          })
          .catch((error) => {
            console.error("change password:", error);
            setErrorMessage(error.message);
          });
      }
    }
  };

  return (
    <div className={styles["change-password"]}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h1>Change password</h1>
        <CustomPassword
          id="OldPassword"
          type="password"
          value={oldPassword}
          required={true}
          placeholder="CURRENT PASSWORD"
          minLength={5}
          maxLength={100}
          setValue={setOldPassword}
          iconLeft={true}
          iconRight={true}
          className={styles["custom-password"]}
        />
        <CustomPassword
          value={password}
          setValue={setPassword}
          type="password"
          minLength={5}
          maxLength={100}
          iconLeft={true}
          iconRight={true}
          placeholder="NEW PASSWORD"
          id="Password"
          required={true}
          className={styles["custom-password"]}
        />
        <CustomPassword
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
          minLength={5}
          maxLength={100}
          iconLeft={true}
          iconRight={true}
          placeholder="CONFIRM NEW PASSWORD"
          id="Password"
          required={true}
          className={styles["custom-password"]}
        />
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          loading={loading}
          disabled={!buttonState}
        >
          SAVE CHANGES
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
