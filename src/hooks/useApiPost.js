import { useContext, useState } from "react";
import axios from "axios";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useApiPost = () => {
  const appUi = useContext(AppUiContext);
  const appAuth = useContext(AppAuthContext);

  const [fetchedPost, setFetchedPost] = useState();
  const [fetchedPosts, setFetchedPosts] = useState();

  const fetchPost = async (postId) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/posts/${postId}`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      setFetchedPost(response.data.data.post);
    } catch (err) {
      catchErrors(err, appAuth);
    }
  };

  const fetchPosts = async (userId) => {
    appUi.startLoading();
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/posts/byuser/${userId}`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      setFetchedPosts(response.data.data.posts);
      appUi.stopLoading();
    } catch (err) {
      appUi.stopLoading();
      catchErrors(err, appAuth);
    }
  };

  return { fetchedPost, fetchPost, fetchedPosts, fetchPosts };
};

export default useApiPost;
