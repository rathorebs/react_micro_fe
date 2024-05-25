import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../apps/user";
import CompanyApp from "../apps/company";
import constants from "../Constant";
import Page from "./Page";
//import SignUp from "./common/SignUp";
import SignIn from "../apps/user/common/pages/sign-in";
import ChangePassword from "./common/ChangePassword";
import ResetPassword from "./common/ResetPassword";
import CSignUp from "./corporate/SignUp";
import CSignIn from "./corporate/SignIn";
import { ToastContainer } from "react-toastify";

const UserRoutesArr = [
  {
    Title: "Sign In",
    Exact: true,
    Path: "/login",
    Component: SignIn,
  },
  /* {
    Title: "Sign Up",
    Path: "/signup",
    Component: SignUp,
  }, */
  {
    Title: "Change Password",
    Path: "/signin/create",
    Component: ChangePassword,
  },
  {
    Title: "Reset Password",
    Path: "/signin/reset",
    Component: ResetPassword,
  },
  {
    Title: "Sign In",
    Path: "/signin",
    Component: SignIn,
  },
];

function Home() {
  console.log("render");
  return (
    <>
      <ToastContainer />
      {constants.IS_USER_APP && (
        <Routes>
          {UserRoutesArr.map((Routes, index) => (
            <Route
              key={index}
              path={Routes.Path}
              exact={Routes?.Exact}
              render={(props) => (
                <Page title={Routes.Title}>
                  <Routes.Component {...props} />
                </Page>
              )}
            />
          ))}
          <PrivateRoute path="/" />
        </Routes>
      )}

      {constants.IS_CORPORATE_APP && <CompanyApp />}

      {constants.IS_USER_CORPORATE_APP && (
        <Routes>
          {UserRoutesArr.map((Routes, index) => (
            <Route
              key={index}
              path={Routes.Path}
              exact={Routes?.Exact}
              render={(props) => (
                <Page title={Routes.Title}>
                  <Routes.Component {...props} />
                </Page>
              )}
            />
          ))}
          <Route path="/clogin" element={CSignIn} />
          <Route path="/csignin" element={CSignIn} />
          <Route path="/csignup" exact element={CSignUp} />
          <PrivateRoute path="/" />
        </Routes>
      )}
    </>
  );
}

export default Home;
