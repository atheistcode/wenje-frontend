import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import "./NavLinks.css";

import AppAuthContext from "../../../context/appAuthContext";

const NavLinks = ({ vertical, handleToggleSideNav }) => {
  const appAuth = useContext(AppAuthContext);

  return (
    <nav
      className={`nav-links-container ${
        vertical ? "nav-links-container--vertical" : "nav-links-container--horizontal"
      }`}
    >
      <NavLink to="/home" exact className="nav-link" onClick={handleToggleSideNav}>
        <FontAwesomeIcon icon={faHome} className="nav-link__icon" />
        <span className="nav-link__text">Home</span>
      </NavLink>

      <NavLink to="/findpeople" exact className="nav-link" onClick={handleToggleSideNav}>
        <FontAwesomeIcon icon={faUserPlus} className="nav-link__icon" />
        <span className="nav-link__text">Find People</span>
      </NavLink>

      <NavLink to={`/users/${appAuth.user._id}`} className="nav-link" onClick={handleToggleSideNav}>
        <FontAwesomeIcon icon={faUserCircle} className="nav-link__icon" />
        <span className="nav-link__text">Profile</span>
      </NavLink>
    </nav>
  );
};

export default NavLinks;
