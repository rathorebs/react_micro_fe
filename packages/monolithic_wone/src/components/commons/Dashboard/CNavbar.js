import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import withRouter from "utility/with-router";
import { CSidebarData } from "./CSidebarData";
import sidebar_logo_img from "Assets/sidebar-logo-img.svg";
import logoutArrow from "Assets/logoutArrow.svg";
import LogoutDialog from "components/Login/LogoutDialog";
import sessionIcon from "Assets/sessionIcon.svg";
import constant from "Constant";
import { useAuth } from "providers/auth";

import "./Navbar.css";

const CNavbar = (props) => {
  const { logout } = useAuth();
  //const [isSmallDevice, setWindowWidth] = useState(false);
  const [showSideBar, updateSideBarView] = useState(false);

  const toggleSideBar = (status) => {
    updateSideBarView(status);
  };

  // React.useEffect(() => {
  //   window.addEventListener("resize", windowResize);
  //   return () => {
  //     window.removeEventListener("resize", windowResize);
  //   };
  // }, []);

  // const windowResize = () => {
  //   setWindowWidth(window.innerWidth > 768 ? true : false);
  // };

  const userfirstName = localStorage.getItem("userfirstName");
  const [logoutDialog, setlogoutDialog] = useState(false);

  const logOut = () => {
    setlogoutDialog(true);
  };
  const closeLogoutDialog = () => {
    setlogoutDialog(false);
  };

  const closeAfterYes = () => {
    logout();
    closeLogoutDialog(true);
    window.location.href = "https://www.walkingonearth.com/";
  };
  return (
    <>
      <div className="m-header">
        <img
          onClick={(e) => toggleSideBar(!showSideBar)}
          src={sidebar_logo_img}
          className="nav-menu-img"
          alt="walk-on-earth-logo"
        />
        <h2 className="f22 text-white font-playfair-display mt-3 mb-2">
          Welcome
        </h2>
      </div>
      {showSideBar && (
        <div
          onClick={(e) => toggleSideBar(false)}
          className="nav-overlay"
        ></div>
      )}
      <nav
        className={`nav-menu d-md-flex flex-column justify-content-between ${
          showSideBar ? "active" : "inactive"
        }`}
      >
        <div className="user-details px-4">
          <img
            src={sidebar_logo_img}
            className="nav-menu-img"
            alt="walk-on-earth-logo"
          />
          <h2 className="f22 text-white font-playfair-display my-3">
            Welcome {userfirstName}
          </h2>
        </div>
        <section className="option-list flex-grow-1">
          <ul className="list-group px-4 CNavbar-options">
            {CSidebarData.map((item, index) => {
              return (
                <li
                  onClick={(e) => toggleSideBar(false)}
                  key={index}
                  className={`${item.cName} border-0 list-group-item bg-transparent p-0`}
                >
                  <NavLink
                    className="py-3 px-3 d-flex font-sofia-pro text-white mb-2"
                    to={item.path}
                    //activeClassName="current"
                  >
                    <img
                      className="menu_image mr-3 d-inline-block"
                      src={item.imgName}
                      alt={item.title}
                    />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </section>
        <a
          className="d-flex font-poppins p-3 ms-3 hand-cursor"
          href={`${constant.USER_APP_URL}/login`}
        >
          <img
            className="logout_image mr-3 d-inline-block"
            src={sessionIcon}
            alt="calendar icon"
          />
          <span className=" font-sofia-pro text-white">Switch to Member</span>
        </a>
        <div
          className="d-flex font-poppins p-3 ms-3 hand-cursor"
          onClick={logOut}
        >
          <img
            className="logout_image mr-3 d-inline-block"
            src={logoutArrow}
            alt="logout"
          />
          <span className=" font-sofia-pro text-white">Logout</span>
        </div>
      </nav>
      {logoutDialog && (
        <LogoutDialog
          closeLogoutDialog={closeLogoutDialog}
          closeAfterYes={closeAfterYes}
        />
      )}
    </>
  );
};

export default withRouter(CNavbar);
