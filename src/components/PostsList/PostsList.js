import React from "react";

import Post from "./Post/Post";

const PostsList = ({ posts, refresh }) => {
  if (posts === undefined || posts.length === 0)
    return <h4 style={{ textAlign: "center" }}>No posts are available yet.</h4>;

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            createdAt={new Date(post.createdAt).toLocaleString(undefined, {
              // TODO: make date as time ago
              weekday: "short",
              year: "2-digit",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
            image={post.image}
            content={post.content}
            commentsCount={post.commentsCount}
            likesCount={post.likesCount}
            likedBy={post.likedBy}
            showCommentsByDefault={false}
            limitComments={true}
            refresh={refresh}
          />
        );
      })}
    </>
  );
};

export default PostsList;
