import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";
import CancelShift from "./pages/CancelShift/CancelShift";
import ApolloClientProvider from "./providers/apollo-client";

const generateClassName = createGenerateClassName({
  productionPrefix: "ca",
});

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <ApolloClientProvider>
          <Router history={history}>
            <Switch>
              <Route exact path="/pricing" component={Pricing} />
              <Route path="/cancelshift" component={CancelShift} />
              <Route path="/" component={Landing} />
            </Switch>
          </Router>
        </ApolloClientProvider>
      </StylesProvider>
    </div>
  );
};
