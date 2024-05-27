import constant from "../../../Constant";
import { svgIcons } from "utility/svgIcons";
const { IconCompanyDetails, IconDashboard, IconMembers, IconSubscriptions } =
  svgIcons();

const CORPORATE_APP_PREFIX_URL = constant.IS_CORPORATE_APP ? "" : "/corporate";

export const CSidebarData = [
  {
    title: "Dashboard",
    path: `${CORPORATE_APP_PREFIX_URL}/dashboard`,
    imgName: IconDashboard,
    cName: "nav-text",
  },
  {
    title: "Subscription",
    path: `${CORPORATE_APP_PREFIX_URL}/subscription`,
    imgName: IconSubscriptions,
    cName: "nav-text",
  },
  {
    title: "Members",
    path: `${CORPORATE_APP_PREFIX_URL}/members`,
    imgName: IconMembers,
    cName: "nav-text",
  },
  {
    title: "Company Details",
    path: `${CORPORATE_APP_PREFIX_URL}/company-details`,
    imgName: IconCompanyDetails,
    cName: "nav-text",
  },
  /* {
    title: "Admin Settings",
    path: `${CORPORATE_APP_PREFIX_URL}/admin-settings`,
    imgName: ProfileIcon,
    cName: "nav-text",
  }, */
];
