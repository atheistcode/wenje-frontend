import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import UnPrivateRoute from "./UnPrivateRoute";
import LoadingIndicator from "../components/SharedUi/LoadingIndicator/LoadingIndicator";

import AppAuthContext from "../context/appAuthContext";

const AuthPage = lazy(() => import("../pages/AuthPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const FindPeoplePage = lazy(() => import("../pages/FindPeoplePage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const PostPage = lazy(() => import("../pages/PostPage"));
const MainHeader = lazy(() => import("../components/MainHeader/MainHeader"));

const MainRouting = () => {
  const appAuth = useContext(AppAuthContext);

  return (
    <Router>
      <Suspense fallback={<LoadingIndicator />}>
        {appAuth.isLoggedIn && <MainHeader />}
        <Switch>
          <UnPrivateRoute path="/" exact>
            <AuthPage />
          </UnPrivateRoute>
          <PrivateRoute path="/home" exact>
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/users/:userId" exact>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/posts/:postId" exact>
            <PostPage />
          </PrivateRoute>
          <PrivateRoute path="/findpeople" exact>
            <FindPeoplePage />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default MainRouting;
