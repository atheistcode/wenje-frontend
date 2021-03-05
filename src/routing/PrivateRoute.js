import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AppAuthContext from "../context/appAuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const appAuth = useContext(AppAuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        // TODO: make it able to remember where it is redirected from
        return appAuth.isLoggedIn ? children : <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
};

export default PrivateRoute;
