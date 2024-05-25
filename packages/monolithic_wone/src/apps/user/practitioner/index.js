import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import withRouter from "utility/with-router";

import TNavbar from "../../../components/commons/Dashboard/TNavbar";
import Schedule from "../../../pages/teachers/Schedule/Schedule";
import Session from "../../../pages/teachers/Session/Session";
import JoinSession from "../../../pages/users/JoinSession/join-session-component";
import FeedbackByTeacherAfterJoinSession from "../../../pages/teachers/Feedback/FeedbackByTeacherAfterJoinSession";
import NotFound from "../../../components/NotFound";
import Page from "../../../pages/Page";

const TeacherRoutes = [
  {
    Title: "Schedule",
    Exact: true,
    Path: "schedule",
    Component: Schedule,
  },
  {
    Title: "Sessions",
    Exact: true,
    Path: "sessions",
    Component: Session,
  },
  {
    Title: "Schedule Detail",
    Exact: true,
    Path: "schedule/:sessionType/:sessionId",
    Component: Schedule,
  },
  {
    Title: "Session Detail",
    Exact: true,
    Path: "sessions/:sessionType/:sessionId",
    Component: Session,
  },
  {
    Title: "Feedback",
    Exact: true,
    Path: "schedule/:sessionType/:sessionId/meeting/feedback",
    Component: FeedbackByTeacherAfterJoinSession,
  },
  {
    Title: "Meeting",
    Exact: true,
    Path: "schedule/:sessionType/:sessionId/meeting",
    Component: JoinSession,
  },
  {
    Title: "Page Not Found",
    Component: NotFound,
  },
];

const Teachers = ({ router: { location } }) => {
  return (
    <>
      {!location?.state?.zoomMtgNumber &&
        !location?.pathname.includes("meeting/feedback") && <TNavbar />}
      <Routes>
        {TeacherRoutes.map((Routes, index) => {
          if (
            Routes?.Path === "schedule/:sessionType/:sessionId/meeting" &&
            !location.state
          ) {
            return (
              <Route
                element={
                  <Navigate
                    to={location.pathname.replace("/meeting", "")}
                    state={{ from: location }}
                  />
                }
              />
            );
          }
          return (
            <Route
              key={index}
              path={Routes.Path}
              exact={Routes?.Exact}
              element={
                <Page title={Routes.Title}>
                  <Routes.Component />
                </Page>
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

export default withRouter(Teachers);
