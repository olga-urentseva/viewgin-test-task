import React, { useState } from "react";
import axios from "axios";

import Button from "../Button";
import Input from "../Input";

import classes from "./style.css";
import Loader from "../Loader";
import { useAuthContext } from "../Contexts/AuthContext";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);

  const [loginInputValue, setLoginInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const authContext = useAuthContext();

  function handleLoginChange(e) {
    setLoginInputValue(e.target.value);
  }

  function handlePasswordChange(e) {
    setPasswordInputValue(e.target.value);
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    const data = {
      login: loginInputValue,
      password: passwordInputValue,
    };
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://ideadeploy.space/test/login.json",
        data
      );
      setIsLoading(false);

      authContext.login(res.data.token);
    } catch (err) {
      setIsLoading(false);

      setIsErrorShown(true);
    }
  }

  return (
    <form className={classes.FormWrapper} onSubmit={onSubmitForm}>
      {isErrorShown ? (
        <h3 className={classes.ErrorMessage}>
          Enter correct login and passsword
        </h3>
      ) : null}
      <Input
        type="text"
        id="login"
        labelTitle="Login"
        pattern="^[a-z0-9A-Z]{3,20}$"
        minLength="3"
        required
        className={classes.FormInput}
        value={loginInputValue}
        onChange={handleLoginChange}
        autoComplete="on"
      />
      <Input
        type="password"
        minLength="5"
        id="password"
        labelTitle="Password"
        required
        className={classes.FormInput}
        value={passwordInputValue}
        onChange={handlePasswordChange}
        autoComplete="on"
      />
      <div className={classes.FormFooter}>
        <Button type="submit" className={classes.FormButton}>
          Submit
        </Button>
        {isLoading ? <Loader className={classes.FormLoader} /> : ""}
      </div>
    </form>
  );
};

export default Form;
