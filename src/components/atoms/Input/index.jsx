import React from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./style.css";

const Input = ({ id, className, labelTitle, ...rest }) => {
  return (
    <div className={classNames(classes.InputWrapper, className)}>
      <label htmlFor={id} className={classes.Label}>
        {labelTitle}
      </label>
      <input className={classes.Input} {...rest} />
    </div>
  );
};

export const INPUT_TYPES = {
  TEXT: "text",
  PASSWORD: "password",
};

Input.propTypes = {
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  onChange: PropTypes.func,
  labelTitle: PropTypes.string,
};

export default Input;
