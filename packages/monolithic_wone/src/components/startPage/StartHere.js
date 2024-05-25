import React from "react";
import { Link } from "react-router-dom";
import "./StartHere.css";

const StartHere = () => {
  return (
    <div className="startHere-container">
      <div className="startHere-wrapper">
        <h1>WebApp</h1>
        <Link className="startHere-links" to="/signin">
          Users & Teachers
        </Link>
        <Link className="startHere-links" to="/clogin">
          Corporate Admin
        </Link>
        {/* <Link className="startHere-links" to="/tlogin">Teachers</Link> */}
      </div>
    </div>
  );
};

export default StartHere;
