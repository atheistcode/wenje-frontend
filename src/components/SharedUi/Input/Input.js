import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const Input = ({
  id,
  elemType,
  type,
  name,
  placeholder,
  showLabel,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyUp,
  required,
  lg,
  className,
}) => {
  const element =
    elemType === "input" ? (
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        required={required}
        className={`input ${className}`}
      />
    ) : elemType === "textarea" ? (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        required={required}
        className={`textarea ${lg && "textarea--lg"} ${className}`}
      />
    ) : null;

  return (
    <>
      {showLabel && id && (
        <label className="label" htmlFor={id}>
          {placeholder}:
        </label>
      )}
      {element}
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  elemType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  required: PropTypes.bool,
  lg: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
