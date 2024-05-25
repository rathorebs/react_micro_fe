import React, { useState } from "react";
import LoginChangePassword from "./LoginChangePassword";
import LoginResetPassword from "./LoginResetPassword";
import CLoginPage from "./CLoginPage";

const Home = () => {
  const [loginPage, setloginPage] = useState(true);
  const [resetPassword, setresetPassword] = useState(false);
  const [changePassword, setchangePassword] = useState(false);

  const handleResetPassword = () => {
    setloginPage(false);
    setresetPassword(true);
  };

  const handleChangePassword = () => {
    setchangePassword(true);
    setresetPassword(false);
  };

  const handleloginPage = () => {
    setchangePassword(false);
    setloginPage(true);
  };

  const handleChangePasswordNew = () => {
    setloginPage(false);
    setchangePassword(true);
  };
  const handleCancelChangePassword = () => {
    setloginPage(true);
    setresetPassword(false);
  };

  return (
    <>
      {loginPage && (
        <CLoginPage
          handleResetPassword={handleResetPassword}
          handleChangePasswordNew={handleChangePasswordNew}
        />
      )}
      {resetPassword && (
        <LoginResetPassword
          handleChangePassword={handleChangePassword}
          handleCancelChangePassword={handleCancelChangePassword}
        />
      )}
      {changePassword && (
        <LoginChangePassword handleloginPage={handleloginPage} />
      )}
    </>
  );
};

export default Home;
