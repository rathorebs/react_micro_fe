import React, { JSXElementConstructor } from "react";

import {
  useLocation,
  useNavigate,
  useParams,
  Location,
  NavigateFunction,
  Params,
} from "react-router-dom";

export default function withRouter(Component: JSXElementConstructor<any>) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export interface Router {
  navigate: NavigateFunction;
  location: Location;
  params: Readonly<Params<string>>;
}
