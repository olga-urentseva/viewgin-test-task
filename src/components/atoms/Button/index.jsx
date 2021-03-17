import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";

import classes from "./style.css";

const Button = ({ children, type, className, ...rest }) => {
  return (
    <button
      type={type}
      className={classNames(classes.Button, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  btntype: PropTypes.string,
};

export default Button;
