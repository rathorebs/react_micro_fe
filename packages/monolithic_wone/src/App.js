import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/colors.scss";

import CompanyApp from "apps/company";
import UserApp from "apps/user";

import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LinkedInTag from "react-linkedin-insight";

import AuthProvider from "providers/auth";
import ApolloClientProvider from "providers/apollo-client";
import ErrorBoundary from "./pages/common/ErrorBoundary";
import { useMobileView } from "./utility/useMobileView";
import ScrollToTop from "./utility/scroll-to-top";

import constant from "Constant";
import PatternBackgroundProvider from "./providers/pattern-background";

if (process.env.REACT_APP_ENV === "prod" && constant.IS_CORPORATE_APP) {
  LinkedInTag.init(constant.LINKEDIN_PARTNER_ID);
}

// Note: Default behavirour of most browsers is to scroll to the previous scroll position
// when navigating back. This is not the desired behaviour for this app.
// window.history.scrollRestoration = "manual";

function App() {
  const { isMobileBrowser, MobileView } = useMobileView();
  const notShowMobileViewOnCreateCompany =
    window.location.pathname === "/signup/company" ||
    window.location.pathname === "/signup/company/invalid-link";

  let app = constant.IS_CORPORATE_APP ? <CompanyApp /> : <UserApp />;
  app =
    isMobileBrowser && !notShowMobileViewOnCreateCompany ? <MobileView /> : app;

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <ApolloClientProvider>
          <AuthProvider>
            <ToastContainer theme="dark" />
            <PatternBackgroundProvider>{app}</PatternBackgroundProvider>
          </AuthProvider>
        </ApolloClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
