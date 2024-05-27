import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./providers/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          <Component {...rest} {...props} />
        ) : (
          <Navigate
            to="/signin"
            state={{ from: props.location, referer: props.location }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
