import React from "react";
import { Route } from "react-router";
import AuthContext from "./components/Contexts/AuthContext";

import LoginPage from "./components/Pages/LoginPage";
import HomePage from "./components/Pages/HomePage";

const App = () => {
  return (
    <AuthContext>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" exact component={HomePage} />
    </AuthContext>
  );
};

export default App;
