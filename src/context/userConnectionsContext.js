import { createContext } from "react";

const userConnectionsContext = createContext({
  following: [],
  followers: [],
  updateFollowing: () => {},
  updateFollowers: () => {},
});

export default userConnectionsContext;
