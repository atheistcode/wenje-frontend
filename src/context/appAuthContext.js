import { createContext } from "react";

const AppAuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
  token: null,
});

export default AppAuthContext;
