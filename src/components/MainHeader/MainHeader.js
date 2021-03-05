import React, { useState, useCallback } from "react";

import "./MainHeader.css";
import TopNav from "./TopNav/TopNav";
import SideNav from "./SideNav/SideNav";

const MainHeader = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleToggleSideNav = useCallback(() => setIsSideNavOpen((prevState) => !prevState), []);

  return (
    <div className="main-header">
      <div className="main-header__contents-container">
        <TopNav handleToggleSideNav={handleToggleSideNav} />
        <SideNav show={isSideNavOpen} handleToggleSideNav={handleToggleSideNav} />
      </div>
    </div>
  );
};

export default MainHeader;
