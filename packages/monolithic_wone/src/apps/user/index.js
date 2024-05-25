import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SignIn from "../../apps/user/common/pages/sign-in.tsx";
import SignUp from "../../apps/user/common/pages/sign-up.tsx";
import SignInMagicLink from "./common/pages/sign-in-magic-link";
import NotEligable from "./common/pages/sign-in-magic-link/not-eligable";
import AutoStore from "../../apps/user/common/pages/autostore.tsx";
import ChangePassword from "pages/common/change-password.tsx";
import ResetPassword from "../../apps/user/common/pages/reset-password.tsx";
import SignUpViaCompanyMagicLink from "./common/pages/sign-up-via-company-magic-link";
import InvalidLink from "./common/pages/sign-up-via-company-magic-link/invalid-link";
import Users from "./learner/index";
import Teachers from "./practitioner/index";
import Onboard, {
  QuestionDays,
  QuestionTime,
  QuestionFrequency,
  Profile,
  CalendarInvites,
  Preparing,
  Ready,
} from "apps/user/common/pages/onboard.tsx";
import { PageLoading } from "apps/user/learner/components/page-container";

import GetStarted from "apps/user/common/pages/get-started.tsx";
import { useAuth } from "providers/auth";

import PageProvider from "providers/page";
import constant from "Constant";
import useQueryParams from "components/commons/hooks/useQueryParams";

import "styles/typography.scss";

const UserApp = () => {
  const authed = localStorage.getItem("Authtoken");
  const isStudent = localStorage.getItem("WOEstudentUserId");
  //const isTeacher = localStorage.getItem("teacherID");
  const shouldOnboard = localStorage.getItem("shouldOnboard");
  const { logout, user, learner } = useAuth();
  const COMPANY_ADMIN_ROLE = "COMPANY-ADMIN";
  const STUDENT_ROLE = "STUDENT";
  const TEACHER_ROLE = "TEACHER";
  const rolesData = JSON.parse(localStorage.getItem("roles"));
  const getUserRoleType = (user) => {
    if (
      user &&
      constant.IS_CORPORATE_APP &&
      user.find((item) => item === COMPANY_ADMIN_ROLE)
    ) {
      return COMPANY_ADMIN_ROLE;
    } else if (user && user.find((item) => item === STUDENT_ROLE)) {
      return STUDENT_ROLE;
    } else if (user && user.find((item) => item === TEACHER_ROLE)) {
      return TEACHER_ROLE;
    } else {
      return null;
    }
  };

  const roleType = getUserRoleType(rolesData);
  const isTeacher = roleType === "TEACHER";
  const query = useQueryParams();
  const location = useLocation();
  let { pathname } = location;
  let sessionType, sessionId;
  if (pathname.startsWith("/sessionLink")) {
    sessionType = query.get("session_type")?.toLowerCase();
    sessionId = query.get("session_id");
    query.delete("session_type");
    query.delete("session_id");
  }
  if (authed && (roleType === "STUDENT" ? !learner : !user)) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <PageLoading />
      </div>
    );
  } else if (constant.IS_CORPORATE_APP && !authed && pathname === "/") {
    return <Navigate to="/signin" />;
  } else if (!constant.IS_CORPORATE_APP && !authed && pathname === "/") {
    return <Navigate to="/signin" />;
  } else if (
    !authed &&
    pathname !== "/getstarted" &&
    pathname !== "/signin" &&
    pathname !== "/signup" &&
    pathname !== "/signin/create" &&
    pathname !== "/signin/autostore" &&
    pathname !== "/signin/reset" &&
    pathname !== "/signin/magiclink" &&
    pathname !== "/signin/not-eligable" &&
    pathname !== "/signup/company" &&
    pathname !== "/signup/company/invalid-link" &&
    pathname !== "/login"
  ) {
    return <Navigate to={`/signin`} state={{ from: location }} />;
  } else if (constant.IS_CORPORATE_APP && authed && pathname === "/") {
    return <Navigate to={`/corporate/dashboard${query ? `?${query}` : ""}`} />;
  } else if (
    pathname.startsWith("/onboard") &&
    (query.get("error") || query.get("token"))
  ) {
    logout();
  } else if (authed && shouldOnboard && !pathname.startsWith("/onboard")) {
    return (
      <Navigate
        to={`/onboard${query ? `?${query}` : ""}`}
        state={{ from: location }}
      />
    );
  } else if (authed && !shouldOnboard && pathname.startsWith("/onboard")) {
    return (
      <Navigate
        to={`/user/woneindex${query ? `?${query}` : ""}`}
        state={{ from: location }}
      />
    );
  } else if (authed && pathname.startsWith("/user") && isTeacher) {
    return (
      <Navigate
        to={`/teacher/schedule${query ? `?${query}` : ""}`}
        state={{ from: location }}
      />
    );
  } else if (authed && pathname.startsWith("/teacher") && isStudent) {
    return (
      <Navigate
        to={`/user/sessions${query ? `?${query}` : ""}`}
        state={{ from: location }}
      />
    );
  } else if (authed && isTeacher && pathname === "/") {
    return <Navigate to={`/teacher/schedule${query ? `?${query}` : ""}`} />;
  } else if (authed && isStudent && pathname === "/") {
    return <Navigate to={`/user/sessions${query ? `?${query}` : ""}`} />;
  } else if (
    authed &&
    (pathname === "/user/session" || pathname.startsWith("/user/session/"))
  ) {
    pathname = pathname.replace("/user/session", "/user/sessions");
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/user/sessions/community/")) {
    pathname = pathname.replace(
      "/user/sessions/community/",
      "/user/sessions/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/user/sessions/company/")) {
    pathname = pathname.replace(
      "/user/sessions/company/",
      "/user/sessions/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/user/schedule/community/")) {
    pathname = pathname.replace(
      "/user/schedule/community/",
      "/user/schedule/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/user/schedule/company/")) {
    pathname = pathname.replace(
      "/user/schedule/company/",
      "/user/schedule/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (
    authed &&
    (pathname === "/teacher/session" ||
      pathname.startsWith("/teacher/session/"))
  ) {
    pathname = pathname.replace("/teacher/session", "/teacher/sessions");
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/teacher/sessions/community/")) {
    pathname = pathname.replace(
      "/teacher/sessions/community/",
      "/teacher/sessions/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/teacher/sessions/company/")) {
    pathname = pathname.replace(
      "/teacher/sessions/company/",
      "/teacher/sessions/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/teacher/schedule/community/")) {
    pathname = pathname.replace(
      "/teacher/schedule/community/",
      "/teacher/schedule/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (authed && pathname.startsWith("/teacher/schedule/company/")) {
    pathname = pathname.replace(
      "/teacher/schedule/company/",
      "/teacher/schedule/group/"
    );
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (
    authed &&
    (pathname === "/user/favourite" || pathname.startsWith("/user/favourite/"))
  ) {
    pathname = pathname.replace("/user/favourite", "/user/favourites");
    return <Navigate to={`${pathname}${query ? `?${query}` : ""}`} />;
  } else if (
    pathname.startsWith("/sessionLink") &&
    sessionType &&
    sessionId !== undefined
  ) {
    return (
      <Navigate
        to={`/user/sessions/${sessionType}/${sessionId}${
          query ? `?${query}` : ""
        }`}
      />
    );
  } else if (authed && (pathname === "/login" || pathname === "/signin")) {
    return (
      <Navigate
        to={`/${query ? `?${query}` : ""}`}
        state={{ from: location }}
      />
    );
  } else {
    return (
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <PageProvider title={"Sign In"}>
              <SignIn />
            </PageProvider>
          }
        />
        <Route
          path="/signin"
          exact
          element={
            <PageProvider title={"Sign In"}>
              <SignIn />
            </PageProvider>
          }
        />
        <Route
          path="/signup"
          exact
          element={
            <PageProvider title={"Sign Up"}>
              <SignUp />
            </PageProvider>
          }
        />
        <Route
          path="/signin/magiclink"
          exact
          element={
            <PageProvider title={"Sign In"}>
              <SignInMagicLink />
            </PageProvider>
          }
        />
        <Route
          path="/signin/not-eligable"
          exact
          element={
            <PageProvider title={"Sign In"}>
              <NotEligable />
            </PageProvider>
          }
        />

        <Route
          path="/signin/autostore"
          exact
          element={
            <PageProvider title={"sign-in"}>
              <AutoStore />
            </PageProvider>
          }
        />
        <Route
          path="/signin/create"
          exact
          element={
            <PageProvider title={"Create Password"}>
              <ChangePassword />
            </PageProvider>
          }
        />
        <Route
          path="/signin/reset"
          exact
          element={
            <PageProvider title={"Reset Password"}>
              <ResetPassword />
            </PageProvider>
          }
        />
        <Route
          path="/signup/company"
          exact
          element={
            <PageProvider title={"Signup"}>
              <SignUpViaCompanyMagicLink />
            </PageProvider>
          }
        />
        <Route
          path="/signup/company/invalid-link"
          exact
          element={
            <PageProvider title={"Signup"}>
              <InvalidLink />
            </PageProvider>
          }
        />
        <Route
          path="/onboard"
          element={
            <PageProvider title={"Onboard"}>
              <Onboard />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/qtimes"
          element={
            <PageProvider title={"Onboard"}>
              <QuestionTime />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/qdays"
          element={
            <PageProvider title={"Onboard"}>
              <QuestionDays />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/qfrequency"
          element={
            <PageProvider title={"Onboard"}>
              <QuestionFrequency />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/profile"
          element={
            <PageProvider title={"Onboard"}>
              <Profile />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/calendar-invites"
          element={
            <PageProvider title={"Onboard"}>
              <CalendarInvites />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/preparing"
          element={
            <PageProvider title={"Onboard"}>
              <Preparing />
            </PageProvider>
          }
        />
        <Route
          path="/onboard/ready"
          element={
            <PageProvider title={"Onboard"}>
              <Ready />
            </PageProvider>
          }
        />
        <Route
          path="/getstarted"
          element={
            <PageProvider title={"Get Started"}>
              <GetStarted />
            </PageProvider>
          }
        />
        <Route path="/user/*" element={<Users />} />
        <Route path="/teacher/*" element={<Teachers />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
};

export default UserApp;
