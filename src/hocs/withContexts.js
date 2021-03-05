import React from "react";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import UserConnectionsContext from "../context/userConnectionsContext";

const withContexts = (Component) => {
  return function contextComponent() {
    return (
      <AppUiContext.Consumer>
        {(appUi) => (
          <AppAuthContext.Consumer>
            {(appAuth) => (
              <UserConnectionsContext.Consumer>
                {(userConnections) => <Component appUi={appUi} appAuth={appAuth} userConnections={userConnections} />}
              </UserConnectionsContext.Consumer>
            )}
          </AppAuthContext.Consumer>
        )}
      </AppUiContext.Consumer>
    );
  };
};

export default withContexts;
