import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/PostsList/Post/Post";
import FindPeople from "../components/FindPeople/FindPeople";

import useApiPost from "../hooks/useApiPost";

const PostPage = () => {
  const { fetchedPost, fetchPost } = useApiPost();

  const postId = useParams().postId;

  useEffect(() => {
    fetchPost(postId);
  }, []);

  return (
    <div className="app">
      <main>
        {fetchedPost && (
          <Post
            id={postId}
            author={fetchedPost.author}
            createdAt={new Date(fetchedPost.createdAt).toLocaleString(undefined, {
              // TODO: make date as time ago
              weekday: "short",
              year: "2-digit",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
            content={fetchedPost.content}
            image={fetchedPost.image}
            commentsCount={fetchedPost.commentsCount}
            likesCount={fetchedPost.likesCount}
            likedBy={fetchedPost.likedBy}
            refresh={fetchedPost}
            showCommentsByDefault={true}
            limitComments={false}
          />
        )}
      </main>
      <FindPeople />
    </div>
  );
};

export default PostPage;
