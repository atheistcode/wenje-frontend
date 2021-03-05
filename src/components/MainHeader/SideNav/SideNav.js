import React from "react";
import { CSSTransition } from "react-transition-group";

import "./SideNav.css";
import NavLinks from "../NavLinks/NavLinks";
import Logout from "../Logout/Logout";
import BackDrop from "../../SharedUi/BackDrop/BackDrop";
import Copyright from "../../SharedUi/Copyright/Copyright";

const SideNav = ({ show, handleToggleSideNav }) => {
  const myRef = React.createRef(null);

  return (
    <>
      <BackDrop show={show} onClick={handleToggleSideNav} />
      <CSSTransition in={show} timeout={200} classNames="slide-right" mountOnEnter unmountOnExit nodeRef={myRef}>
        <aside className="side-nav" ref={myRef}>
          <nav className="side-nav__container">
            <NavLinks vertical handleToggleSideNav={handleToggleSideNav} />
            <Logout />
          </nav>
          <Copyright />
        </aside>
      </CSSTransition>
    </>
  );
};

export default SideNav;
