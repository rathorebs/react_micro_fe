import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sessionLink.css";
import avatarImg from "../../Assets/images/sessionLink/avtar.png";
import useQueryParams from "../../components/commons/hooks/useQueryParams";
import ProgressCircularBar from "../../components/commons/ProgressCircularBar";
import data from "./data";

const SessionLink = (props) => {
  //here seachQuery is a query string passed from signin page
  const searchQuery = props.location.state;
  const queryString = () => new URLSearchParams(searchQuery);
  const query = useQueryParams();
  const navigate = useNavigate();

  let sessionType =
    query.get("session_type")?.toLowerCase() ||
    queryString().get("session_type")?.toLowerCase();

  const sessionId = query.get("session_id") || queryString().get("session_id");
  const userType = query.get("user_type") || queryString().get("user_type");
  const redirectToSessionDetailModal = (redirectionType) => {
    const routeType =
      sessionType === "private" || userType?.toLowerCase() !== "student"
        ? "schedule"
        : "session";
    if (sessionType === "corporate" || sessionType === "community") {
      sessionType = "group";
    }
    navigate(`/${redirectionType}/${routeType}/${sessionType}/${sessionId}`);
  };

  const redirectToSessionDetail = () => {
    let redirectionType =
      userType?.toLowerCase() === "student" ? "user" : "teacher";

    //check auth user/teacher
    const token = localStorage.getItem("Authtoken");
    if (!!token) {
      //check wheather logged-in user is student or teacher
      const studentId = localStorage.getItem("studentID");
      if (
        (!!studentId && redirectionType === "teacher") ||
        (!studentId && redirectionType === "user")
      ) {
        //just redirect link to  user/teacher session dashboard
        redirectionType = !!studentId ? "user" : "teacher";
        navigate(`/${redirectionType}/session`);
      } else {
        redirectToSessionDetailModal(redirectionType);
      }
    } else {
      redirectToSessionDetailModal(redirectionType);
    }
  };

  const [progress, setProgress] = useState(25);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((progress) => (progress < 100 ? progress + 25 : 25));
        setCount((count) => (count < data.length ? count + 1 : 1));
      }
    }, 2500);

    redirectToSessionDetail();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="session-link-loader">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="avatar-container d-flex align-items-center justify-content-center">
            <img src={avatarImg} alt="avtar" />
          </div>
          <p className="loading-title">Preparing your meeting detail...</p>
          <ProgressCircularBar
            progress={progress}
            size={90}
            strokeWidth={5}
            circleOneStroke="#F3F3F2"
            circleTwoStroke="#5582A7"
            progressStatus={true}
          />
          <div className="animate-container">
            {data
              .slice()
              .splice(0, count)
              .map((label, index) => (
                <p
                  className={index + 1 === count ? "active" : "inactive"}
                  key={index}
                >
                  {label}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionLink;
