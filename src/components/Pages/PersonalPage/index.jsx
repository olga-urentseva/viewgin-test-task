import React from "react";
import { Redirect } from "react-router";

import Container from "../../templates/Container";
import { useAuthContext } from "../../contexts/AuthContext";
import Layout from "../../templates/Layout";
import MainContainer from "../../templates/MainContainer";
import PersonalInfo from "./PersonalInfo";
import LineanChart from "../../organisms/charts/LineanChart";
import DonutChart from "../../organisms/charts/DonutChart";

import classes from "./style.css";

const PersonalPage = () => {
  const authContext = useAuthContext();

  if (!authContext.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout>
      <MainContainer>
        <Container>
          <div className={classes.PersonalPageWrapper}>
            <PersonalInfo className={classes.PersonalPageUserInfo} />
            <LineanChart
              className={classes.PersonalPageChart}
              title="Linear Chart"
            />
            <DonutChart
              className={classes.PersonalPageUserChart}
              title="Circle Chart"
            />
          </div>
        </Container>
      </MainContainer>
    </Layout>
  );
};

export default PersonalPage;
