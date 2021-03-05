import { createContext } from "react";

const AppUiContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export default AppUiContext;
