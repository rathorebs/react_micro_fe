import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutDialog from "../../Login/LogoutDialog";
import constant from "../../../Constant";
import styles from "./sidebar.module.scss";
import Sidebar_Logo from "../../../Assets/wone_sidebar_logo.svg";
import { useAuth } from "../../../providers/auth";
import { svgIcons } from "../../../utility/svgIcons";

export type SideBarProps = {
  sidebarData: [];
};

interface SidebarNavItemProps {
  cName: string;
  title: string;
  path: string;
  imgName: JSX.Element;
  color: string;
}
const SideBar: React.FC = ({ sidebarData }: SideBarProps) => {
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);
  const { logout, learner } = useAuth();

  const { ProfileIcon, LogoutIcon, IconSwitchUser } = svgIcons();

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
        <Link to="/sessions">
          <img
            src={Sidebar_Logo}
            className={styles["sidebar-logo"]}
            alt="walk-on-earth-logo"
            width="82px"
            height="20px"
          />
        </Link>

        <div className={styles["greetings-container"]}>
          {learner?.screens?.you?.welcome?.titleHtml && (
            <span
              dangerouslySetInnerHTML={{
                __html: learner?.screens?.you?.welcome?.titleHtml,
              }}
            />
          )}
          {learner?.screens?.you?.welcome?.subtitleHtml && (
            <p>{learner?.screens?.you?.welcome?.subtitleHtml}</p>
          )}
        </div>
      </div>

      <div className={styles["navigation-container"]}>
        <ul>
          {sidebarData.map((item: SidebarNavItemProps, index) => {
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
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles["footer-nav-container"]}>
        {learner.switchToRole?.find((item) => item === "ADMIN") && (
          <div className={styles["profile"]}>
            <a href={`${constant.ADMIN_APP_URL}/login`}>
              {IconSwitchUser}
              <span>switch to Admin</span>
            </a>
          </div>
        )}

        {learner.switchToRole?.find((item) => item === "COMPANY-ADMIN") && (
          <div className={styles["profile"]}>
            <a href={`${constant.COMPANY_APP_URL}/login`}>
              {IconSwitchUser}
              <span>switch to Company Admin</span>
            </a>
          </div>
        )}

        <div className={styles["profile"]}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles["activeClassName"] : undefined
            }
            to="profile"
          >
            {ProfileIcon}
            <span>Profile</span>
          </NavLink>
        </div>
        <div className={styles["logout"]} onClick={logOut}>
          {LogoutIcon}
          <span>Log out</span>
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
