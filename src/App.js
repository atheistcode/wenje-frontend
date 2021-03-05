import React from "react";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import LoadingIndicator from "./components/SharedUi/LoadingIndicator/LoadingIndicator";
import MainRouting from "./routing/MainRouting";

import AppUiContext from "./context/appUiContext";
import AppAuthContext from "./context/appAuthContext";
import useAppUi from "./hooks/useAppUi";
import useAppAuth from "./hooks/useAppAuth";
import useUserConnections from "./hooks/useUserConnections";
import userConnectionsContext from "./context/userConnectionsContext";

const App = () => {
  const { isLoading, startLoading, stopLoading } = useAppUi();
  const { isLoggedIn, login, logout, user, token } = useAppAuth();
  const { following, updateFollowing, followers, updateFollowers } = useUserConnections();

  return (
    <AppUiContext.Provider
      value={{
        isLoading: false,
        startLoading: startLoading,
        stopLoading: stopLoading,
      }}
    >
      <AppAuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          login: login,
          logout: logout,
          user: user,
          token: token,
        }}
      >
        <userConnectionsContext.Provider
          value={{
            following: following,
            updateFollowing: updateFollowing,
            followers: followers,
            updateFollowers: updateFollowers,
          }}
        >
          <ErrorBoundary>
            {isLoading && <LoadingIndicator />}
            <MainRouting />
          </ErrorBoundary>
        </userConnectionsContext.Provider>
      </AppAuthContext.Provider>
    </AppUiContext.Provider>
  );
};

export default App;
