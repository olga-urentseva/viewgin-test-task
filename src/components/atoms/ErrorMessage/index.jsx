import React from "react";

import PropTypes from "prop-types";

import classes from "./style.css";

const ErrorMessage = ({ message }) => {
  return <span className={classes.ErrorMessage}>{message}</span>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
