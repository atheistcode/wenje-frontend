import React from "react";

import "./AddComment.css";
import Input from "../SharedUi/Input/Input";
import Button from "../SharedUi/Button/Button";

import useAddContent from "../../hooks/useAddContent";

const AddComment = ({ postId, update }) => {
  const { textContent, handleOnChangeContent, handleOnSubmitForm } = useAddContent("comment", postId);

  const handleSubmitAndUpdate = async (e) => {
    await handleOnSubmitForm(e);
    update();
  };

  return (
    <form onSubmit={handleSubmitAndUpdate} className="add-comment">
      <Input
        elemType="textarea"
        type="text"
        name="content"
        placeholder="Add Comment..."
        value={textContent}
        onChange={handleOnChangeContent}
        className="add-comment__input"
      />
      <Button type="submit" primary className="add-comment__button">
        Post
      </Button>
    </form>
  );
};

export default AddComment;
