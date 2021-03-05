import React from "react";

import "./Copyright.css";

const Copyright = () => {
  return (
    <p className="copyright">
      Copyright ©{" "}
      <a href="https://wenje-front.herokuapp.com/" className="copyright__link">
        wenje.com
      </a>{" "}
      2020
    </p>
  );
};

export default Copyright;
