import { useState, useCallback, useEffect } from "react";

let logoutTimer;

const useAppAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpireIn, setTokenExpireIn] = useState(null);

  const login = useCallback((user, token, tokenExpireIn = Date.now() + 1000 * 60 * 60 * 24 * 7) => {
    setUser(user);
    setToken(token);
    setTokenExpireIn(tokenExpireIn);
    localStorage.setItem(
      "loginData",
      JSON.stringify({
        user: user,
        token: token,
        tokenExpireIn: tokenExpireIn,
      })
    );
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setTokenExpireIn(null);
    localStorage.removeItem("loginData");
  }, []);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));

    if (loginData && loginData.token && loginData.tokenExpireIn > Date.now()) {
      login(loginData.user, loginData.token, loginData.tokenExpireIn);
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpireIn) {
      const tokenExpireInRemaining = tokenExpireIn - Date.now();

      logoutTimer = setTimeout(() => {
        logout();
        window.alert("Your login token has expired. Please sign in again.");
      }, tokenExpireInRemaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpireIn, logout]);

  return { isLoggedIn, login, logout, user, token };
};

export default useAppAuth;
