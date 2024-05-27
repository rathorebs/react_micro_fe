import React from "react";
import withRouter from "utility/with-router";
import { TSidebarData } from "./TSidebarData";

import Navbar from "./Navbar";
import "./TNavbar.css";

const TNavbar = (props) => {
  const userfirstName = localStorage.getItem("userfirstName");
  const userlastName = localStorage.getItem("userlastName");
  const teacherPhoto = localStorage.getItem("teacherPhoto");

  return (
    <Navbar
      sidebarData={TSidebarData}
      userlastName={userlastName}
      photo={teacherPhoto}
      userfirstName={userfirstName}
    />
  );
};

export default withRouter(TNavbar);
