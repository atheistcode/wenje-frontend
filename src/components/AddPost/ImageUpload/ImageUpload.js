import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import "./ImageUpload.css";

const ImageUpload = ({ handleOnSelectImage }) => {
  const filePickerRef = useRef();

  const clickPicker = () => filePickerRef.current.click();

  return (
    <div className="image-upload">
      <input type="file" onChange={handleOnSelectImage} ref={filePickerRef} className="image-upload__input" />
      <FontAwesomeIcon icon={faImage} onClick={clickPicker} className="image-upload__icon" title="Select image" />
    </div>
  );
};
export default ImageUpload;
