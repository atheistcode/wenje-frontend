import React from "react";

import "./TopNav.css";
import NavButton from "../NavButton/NavButton";
import Logo from "../../SharedUi/Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import Search from "../Search/Search";
import Logout from "../Logout/Logout";

const TopNav = ({ handleToggleSideNav }) => {
  return (
    <nav className="top-nav">
      <NavButton className="hide-nav-button-on-lg-screen" onClick={handleToggleSideNav} />
      <Logo left />
      <NavLinks />
      <Search />
      <Logout />
    </nav>
  );
};

export default TopNav;
