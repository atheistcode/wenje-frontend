import React from "react";
import PropTypes from "prop-types";

import "./Avatar.css";

const Avatar = ({ imgUrl, md, lg, circle, className }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`${lg ? "avatar--lg" : md ? "avatar--md" : "avatar--sm"} ${
        circle ? "avatar--circle" : "avatar--box"
      } ${className}`}
    ></div>
  );
};

Avatar.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  circle: PropTypes.bool,
  className: PropTypes.string,
};

export default Avatar;
