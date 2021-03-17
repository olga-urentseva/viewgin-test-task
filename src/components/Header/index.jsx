import React from "react";
import Button from "../Button";
import Container from "../Container";
import { useAuthContext } from "../contexts/AuthContext";

import classes from "./style.css";

const Header = () => {
  const authContext = useAuthContext();

  return (
    <header className={classes.Header}>
      <Container>
        <div className={classes.HeaderWrapper}>
          <h3 className={classes.HeaderTitle}>Example</h3>
          {!authContext.isAuth ? (
            ""
          ) : (
            <Button
              onClick={() => {
                authContext.logOut();
              }}
            >
              Log Out
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
