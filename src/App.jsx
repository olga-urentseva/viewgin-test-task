import React from "react";
import { Route } from "react-router";
import AuthContext from "./components/contexts/AuthContext";

import LoginPage from "./components/pages/LoginPage";
import PersonalPage from "./components/pages/PersonalPage";

const App = () => {
  return (
    <AuthContext>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" exact component={PersonalPage} />
    </AuthContext>
  );
};

export default App;
