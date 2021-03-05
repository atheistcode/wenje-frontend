import React from "react";

import "./AddPost.css";
import Card from "../SharedUi/Card/Card";
import Input from "../SharedUi/Input/Input";
import Button from "../SharedUi/Button/Button";
import ImageUpload from "./ImageUpload/ImageUpload";

import useAddContent from "../../hooks/useAddContent";

const AddPost = ({ refresh }) => {
  const { textContent, handleOnChangeContent, handleOnSelectImage, previewUrl, handleOnSubmitForm } = useAddContent(
    "POST"
  );

  const submitAndUpdate = async (e) => {
    await handleOnSubmitForm(e);
    refresh();
  };

  return (
    <Card className="add-post">
      <form onSubmit={submitAndUpdate} className="add-post__form">
        <Input
          elemType="textarea"
          type="text"
          name="content"
          placeholder="What is in your mind?"
          value={textContent}
          onChange={handleOnChangeContent}
          lg
          className="add-post__form__input"
        />
        {previewUrl && (
          <div
            style={{
              backgroundImage: `url(${previewUrl})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            className="add-post__image-preview"
          ></div>
        )}
        <div className="add-post__form__buttons">
          <ImageUpload handleOnSelectImage={handleOnSelectImage} />
          <Button type="submit" primary className="add-post__form__buttons__add">
            Add Post
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddPost;
