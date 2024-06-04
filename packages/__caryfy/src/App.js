import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";
import NewFile from "./components/NewFile.tsx";
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
              <Route exact path="/newfile" component={NewFile} />
              <Route path="/" component={Landing} />
            </Switch>
          </Router>
        </ApolloClientProvider>
      </StylesProvider>
    </div>
  );
};
