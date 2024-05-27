import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutDialog from "../common/LogoutDialog";
import constant from "../../../../Constant";
import styles from "./sidebar.module.scss";
import Sidebar_Logo from "../../../../Assets/wone_sidebar_logo.svg";
import { useAuth, STUDENT_ROLE } from "../../../../providers/auth";
import { svgIcons } from "../../../../utility/svgIcons";
import CompanySidebarData from "../../../../components/commons/Dashboard/CompanySidebarData";

const SideBar = () => {
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);
  const { logout, companyAdmin } = useAuth();
  const userFirstName = localStorage.getItem("userfirstName");
  const { ProfileIcon, LogoutIcon, IconSwitchUser } = svgIcons();
  const CORPORATE_APP_PREFIX_URL = constant.IS_CORPORATE_APP
    ? ""
    : "/corporate";

  const logOut = () => {
    setLogoutDialog(true);
  };
  const closeLogoutDialog = () => {
    setLogoutDialog(false);
  };
  const closeAfterYes = () => {
    logout();
    setLogoutDialog(false);
    window.location.href = constant.WEBSITE_URL;
  };

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["nav-top"]}>
        <Link to="/">
          <img
            src={Sidebar_Logo}
            className={styles["sidebar-logo"]}
            alt="walk-on-earth-logo"
            width="82px"
            height="20px"
          />
        </Link>

        <div className={styles["greetings-container"]}>
          <span>Welcome {userFirstName}</span>
        </div>
      </div>

      <div className={styles["navigation-container"]}>
        <ul>
          {CompanySidebarData.map((item, index) => {
            return (
              <li key={index} className={styles[item.color]}>
                <NavLink
                  title={item.title}
                  className={({ isActive }) =>
                    isActive ? styles["activeClassName"] : undefined
                  }
                  to={item.path}
                >
                  {item.imgName}
                  <span>{item.title}</span>
                </NavLink>
                <ul>
                  <li>
                    <NavLink
                      title={item?.subNav?.title}
                      className={({ isActive }) =>
                        isActive ? styles["activeClassName"] : undefined
                      }
                      to={item?.subNav?.path}
                    >
                      {item?.subNav?.imgName}
                      <span>{item?.subNav?.title}</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles["footer-nav-container"]}>
        <div className={styles["profile"]}>
          <a href={`${CORPORATE_APP_PREFIX_URL}/admin-settings`}>
            {ProfileIcon}
            <span>Admin Settings</span>
          </a>
        </div>

        {companyAdmin.switchToRole?.find((item) => item === STUDENT_ROLE) && (
          <div className={styles["switch-user"]}>
            <a href={`${constant.USER_APP_URL}/login`}>
              {IconSwitchUser}
              <span>switch to Member</span>
            </a>
          </div>
        )}

        <div className={styles["logout"]} onClick={logOut}>
          {LogoutIcon}
          <span>Sign out</span>
        </div>
      </div>
      {logoutDialog && (
        <LogoutDialog
          closeLogoutDialog={closeLogoutDialog}
          closeAfterYes={closeAfterYes}
        />
      )}
    </div>
  );
};
export default SideBar;
