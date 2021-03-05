import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "../NavLinks/NavLinks.css";

import AppAuthContext from "../../../context/appAuthContext";

const Logout = () => {
  const appAuth = useContext(AppAuthContext);

  return (
    <div onClick={appAuth.logout} className="nav-link nav-link--logout">
      <FontAwesomeIcon icon={faSignOutAlt} className="nav-link__icon" />
      <span className="nav-link__text">Logout</span>
    </div>
  );
};

export default Logout;
