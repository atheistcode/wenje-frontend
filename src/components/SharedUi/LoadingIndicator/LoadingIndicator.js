import React from "react";

import "./LoadingIndicator.css";

const LoadingIndicator = () => {
  return (
    <div className="bg-overlay">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
