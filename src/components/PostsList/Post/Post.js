import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

import "./Post.css";
import Card from "../../SharedUi/Card/Card";
import Avatar from "../../SharedUi/Avatar/Avatar";
import DeleteButton from "../../SharedUi/DeleteButton/DeleteButton";
import CommentsList from "../../CommentsList/CommentsList";

import AppAuthContext from "../../../context/appAuthContext";
import useReactOnLikes from "../../../hooks/useReactOnLikes";
import useDeleteContent from "../../../hooks/useDeleteContent";

const Post = ({
  id,
  author,
  createdAt,
  content,
  image,
  commentsCount,
  likesCount,
  likedBy,
  showCommentsByDefault,
  limitComments,
  refresh,
}) => {
  const appAuth = useContext(AppAuthContext);

  const [isCommentsShown, setIsCommentsShown] = useState(showCommentsByDefault ? true : false);

  const {
    isLiked,
    setIsLiked,
    isLikeLoading,
    likesCountLocal,
    setLikesCountLocal,
    checkIsLiked,
    handleReactOnLikes,
  } = useReactOnLikes();
  const { deleteContent } = useDeleteContent("POST");

  useEffect(() => {
    setIsLiked(checkIsLiked(likedBy, appAuth.user._id));
  }, [likedBy]);

  useEffect(() => setLikesCountLocal(likesCount), [likesCount]);

  const deleteAndUpdate = async (id) => {
    await deleteContent(id);
    refresh();
  };

  const toggleViewComments = () => {
    setIsCommentsShown((prevState) => !prevState);
  };

  return (
    <>
      <Card className="post">
        <Avatar imgUrl={author.image.url} />

        <div className="post__body">
          <div className="post__body__header">
            <Link to={`/users/${author._id}`} className="post__body__header__user-name">
              {author.name}
            </Link>
            <div className="post__body__header__time">{createdAt}</div>
            <DeleteButton onClick={() => deleteAndUpdate(id)} />
          </div>

          <div className="post__body__content">{content}</div>

          {image && image.url && <img src={image.url} alt="post" className="post__body__post-image" />}

          <div className="post__body__reactions">
            <div className="post__body__reactions__comments" title="Add comment" onClick={toggleViewComments}>
              <span>
                <FontAwesomeIcon icon={faComment} />
              </span>
              <span>{commentsCount}</span>
              <span>comments</span>
            </div>
            <div
              className="post__body__reactions__likes"
              style={isLikeLoading ? { pointerEvents: "none" } : null}
              onClick={() => handleReactOnLikes(id)}
              title="Like post"
            >
              <span>
                <FontAwesomeIcon icon={faHeart} style={isLiked === true ? { color: "red" } : null} />
              </span>
              <span>{likesCountLocal}</span>
              <span>Likes</span>
            </div>
          </div>
        </div>
      </Card>

      {isCommentsShown && <CommentsList postId={id} limit={limitComments} />}
    </>
  );
};

export default Post;
