import React from "react";
import { Redirect } from "react-router";

import Container from "../../Container";
import { useAuthContext } from "../../contexts/AuthContext";
import Layout from "../../Layout";
import MainContainer from "../../MainContainer";
import PersonalCard from "./PersonalCard";

const HomePage = () => {
  const authContext = useAuthContext();

  if (!authContext.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout>
      <MainContainer>
        <Container>
          <PersonalCard />
        </Container>
      </MainContainer>
    </Layout>
  );
};

export default HomePage;
