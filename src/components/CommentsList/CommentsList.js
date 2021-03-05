import React from "react";
import { Link } from "react-router-dom";

import "./CommentsList.css";
import AddComment from "../AddComment/AddComment";
import Comment from "./Comment/Comment";

import useFetchComments from "../../hooks/useFetchComments";

const CommentsList = ({ postId, limit }) => {
  const { commentsCount, loadedComments, fetchComments } = useFetchComments(postId, limit);

  return (
    <div className="comments-list">
      <AddComment postId={postId} update={fetchComments} />
      {commentsCount >= 0 && loadedComments && (
        <>
          {loadedComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                author={comment.author}
                createdAt={new Date(comment.createdAt).toLocaleString(undefined, {
                  // TODO: make date as time ago
                  weekday: "short",
                  // year: "2-digit",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                content={comment.content}
                likesCount={comment.likesCount}
                onPost={comment.onPost}
                updateCommentsList={fetchComments}
              />
            );
          })}
          {commentsCount > loadedComments.length ? (
            <div className="comments-list__footer">
              <Link to={`/posts/${postId}`}>Show full comments</Link>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default CommentsList;
