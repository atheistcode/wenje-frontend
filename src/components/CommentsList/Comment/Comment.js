import React from "react";
import { Link } from "react-router-dom";

import "./Comment.css";
import Avatar from "../../SharedUi/Avatar/Avatar";
import DeleteButton from "../../SharedUi/DeleteButton/DeleteButton";

import useDeleteContent from "../../../hooks/useDeleteContent";

const Comment = ({ id, author, createdAt, content, likesCount, onPost, updateCommentsList }) => {
  const { deleteContent } = useDeleteContent("COMMENT", onPost);

  const deleteAndUpdate = async (id) => {
    await deleteContent(id);
    updateCommentsList();
  };

  return (
    <div className="comment">
      <Avatar imgUrl={author.image.url} circle />
      <div className="comment__body">
        <div className="comment__body__header">
          <Link to={`/users/${author._id}`} className="comment__body__header__user-name">
            {author.name}
          </Link>
          <div className="comment__body__header__time">{createdAt}</div>
          <DeleteButton onClick={() => deleteAndUpdate(id)} />
        </div>
        <div className="comment__body__content">{content}</div>
      </div>
    </div>
  );
};

export default Comment;
