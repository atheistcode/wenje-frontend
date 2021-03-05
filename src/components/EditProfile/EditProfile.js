import React from "react";

import "./EditProfile.css";
import Input from "../SharedUi/Input/Input";
import Button from "../SharedUi/Button/Button";

const EditProfile = ({ inputs, handleOnChangeInput, handleOnUploadImage, handleOnSubmitForm }) => {
  return (
    <div className="edit-profile">
      <form onSubmit={handleOnSubmitForm} className="edit-profile__form">
        <Input
          elemType="input"
          type="text"
          name="name"
          placeholder="Name"
          value={inputs["name"].value}
          onChange={handleOnChangeInput}
        />
        <Input
          elemType="input"
          type="email"
          name="email"
          placeholder="Email"
          value={inputs["email"].value}
          onChange={handleOnChangeInput}
        />
        <Input
          elemType="input"
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleOnChangeInput}
          value={inputs["country"].value}
        />
        <Input
          elemType="input"
          type="text"
          name="bio"
          placeholder="Bio"
          value={inputs["bio"].value}
          onChange={handleOnChangeInput}
        />
        <Button type="submit" primary left>
          Update Profile
        </Button>
      </form>
      <hr className="form-divider" />
      <div className="edit-profile__upload">
        <Input
          elemType="input"
          id="image"
          type="file"
          name="image"
          placeholder="Upload Your Profile Image"
          onChange={handleOnUploadImage}
          showLabel
        />
      </div>
    </div>
  );
};

export default EditProfile;
