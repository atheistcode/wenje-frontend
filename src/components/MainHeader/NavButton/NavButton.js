import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./NavButton.css";

const NavButton = ({ onClick, className }) => {
  return (
    <div className={`nav-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default NavButton;
