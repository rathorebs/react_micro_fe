import React from "react";
import { Link, Navigate } from "react-router-dom";

import withRouter from "utility/with-router";
import FavouritesRecordings from "./favourites-recordings.component";
import FavouritesArticles from "./favourites-articles.component";
import "./favourites.styles.scss";
import NotFound from "../../../components/NotFound";

const FavouritesLandings = ({ router: { location } }) => {
  let isActiveRecordings = location.pathname.startsWith(
    "/user/favourites/recordings"
  );

  let isActiveArticles = location.pathname.startsWith(
    "/user/favourites/articles"
  );

  if (!isActiveRecordings && !isActiveArticles) {
    return <Navigate to="/user/favourites/recordings" />;
  }

  if (isActiveRecordings || isActiveArticles) {
    return (
      <div className="tsession-container corporate-container">
        <div className="favourites-container">
          <h1>Favourites</h1>
          <div className="favourites-tabs">
            <Link
              to="/user/favourites/recordings"
              className={isActiveRecordings ? "active-tab" : "normal-tab"}
            >
              Recordings
            </Link>
            <Link
              to="/user/favourites/articles"
              className={isActiveArticles ? "active-tab" : "normal-tab"}
            >
              Articles
            </Link>
          </div>
          {isActiveRecordings && <FavouritesRecordings />}
          {isActiveArticles && <FavouritesArticles />}
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default withRouter(FavouritesLandings);
