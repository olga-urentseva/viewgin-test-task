import React from "react";

const ChartWrapper = ({ children, className, title }) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default ChartWrapper;
