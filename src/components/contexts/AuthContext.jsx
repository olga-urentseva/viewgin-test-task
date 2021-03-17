import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Context = React.createContext(null);

const AuthContext = ({ children }) => {
  const [userToken, setUserToken] = useState(
    () => window.localStorage.getItem("userToken") || null
  );

  const history = useHistory();

  function logOut() {
    setUserToken(null);
    history.push("/");
  }

  useEffect(() => {
    if (!userToken) {
      window.localStorage.removeItem("userToken");
    } else {
      window.localStorage.setItem("userToken", userToken);
    }
  }, [userToken]);

  const isAuth = userToken ? true : false;

  return (
    <Context.Provider
      value={{ userToken, login: setUserToken, logOut, isAuth }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAuthContext() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error(
      "useAuthContext function can not be used outside of AuthContext"
    );
  }
  return contextValue;
}

export default AuthContext;
