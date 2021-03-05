import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AppAuthContext from "../context/appAuthContext";

const UnPrivateRoute = ({ children, ...rest }) => {
  const appAuth = useContext(AppAuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        return !appAuth.isLoggedIn ? children : <Redirect to={{ pathname: "/home" }} />;
      }}
    />
  );
};

export default UnPrivateRoute;
