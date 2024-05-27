import React, { useState, useEffect } from "react";
import withRouter from "utility/with-router";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logoutArrow from "../../../Assets/logoutArrow.svg";
import LogoutDialog from "../../../components/Login/LogoutDialog";
import FeedbackDialog from "../../../components/Login/FeedbackDialog";
import { BiometricsConnectDialog } from "../../../components/Login/BiometricsFlow";
import sidebar_logo_img from "../../../Assets/sidebar-logo-img.svg";
import arrowRight from "../../../Assets/icon/arrow-right.svg";
import admin from "../../../Assets/corporateAdmin/admin.svg";
import feedback from "../../../Assets/feedback_icon.svg";

import "./TNavbar.css";
import {
  useAuth,
  checkUserHasRole,
  COMPANY_ADMIN_ROLE,
} from "../../../providers/auth";
import constant from "../../../Constant";
import BiometricElement from "../../../pages/users/Biometrics/biometric-elements";

const Navbar = (props) => {
  const { logout, user } = useAuth();
  const isCompanyAdmin = checkUserHasRole(user, COMPANY_ADMIN_ROLE);
  const firstName = user?.firstName;
  const focusPillarDisplayPhrase =
    user?.userdetail?.studentdetail?.pillar?.displayPhrase;

  const [logoutDialog, setlogoutDialog] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [showSideBar, updateSideBarView] = useState(false);
  const [isSideBarOpen, toggleSideBarOpen] = useState(false);
  const [vitalLinkDialog, setVitalLinkDialog] = useState(false);

  const toggleSideBar = (status) => {
    updateSideBarView(status);
    if (!isSideBarOpen) {
      toggleSideBarOpen(true);
    }
  };

  const handleSideBarBtnClick = () => {
    localStorage.setItem("isSideBarOpen", !isSideBarOpen);
    toggleSideBarOpen(!isSideBarOpen);
    if (showSideBar) {
      updateSideBarView(false);
    }
  };

  const logOut = () => {
    setlogoutDialog(true);
  };

  const closeLogoutDialog = () => {
    setlogoutDialog(false);
  };

  const closeAfterYes = () => {
    logout();
    closeLogoutDialog(true);
    window.location.href = constant.WEBSITE_URL;
  };

  const checkLocalStorageAndToggleSideBar = () => {
    let _isSideBarOpen = localStorage.getItem("isSideBarOpen");
    _isSideBarOpen = _isSideBarOpen === "false" ? false : true;
    toggleSideBarOpen(_isSideBarOpen);
  };

  const windowResize = () => {
    if (window.innerWidth > 768) {
      checkLocalStorageAndToggleSideBar();
    } else {
      toggleSideBar(false);
    }
  };

  const handleSwitchPortal = () => {
    window.open(`${constant.COMPANY_APP_URL}/login`, "_self");
  };

  const handleSubmitFeedback = () => {
    setFeedbackDialog(true);
  };

  const closeFeedbackDialog = () => {
    setFeedbackDialog(false);
  };

  const biometricsConnectDialog = () => {
    setVitalLinkDialog(false);
  };

  const handleTouchEnd = (e, title) => {
    if (title === "Favourites") {
      let touch_timeout = 500;
      let touch_count = 0;
      window.addEventListener("touchend", function (e) {
        touch_count += 1;
        setTimeout(function () {
          touch_count = 0;
        }, touch_timeout);

        if (touch_count === 3) {
          setVitalLinkDialog(true);
        }
        //e.preventDefault();
      });
    }
  };
  const handleVitalLink = (e, title) => {
    if (title === "Favourites") {
      if (e.detail === 3) {
        setVitalLinkDialog(true);
      }
    }
  };

  useEffect(() => {
    checkLocalStorageAndToggleSideBar();
    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Welcome {firstName}
        </h2>
      </div>
      {showSideBar && (
        <div
          onClick={(e) => toggleSideBar(false)}
          className="nav-overlay"
        ></div>
      )}
      <nav
        className={`custom-practitioner nav-menu d-md-flex flex-column justify-content-between ${
          isSideBarOpen ? "opened" : "closed"
        } ${showSideBar ? "active" : "inactive"}`}
      >
        {user?.biometrics && (
          <BiometricElement
            isSideBarOpen={isSideBarOpen}
            showSideBar={showSideBar}
            biometricData={user.biometrics}
          />
        )}
        <div className="user-details px-md-4 px-3">
          <img
            src={sidebar_logo_img}
            className="nav-menu-img"
            alt="walk-on-earth-logo"
            width="40px"
            height="32px"
          />
          <h2 className="f22 text-white font-playfair-display mt-3 mb-2 text-">
            Welcome {firstName}
          </h2>
          <p className="text-white mb-3">{focusPillarDisplayPhrase}</p>
        </div>
        <section className="option-list flex-grow-1">
          <ul className="list-group px-md-4 px-3 CNavbar-options">
            {props.sidebarData
              .filter((item) =>
                !user?.biometrics ? item.title !== "Biometrics" : item
              )
              .map((item, index) => {
                //const isActive = props?.location?.pathname.includes(item.path)
                const isActive = props?.router?.location?.pathname.includes(
                  item.path
                )
                  ? "current"
                  : "default";
                return (
                  <li
                    key={index}
                    className={`${item.cName} border-0 list-group-item bg-transparent p-0`}
                  >
                    <NavLink
                      title={item.title}
                      className={`py-md-3 px-md-3 py-2 px-2 d-flex font-sofia-pro text-white mb-2 ${isActive}`}
                      to={item.path}
                      activeClassName={isActive}
                      onClick={(e) => handleVitalLink(e, item.title)}
                      onTouchEnd={(e) => handleTouchEnd(e, item.title)}
                    >
                      <img
                        className="mr-3 d-inline-block"
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

        {isCompanyAdmin && (
          <div className="switch-dashboard" onClick={handleSwitchPortal}>
            <img
              className="logout_image mr-3 d-inline-block"
              src={admin}
              alt="calendar icon"
            />
            <span className=" font-sofia-pro text-white">Switch to Admin</span>
          </div>
        )}

        <div>
          <div className="logout-container" onClick={logOut}>
            <img
              src={logoutArrow}
              title={"Logout"}
              className="cursor-pointer mr-3 d-inline-block"
              alt="logout"
            />
            <span>Log out</span>
          </div>
          <div className="submit-feedback" onClick={handleSubmitFeedback}>
            <img
              src={feedback}
              title={"Feedback"}
              className="cursor-pointer mr-3 d-inline-block icon-feedback"
              alt="logout"
            />
            <span>Feedback</span>
          </div>
        </div>
        <div
          onClick={handleSideBarBtnClick}
          className="sidebar-toggle-btn d-md-flex d-none"
        >
          <img src={arrowRight} alt="arrowRight" />
        </div>
      </nav>
      {logoutDialog && (
        <LogoutDialog
          closeLogoutDialog={closeLogoutDialog}
          closeAfterYes={closeAfterYes}
        />
      )}
      {feedbackDialog && (
        <FeedbackDialog closeFeedbackDialog={closeFeedbackDialog} />
      )}

      {vitalLinkDialog && (
        <>
          <ToastContainer />
          <BiometricsConnectDialog
            biometricsConnectDialog={biometricsConnectDialog}
          />
        </>
      )}
    </>
  );
};

export default withRouter(Navbar);
