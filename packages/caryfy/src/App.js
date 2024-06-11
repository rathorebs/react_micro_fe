import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import ApolloClientProvider from "./providers/apollo-client";
import NewTest from "./pages/NewTest/NewTest.tsx";
import NewTest2 from "./pages/NewTest/NewTest2.tsx";
// import Landing from "./components/Landing";
// import Pricing from "./components/Pricing";
// import NewFile from "./components/NewFile.tsx";
// import OnBoardPayerInformation from "./pages/Management/OnBoardPayerInformation.tsx";
// import Agencyinformation from "./pages/Management/Agencyinformation.tsx"
// import OnBoardPlanOfCare from "./pages/Management/OnBoardplanOfcare.tsx";
// import CaryfyDashBoard from "./pages/Dashboard/CaryfyDashBoard.tsx";
// import AskCaryPage from "./pages/AskCary/AskCaryPage.tsx";
// import CancelShift from "./pages/CancelShift/CancelShift.tsx";
// import DeleteShiftPage from "./pages/AskCary/DeleteShiftPage.tsx";
// import ApproveShiftsPage from "./pages/AskCary/ApproveShiftsPage.tsx";
// import AddInteractionPage from "./pages/AskCary/AddInteractionPage.tsx";
// import EDWPNotificationForm from "./pages/AskCary/EDWPNotificationForm.tsx";
// import Login from "./pages/Login.tsx"
// import AddShiftPage from "./pages/AskCary/AddShiftPage.tsx";
// import EditShiftPage from "./pages/AskCary/EditShiftPage.tsx";
// import ReportsPage from "./pages/Reports/ReportsPage.tsx";
// import ActionPage from "./pages/Action/ActionPage.tsx";

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
            {/* <Route path="/action" component={ActionPage} />
              <Route path="/reports" component={ReportsPage} />
              <Route path="/edit_shift" component={EditShiftPage} />
              <Route path="/add_shift" component={AddShiftPage} />
              <Route path="/edwp_notification_form" component={EDWPNotificationForm} />
              <Route path="/add_interaction" component={AddInteractionPage} />
              <Route path="/approve_shifts" component={ApproveShiftsPage} />
              <Route path="/delete_shift" component={DeleteShiftPage} />
              <Route path="/askcary" component={AskCaryPage} />
              <Route path="/cancelshift" component={CancelShift} />
              <Route path="/login" component={Login} />
              <Route path="/dash" component={CaryfyDashBoard} />
              <Route path="/planofcare" component={OnBoardPlanOfCare} />
              <Route path="/agency" component={Agencyinformation} />
              <Route path="/onboard" component={OnBoardPayerInformation} />
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/newfile" component={NewFile} /> */}
              <Route exact path="/" component={NewTest} />
              <Route  path="/new" component={NewTest2} />

            </Switch>
          </Router>
        </ApolloClientProvider>
      </StylesProvider>
    </div>
  );
};
