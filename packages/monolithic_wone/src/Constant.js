import person from "../src/Assets/images/person.png";

const { name, version } = require("../package.json");

export const envConfig = {
  APP_NAME: name,
  APP_VERSION: version,
  APP_PLATFORM: "WEB",
  APPLE_APP_STORE:
    "https://apps.apple.com/de/app/walking-on-earth/id1544768613?l=en",
  GOOGLE_PLAY_STORE:
    "https://play.google.com/store/apps/details?id=com.walkingonearth.app&pli=1",
  //DEVELOPMENT
  //uri: process.env.REACT_APP_API_URL,

  /* API_URL: 'http://18.130.180.166/graphql/',
    FILE_UPLOAD_URL: 'http://18.130.180.166/', */

  APP_DOMAIN: process.env.REACT_APP_DOMAIN,
  USER_APP_URL: `https://user${
    process.env.REACT_APP_ENV === "prod" ? "" : "-" + process.env.REACT_APP_ENV
  }.${process.env.REACT_APP_DOMAIN}`,

  COMPANY_APP_URL: `https://company${
    process.env.REACT_APP_ENV === "prod" ? "" : "-" + process.env.REACT_APP_ENV
  }.${process.env.REACT_APP_DOMAIN}`,

  ADMIN_APP_URL: `https://admin${
    process.env.REACT_APP_ENV === "prod" ? "" : "-" + process.env.REACT_APP_ENV
  }.${process.env.REACT_APP_DOMAIN}`,

  WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL,
  API_URL: process.env.REACT_APP_API_URL,
  FILE_UPLOAD_URL: process.env.REACT_APP_UPLOAD_URL,

  // DEVELOPMENT

  //QA

  // API_URL: 'http://18.132.205.103/graphql/',
  // FILE_UPLOAD_URL: 'http://18.132.205.103/',

  //QA

  //PRODUCTION

  // API_URL: 'https://api.prod.walkingonearth.com/graphql/',
  // FILE_UPLOAD_URL: 'https://api.prod.walkingonearth.com/',

  //PRODUCTION

  PERSON_PLACEHOLDER_IMAGE: person,
  APP_ID: "c4957e88819947f98ca6aa64ebabb124", // web
  //APP_ID: '05df8ab6bce2452584d2fa95a47e917a', // android

  //USER WEB APP like: https://www.user.walkingonearth.com/
  // IS_USER_APP: true,
  // IS_CORPORATE_APP: false,
  // IS_USER_CORPORATE_APP: false,

  //CORPORATE WEB APP like: https://www.company.walkingonearth.com/
  // IS_USER_APP: false,
  // IS_CORPORATE_APP: true,
  // IS_USER_CORPORATE_APP: false

  //BOTH USER WEB APP AND CORPORATE WEB APP only for dev purpose like http://localhost:3000/
  // IS_USER_APP: false,
  // IS_CORPORATE_APP: false,
  // IS_USER_CORPORATE_APP: true

  // Runtime config for GitHub Action deployment
  IS_USER_APP: !process.env.REACT_APP_IS_CORPORATE_APP,
  IS_CORPORATE_APP: process.env.REACT_APP_IS_CORPORATE_APP,
  IS_USER_CORPORATE_APP: false,

  SELF_SERVE_MAX_NUMBER_OF_SEATS: 100,
  SELF_SERVE_CONTACT_SALES_URL:
    "https://plans.walkingonearth.com/join-gbp#choose-plan",

  FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
  FIREBASE_APP_DOMAIN: process.env.REACT_APP_FIREBASE_APP_DOMAIN,
  FIREBASE_DATABASE_URL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  LINKEDIN_PARTNER_ID: process.env.REACT_APP_LINKEDIN_PARTNER_ID,
  SENTRY_DNS: process.env.REACT_APP_SENTRY_DNS,
};
export default envConfig;
