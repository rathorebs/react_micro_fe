import constant from "../../../Constant";
import { svgIcons } from "utility/svgIcons";
const { IconCompanyDetails, IconDashboard, IconMembers, IconSubscriptions } =
  svgIcons();

const CORPORATE_APP_PREFIX_URL = constant.IS_CORPORATE_APP ? "" : "/corporate";
interface CSSidebarItem {
  title: string;
  path: string;
  imgName: string;
  cName: string;
  color: string;
  subNav?:any;
}
interface CSSidebarItems extends Array<CSSidebarItem> {}
const CompanySidebarData: CSSidebarItems = [
  {
    title: "Dashboard",
    path: `${CORPORATE_APP_PREFIX_URL}/dashboard`,
    imgName: IconDashboard,
    cName: "nav-text",
    color: "pink",
  },
  {
    title: "Subscription",
    path: `${CORPORATE_APP_PREFIX_URL}/subscription`,
    imgName: IconSubscriptions,
    cName: "nav-text",
    color: "pink",
  },
  {
    title: "Members",
    path: `${CORPORATE_APP_PREFIX_URL}/members`,
    imgName: IconMembers,
    cName: "nav-text",
    color: "pink",
  },
  {
    title: "Company Details",
    path: `${CORPORATE_APP_PREFIX_URL}/company-details`,
    imgName: IconCompanyDetails,
    cName: "nav-text",
    color: "pink",
    subNav:{title: "Integrations",
    path: `${CORPORATE_APP_PREFIX_URL}/Integrations`,
    imgName: IconCompanyDetails,
    cName: "nav-text",
    color: "pink",}
  },
  /* {
    title: "Admin Settings",
    path: `${CORPORATE_APP_PREFIX_URL}/admin-settings`,
    imgName: ProfileIcon,
    cName: "nav-text",
  }, */
];
export default CompanySidebarData;