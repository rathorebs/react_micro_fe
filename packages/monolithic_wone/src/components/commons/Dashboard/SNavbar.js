import React from "react";
import withRouter from "utility/with-router";
import SidebarData from "./SidebarData.ts";
import Sidebar from "../../../components/layout/components/sidebar";

import "./TNavbar.css";
// import Navbar from "./Navbar";

const SNavbar = () => {
  //return <Navbar sidebarData={SidebarData} />;
  return <Sidebar sidebarData={SidebarData} />;
};

export default withRouter(SNavbar);
