import { initializeApp } from "firebase/app";
import { initializeAnalytics, setUserId, logEvent } from "firebase/analytics";

import constants from "../Constant";

const userId = localStorage.getItem("userID");

const firebaseConfig = {
  apiKey: constants.FIREBASE_API_KEY,
  authDomain: constants.FIREBASE_APP_DOMAIN,
  databaseURL: constants.FIREBASE_DATABASE_URL,
  projectId: constants.FIREBASE_PROJECT_ID,
  storageBucket: constants.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: constants.FIREBASE_MESSAGING_SENDER_ID,
  appId: constants.FIREBASE_APP_ID,
  measurementId: constants.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig, {
  name: constants.APP_NAME,
});

// Initialize Analytics
let analytics;
if (typeof window !== "undefined") {
  let options = {
    config: {
      send_page_view: true,
      app_name: constants.APP_NAME,
      app_version: constants.APP_VERSION,
    },
  };

  if (userId) {
    options = {
      ...options,
      config: {
        ...options.config,
        user_id: userId,
      },
    };
  }

  analytics = initializeAnalytics(app, options);

  if (userId) {
    setUserId(analytics, userId);
  }
}

const setAnalyticsUserId = (id, options) => setUserId(analytics, id, options);

const logAnalyticsEvent = (eventName, eventParams, options) => {
  if (eventParams !== undefined) {
    eventParams = {
      app_name: constants.APP_NAME,
      app_version: constants.APP_VERSION,
      ...eventParams,
    };
  }

  logEvent(analytics, eventName, eventParams, options);
};

export { logAnalyticsEvent, setAnalyticsUserId };
