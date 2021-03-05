import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./DeleteButton.css";

const DeleteButton = ({ onClick, className }) => {
  return (
    <div className={`delete-button ${className}`} title="Delete" onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DeleteButton;
