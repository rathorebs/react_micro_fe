import constant from "Constant";

const appInfo = {
  platform: constant.APP_PLATFORM,
  name: constant.APP_NAME,
  version: constant.APP_VERSION,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export default appInfo;
