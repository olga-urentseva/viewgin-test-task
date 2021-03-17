import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import Card from "../../../atoms/Card";
import { useAuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../atoms/Loader";
import ErrorMessage from "../../../atoms/ErrorMessage";

import classes from "./style.css";

const PersonalInfo = ({ className }) => {
  const authContext = useAuthContext();
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [login, setLogin] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://ideadeploy.space/test/info.json", {
          headers: { Authorization: `Bearer ${authContext.userToken}` },
        });
        setIsLoading(false);
        setLogin(res.data.login);
      } catch (error) {
        setIsLoading(false);
        if (error.status === 403) {
          return <Redirect to="/" />;
        } else {
          setIsErrorShown(true);
        }
      }
    }
    fetchData();
  }, [authContext.userToken]);

  if (isErrorShown) {
    return (
      <ErrorMessage message="Something went wrong, please reload the page" />
    );
  }
  if (isLoading) {
    return <Loader className={classes.PersonalInfoLoader} />;
  }
  return (
    <Card className={className}>
      <span>Hello {login}! Glad to see you!</span>
    </Card>
  );
};

export default PersonalInfo;
