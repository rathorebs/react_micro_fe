import React from "react";

import { logAnalyticsEvent } from "../../utility/FirebaseAnalytics";

import {
  PageBaseHeader,
  PageError,
} from "apps/user/learner/components/page-container";

import { Button } from "apps/user/common/components/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    const userID = localStorage.getItem("userID");
    const companyName = localStorage.getItem("companyName") || "NA";

    logAnalyticsEvent("exception", {
      user_id: userID,
      user_id_wone: userID,
      company_name: companyName,
      description: error.toString(),
      fatal: true,
    });
  }

  handleReset() {
    window.history.go(0);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <PageBaseHeader />
          <PageError>
            <h1>We're sorry!</h1>
            <p>Something went wrong...</p>
            <Button action="join" onClick={this.handleReset}>
              Reset
            </Button>
          </PageError>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
