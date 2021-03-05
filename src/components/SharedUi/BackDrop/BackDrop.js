import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import "./BackDrop.css";

const BackDrop = ({ show, opacity, zIndex, onClick, children }) => {
  const myRef = React.createRef(null);

  return (
    <CSSTransition in={show} timeout={200} classNames="anim-display" mountOnEnter unmountOnExit nodeRef={myRef}>
      <div
        className="backdrop"
        style={{
          width: "100vw",
          backgroundColor: `rgba(0, 0, 0, ${opacity || "0.75"})`,
          zIndex: zIndex || "20",
        }}
        onClick={onClick}
        ref={myRef}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

BackDrop.propTypes = {
  show: PropTypes.bool.isRequired,
  opacity: PropTypes.string,
  zIndex: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default BackDrop;
