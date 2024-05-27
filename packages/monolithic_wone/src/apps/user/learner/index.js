import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import withRouter from "utility/with-router";
import SNavbar from "components/commons/Dashboard/SNavbar";
import PageProvider, { PAGE_TITLE_SEPARATOR } from "providers/page";
import Schedule from "./pages/schedule/index.tsx";
import Sessions from "./pages/sessions/index.tsx";
import WoneIndex from "apps/user/learner/pages/woneindex";
import WonderIndexDetails from "apps/user/learner/pages/woneindex/pillar-details.tsx";
import Articles from "apps/user/learner/pages/articles";
import ArticleDetail from "apps/user/learner/pages/articles/article-detail";
import Recordings from "apps/user/learner/pages/recordings";
import RecordingDetail from "apps/user/learner/pages/recordings/recording-detail";
import FavouritesLandings from "pages/users/Favourites/favourites-landings.component";
import JoinSession from "apps/user/learner/pages/joinsession";
import FeedbackByStudentAfterJoinSession from "apps/user/learner/pages/feedback/feedback-by-student-after-join-session";
import NotFound from "components/NotFound";
import AUPolicy from "pages/users/terms/aupolicy";
import Biometrics from "pages/users/Biometrics/biometrics.component";
import ProfilePage from "apps/user/learner/pages/profile/index";
import Settings from "apps/user/learner/pages/settings";
import SessionDetail from "apps/user/learner/pages/sessions/session-detail";
import PractitionerDetail from "apps/user/learner/pages/practitioners/practitioner-detail";
import ContentList from "apps/user/learner/components/content-list";

import OrangePattern from "apps/wone-generator/assets/patterns/orange.json";
import RedPattern from "apps/wone-generator/assets/patterns/red.json";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import PinkPattern from "apps/wone-generator/assets/patterns/pink.json";

import { usePatternBackground } from "providers/pattern-background";

const UserRoutes = [
  {
    Title: "Sessions",
    Exact: true,
    Path: "sessions",
    Component: Sessions,
    waitForTitlePrefix: false,
  },
  {
    Title: "My Schedule",
    Exact: true,
    Path: "schedule",
    Component: Schedule,
    waitForTitlePrefix: false,
  },
  {
    Title: "WONE Index",
    Exact: true,
    Path: "woneindex",
    Component: WoneIndex,
    waitForTitlePrefix: false,
  },
  {
    Title: "WONE Index",
    Exact: true,
    Path: "woneindex/external-assessment/complete",
    Component: WoneIndex,
    waitForTitlePrefix: false,
  },
  {
    Title: "WONE Index",
    Exact: true,
    Path: "woneindex/:woneindexType",
    Component: WonderIndexDetails,
    waitForTitlePrefix: true,
  },
  {
    Title: "Recordings",
    Exact: true,
    Path: "recordings",
    Component: Recordings,
    waitForTitlePrefix: false,
  },
  {
    Title: `Content Lists ${PAGE_TITLE_SEPARATOR} Recordings`,
    Exact: true,
    Path: "recordings/content-lists/:id",
    Component: ContentList,
    waitForTitlePrefix: true,
  },
  {
    Title: "Recordings",
    Exact: true,
    Path: "recordings/:recordingId",
    Component: RecordingDetail,
    waitForTitlePrefix: true,
  },
  {
    Title: "Articles",
    Exact: true,
    Path: "articles",
    Component: Articles,
    waitForTitlePrefix: false,
  },
  {
    Title: `Content Lists ${PAGE_TITLE_SEPARATOR} Articles`,
    Exact: true,
    Path: "articles/content-lists/:id",
    Component: ContentList,
    waitForTitlePrefix: true,
  },
  {
    Title: `Content Lists ${PAGE_TITLE_SEPARATOR} WONE Index`,
    Exact: true,
    Path: "woneindex/content-lists/:id",
    Component: ContentList,
    waitForTitlePrefix: true,
  },
  {
    Title: "Articles",
    Exact: true,
    Path: "articles/:articleId",
    Component: ArticleDetail,
    waitForTitlePrefix: true,
  },
  {
    Title: "Biometrics",
    Exact: true,
    Path: "/user/biometrics",
    Component: Biometrics,
    waitForTitlePrefix: false,
  },
  {
    Title: "Favourites",
    Exact: true,
    Path: "favourites",
    Component: FavouritesLandings,
    waitForTitlePrefix: false,
  },
  {
    Title: "Favourites",
    Exact: true,
    Path: "favourites/:favouriteId",
    Component: FavouritesLandings,
    waitForTitlePrefix: true,
  },
  {
    Title: "Feedback",
    Exact: true,
    Path: "sessions/:sessionType/:sessionId/meeting/feedback",
    Component: FeedbackByStudentAfterJoinSession,
    waitForTitlePrefix: true,
  },
  {
    Title: "Meeting",
    Exact: true,
    Path: "sessions/:sessionType/:sessionId/meeting",
    Component: JoinSession,
    waitForTitlePrefix: true,
  },
  {
    Title: "Profile",
    Exact: true,
    Path: "profile",
    Component: ProfilePage,
    waitForTitlePrefix: false,
  },
  {
    Title: "Settings",
    Exact: true,
    Path: "profile/settings",
    Component: Settings,
    waitForTitlePrefix: false,
  },
  {
    Title: "Settings",
    Exact: true,
    Path: "profile/settings/:subnav",
    Component: Settings,
    waitForTitlePrefix: false,
  },
  {
    Title: `Content Lists ${PAGE_TITLE_SEPARATOR} Profile`,
    Exact: true,
    Path: "profile/content-lists/:id",
    Component: ContentList,
    waitForTitlePrefix: true,
  },
  {
    Title: "Sessions",
    Exact: true,
    Path: "sessions/group/:session_id",
    Component: SessionDetail,
    waitForTitlePrefix: true,
  },
  {
    Title: "Practitioners",
    Exact: true,
    Path: "practitioners/:id",
    Component: PractitionerDetail,
    waitForTitlePrefix: true,
  },
  {
    Title: `Content Lists ${PAGE_TITLE_SEPARATOR} Practitioners`,
    Exact: true,
    Path: "practitioners/:practitionerId/content-lists/:id",
    Component: ContentList,
    waitForTitlePrefix: true,
  },
  {
    Title: "Acceptable Use Policy",
    Exact: true,
    Path: "terms/acceptableusepolicy",
    Component: AUPolicy,
    waitForTitlePrefix: false,
  },
  {
    Title: "Page Not Found",
    Component: NotFound,
    waitForTitlePrefix: false,
  },
];

const Users = ({ router: { location } }) => {
  const { pathname } = useLocation();
  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    if (pathname.includes("content-lists")) {
      onChangeColors(BluePattern.color.pattern.value, true);
    } else if (pathname.includes("/meeting")) {
      onChangeColors(BluePattern.color.pattern.value, false);
    } else if (pathname.startsWith("/user/sessions")) {
      onChangeColors(BluePattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/schedule")) {
      onChangeColors(OrangePattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/woneindex/energy")) {
      onChangeColors(BluePattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/woneindex/activity")) {
      onChangeColors(RedPattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/woneindex/resilience")) {
      onChangeColors(OrangePattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/woneindex")) {
      onChangeColors(RedPattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/recordings")) {
      onChangeColors(BluePattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/articles")) {
      onChangeColors(BluePattern.color.pattern.value, true);
    } else if (pathname.startsWith("/user/profile")) {
      onChangeColors(PinkPattern.color.pattern.value, true);
    } else {
      onChangeColors(PinkPattern.color.pattern.value, true);
    }
  }, [pathname, onChangeColors]);

  return (
    <>
      {!location?.state?.zoomMtgNumber &&
        !location?.pathname.includes("meeting/feedback") && <SNavbar />}
      <Routes>
        {UserRoutes.map((Routes, index) => {
          if (
            Routes?.Path === "sessions/:sessionType/:sessionId/meeting" &&
            !location.state
          ) {
            return (
              <Route
                key={index}
                path="*"
                element={
                  <Navigate
                    to={location.pathname.replace("/meeting", "")}
                    state={{ from: location }}
                    replace
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
                <PageProvider
                  title={Routes.Title}
                  waitForPrefix={Routes?.waitForTitlePrefix}
                >
                  <Routes.Component location={location} />
                </PageProvider>
              }
            />
          );
        })}
      </Routes>
      {/* Web - interstitial modal work */}
      {/* {learner?.biometrics?.modal &&
        isBiometricsInterstitialModalOpen &&
        (pathname === "/user/schedule" || pathname === "/user/sessions") && (
          <BiometricsInterstitialModal
            setBiometricsConnectDeviceModalOpen={
              setBiometricsConnectDeviceModalOpen
            }
          />
        )}
      <BiometricsDeviceConnectionModal
        isOpen={isBiometricsConnectDeviceModalOpen}
        setIsOpen={setBiometricsConnectDeviceModalOpen}
        setBiometricsInterstitialModalOpen={setBiometricsInterstitialModalOpen}
      /> */}
    </>
  );
};

export default withRouter(Users);
