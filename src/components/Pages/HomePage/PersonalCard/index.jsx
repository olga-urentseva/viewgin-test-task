import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import Card from "../../../Card";
import { useAuthContext } from "../../../Contexts/AuthContext";
import Loader from "../../../Loader";

import classes from "./style.css";

const PersonalCard = () => {
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
    return <span>Something went wrong</span>;
  }
  if (isLoading) {
    return <Loader className={classes.PersonalCardLoader} />;
  }
  return (
    <Card>
      <span>Hello {login}! Glad to see you!</span>
    </Card>
  );
};

export default PersonalCard;
