import React from "react";

import classNames from "classnames";
import classes from "./style.css";

const Loader = ({ className }) => {
  return <div className={classNames(classes.Loader, className)}></div>;
};

export default Loader;
