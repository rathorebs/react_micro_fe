import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import { useAuth } from "providers/auth";
import useQueryParams from "components/commons/hooks/useQueryParams";

import SignIn from "pages/corporate/SignIn";
import SignUp from "pages/corporate/SignUp";
import Corporate from "pages/corporate/index";
import Page from "pages/Page";

import "pages/common/styles.scss";

const LoadingPage = ({ children }) => {
  return (
    <div className="Background">
      <div className="Page">
        <div className="Error">
          <h1>{children}</h1>
        </div>
      </div>
    </div>
  );
};

const trackUserPaymentSuccess = (user) => {
  const userId = user.id;
  const companyId = user?.id;
  const companyName = user?.companyName || "NA";
  const trackPaymentEventsSent = localStorage.getItem("trackPaymentEventsSent");

  if (!trackPaymentEventsSent) {
    if (process.env.REACT_APP_ENV === "prod" && window.lintrk != null) {
      window.lintrk("track", { conversion_id: 10357266 });
    }

    logAnalyticsEvent("starter_payment_confirmed", {
      user_id: userId,
      user_id_wone: userId,
      company_id: companyId,
      company_name: companyName,
    });

    localStorage.setItem("trackPaymentEventsSent", "true");
  }
};

const CompanyApp = () => {
  const { companyAdmin } = useAuth();
  const params = useQueryParams();
  const location = useLocation();

  const { pathname } = location;
  const authToken = localStorage.getItem("Authtoken");
  const paymentLink = localStorage.getItem("paymentLink");
  const paymentStatus = params.get("payment_status");

  if (
    companyAdmin &&
    paymentStatus === "success" &&
    document.referrer.includes("checkout.stripe.com")
  ) {
    localStorage.setItem("shouldShowWelcome", "true");
    trackUserPaymentSuccess(companyAdmin);
  }

  if (authToken && !companyAdmin) {
    return <LoadingPage>Loading...</LoadingPage>;
  } else if (companyAdmin && pathname === "/login") {
    return <Navigate to="/" />;
  } else if (companyAdmin && pathname === "/signin") {
    return <Navigate to="/" />;
  } else if (companyAdmin && pathname === "/signup") {
    return <Navigate to="/" />;
  } else if (companyAdmin && paymentLink && paymentStatus !== "success") {
    window.location.href = paymentLink;
    return <LoadingPage>Loading...</LoadingPage>;
  } else if (companyAdmin && pathname === "/") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Page title="Sign In">
            <SignIn />
          </Page>
        }
      />
      <Route
        path="/signin"
        element={
          <Page title="Sign In">
            <SignIn />
          </Page>
        }
      />
      <Route
        path="/signup/*"
        element={
          <Page title="Sign Up">
            <SignUp />
          </Page>
        }
      />
      <Route
        path="/*"
        element={
          !authToken ? (
            <Navigate to="/signin" state={{ from: location }} />
          ) : (
            <Corporate />
          )
        }
      />
    </Routes>
  );
};

export default CompanyApp;
