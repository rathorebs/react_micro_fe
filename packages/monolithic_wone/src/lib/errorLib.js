import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import constant from "../Constant";
const isProduction = process.env.REACT_APP_ENV === "prod";

export function initSentry() {
  if (isProduction) {
    Sentry.init({
      dsn: constant.SENTRY_DNS,

      // This enables automatic instrumentation (highly recommended), but is not
      // necessary for purely manual usage
      integrations: [new BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 0.2,
    });
  }
}

export function logError(error, errorInfo = null) {
  if (isProduction) {
    Sentry.withScope((scope) => {
      errorInfo && scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }
}
