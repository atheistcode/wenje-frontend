import { useContext, useState, useEffect } from "react";
import axios from "axios";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useFetchComments = (postId, limit) => {
  const appUi = useContext(AppUiContext);
  const appAuth = useContext(AppAuthContext);

  const [commentsCount, setCommentsCount] = useState("");
  const [loadedComments, setLoadedComments] = useState([]);

  const fetchComments = async () => {
    appUi.startLoading();
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${limit}`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      appUi.stopLoading();
      const countNumber = response.data.data.count;
      setCommentsCount(countNumber);
      setLoadedComments(response.data.data.comments);
    } catch (err) {
      appUi.stopLoading();
      catchErrors(err, appAuth);
    }
  };

  useEffect((postId) => {
    fetchComments(postId);
  }, []);

  return { commentsCount, loadedComments, fetchComments };
};

export default useFetchComments;
