import React from "react";
import classNames from "classnames";

import classes from "./style.css";

const Card = ({ children, className }) => {
  return <div className={classNames(classes.Card, className)}>{children}</div>;
};

export default Card;
