import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

const Card = ({ children, lg, className }) => {
  return <div className={`card ${lg ? "card--lg" : "card--sm"} ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.any.isRequired,
  lg: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;
