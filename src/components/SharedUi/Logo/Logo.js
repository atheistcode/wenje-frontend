import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "./logo-icon.svg";

import "./Logo.css";

const Logo = ({ className, center, right, left }) => {
  const styles = [];

  center && styles.push("button--center");
  right && styles.push("button--right");
  left && styles.push("button--left");

  const stylesClasses = styles.join(" ");

  return (
    <>
      <Link to="/home" className={`logo ${className} ${stylesClasses}`}>
        <LogoIcon className="logo__icon" />
        <span className="logo__text">Wenje</span>
      </Link>
    </>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  center: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

export default Logo;
