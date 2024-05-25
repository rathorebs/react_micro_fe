import React from "react";
import { Routes, Route } from "react-router-dom";

import CNavbar from "../../components/commons/Dashboard/CNavbar";
import Dashboard from "./Dashboard";
import Subscription from "./Subscription";
import Employee from "./Employee/Employee";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import AdminSetting from "./AdminSetting";
import Page from "../Page";
import NotFound from "../../components/NotFound";
import Sidebar from "../../apps/company/components/layout/sidebar.tsx";
import constant from "../../Constant";

const CORPORATE_APP_PREFIX_URL = constant.IS_CORPORATE_APP ? "" : "/corporate";

const CorporateRoutes = [
  {
    Title: "Dashboard",
    Exact: true,
    Path: `${CORPORATE_APP_PREFIX_URL}/dashboard`,
    Component: Dashboard,
  },
  // {
  //   Title: "Company Schedule",
  //   Exact: true,
  //   Path: `${CORPORATE_APP_PREFIX_URL}/schedule`,
  //   element: Schedule,
  // },
  {
    Title: "Subscription",
    Exact: true,
    Path: `${CORPORATE_APP_PREFIX_URL}/subscription`,
    Component: Subscription,
  },
  {
    Title: "Members",
    Exact: true,
    Path: `${CORPORATE_APP_PREFIX_URL}/members`,
    Component: Employee,
  },
  {
    Title: "Company Details",
    Exact: true,
    Path: `${CORPORATE_APP_PREFIX_URL}/company-details`,
    Component: CompanyDetails,
  },
  {
    Title: "Admin Setting",
    Exact: true,
    Path: `${CORPORATE_APP_PREFIX_URL}/admin-settings`,
    Component: AdminSetting,
  },
  {
    Title: "Page Not Found",
    Component: NotFound,
  },
];

const Corporate = () => {
  return (
    <div className="wrapper">
      {/* <CNavbar /> */}
      <Sidebar />
      <Routes>
        {CorporateRoutes.map((Routes, index) => {
          return (
            <Route
              key={index}
              path={Routes.Path}
              exact={Routes?.Exact}
              element={
                <Page title={Routes.Title}>
                  <Routes.Component />
                </Page>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default Corporate;
