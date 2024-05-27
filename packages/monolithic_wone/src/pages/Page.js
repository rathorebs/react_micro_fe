import { useEffect } from "react";
import PropTypes from "prop-types";

import { logAnalyticsEvent } from "../utility/FirebaseAnalytics";
import { useLocation } from "react-router-dom";

const webTitle = `Walking on Earth`;

const Page = ({ title, children }) => {
  const location = useLocation();
  const locationTitle = location?.state?.title;

  useEffect(() => {
    let nextDocumentTitle = locationTitle || title || "";
    nextDocumentTitle = nextDocumentTitle
      ? `${nextDocumentTitle} - ${webTitle}`
      : webTitle;

    if (nextDocumentTitle !== document.title) {
      document.title = nextDocumentTitle;
      logAnalyticsEvent("page_view", {
        page_path: window.location.pathname,
        user_id: localStorage.getItem("userID"),
      });
    }
  }, [title, locationTitle]);

  return children;
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
