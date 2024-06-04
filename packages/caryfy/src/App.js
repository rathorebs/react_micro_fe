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
import OnBoardPayerInformation from "./pages/Management/OnBoardPayerInformation.tsx";
import Agencyinformation from "./pages/Management/Agencyinformation.tsx";
import OnBoardPlanOfCare from "./pages/Management/OnBoardplanOfcare.tsx";
import CaryfyDashBoard from "./pages/Dashboard/CaryfyDashBoard.tsx";
import AskCaryPage from "./pages/AskCary/AskCaryPage.tsx";
import CancelShift from "./pages/CancelShift/CancelShift.tsx";
import Login from "./pages/Login.tsx";

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
              <Route path="caryfy/askcary" component={AskCaryPage} />
              <Route path="/cancelshift" component={CancelShift} />
              <Route path="/login" component={Login} />
              <Route path="/dash" component={CaryfyDashBoard} />
              <Route path="/planofcare" component={OnBoardPlanOfCare} />
              <Route path="/agency" component={Agencyinformation} />
              <Route path="/onboard" component={OnBoardPayerInformation} />
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
