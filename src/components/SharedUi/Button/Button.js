import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({
  children,
  type,
  onClick,
  primary,
  secondary,
  inversePrimary,
  center,
  top,
  right,
  bottom,
  left,
  className,
  style,
}) => {
  const styles = [];

  primary && styles.push("button--primary");
  secondary && styles.push("button--secondary");
  inversePrimary && styles.push("button--inverse-primary");
  center && styles.push("button--center");
  right && styles.push("button--right");
  left && styles.push("button--left");
  top && styles.push("button--top");
  bottom && styles.push("button--bottom");

  const stylesClasses = styles.join(" ");

  return (
    <input
      type={type}
      value={children}
      onClick={onClick}
      className={`${className} ${stylesClasses} button`}
      style={style}
    />
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  center: PropTypes.bool,
  top: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.any,
};

export default Button;
