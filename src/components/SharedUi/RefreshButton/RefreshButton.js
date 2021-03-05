import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import "./RefreshButton.css";

const RefreshButton = ({ onClick, className }) => {
  return (
    <div onClick={onClick} className={`refresh-button ${className}`} title="Refresh page">
      <FontAwesomeIcon icon={faSyncAlt} />
    </div>
  );
};

RefreshButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default RefreshButton;
