import React, { useEffect } from "react";
import { Redirect } from "react-router";
import Container from "../../templates/Container";
import { useAuthContext } from "../../contexts/AuthContext";

import Form from "../../molecules/LoginForm";
import Layout from "../../templates/Layout";
import MainContainer from "../../templates/MainContainer";

import classes from "./style.css";

const LoginPage = () => {
  const authContext = useAuthContext();
  if (authContext.isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <MainContainer>
        <Container>
          <div className={classes.LoginPageWrapper}>
            <div className={classes.LoginPageForm}>
              <Form />
            </div>
          </div>
        </Container>
      </MainContainer>
    </Layout>
  );
};

export default LoginPage;
