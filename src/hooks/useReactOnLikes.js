import { useContext, useState } from "react";
import axios from "axios";

import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useReactOnLikes = () => {
  const appAuth = useContext(AppAuthContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [likesCountLocal, setLikesCountLocal] = useState(null);

  const checkIsLiked = (likedBy, userId) => {
    const likedByList = likedBy.map((el) => el.likedBy);

    if (likedByList.includes(userId)) {
      return true;
    } else {
      return false;
    }
  };

  const handleReactOnLikes = async (postId) => {
    setIsLikeLoading(true);

    if (isLiked) {
      setIsLiked(false);
      setLikesCountLocal((prevState) => prevState - 1);
    }
    if (!isLiked) {
      setIsLiked(true);
      setLikesCountLocal((prevState) => prevState + 1);
    }

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/posts/${postId}/likes`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      setIsLikeLoading(false);
      return response.data.results;
    } catch (err) {
      setIsLikeLoading(false);
      catchErrors(err, appAuth);
    }
  };

  return { isLiked, setIsLiked, isLikeLoading, likesCountLocal, setLikesCountLocal, checkIsLiked, handleReactOnLikes };
};

export default useReactOnLikes;
