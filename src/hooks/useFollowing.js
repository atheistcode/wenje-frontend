import { useContext, useState } from "react";
import axios from "axios";

import AppAuthContext from "../context/appAuthContext";
import UserConnectionsContext from "../context/userConnectionsContext";
import catchErrors from "../utils/catchErrors";

const useFollowing = () => {
  const appAuth = useContext(AppAuthContext);
  const userConn = useContext(UserConnectionsContext);

  const [isFollowed, setIsFollowed] = useState();
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const checkIsFollowing = (following, userId) => {
    if (following.includes(userId)) {
      return true;
    } else {
      return false;
    }
  };

  const handleFollowing = async (id) => {
    setIsFollowLoading(true);

    try {
      let response;

      if (!isFollowed) {
        response = await axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_API_URL}/users/follow`,
          data: { followId: id },
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });
      }

      if (isFollowed) {
        response = await axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_API_URL}/users/unfollow`,
          data: { unfollowId: id },
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });
      }

      userConn.updateFollowing(response.data.data.user.following);
      setIsFollowed((prevState) => !prevState);
      setIsFollowLoading(false);
      return response.data.results;
    } catch (err) {
      setIsFollowLoading(false);
      catchErrors(err, appAuth);
    }
  };

  return { isFollowed, setIsFollowed, checkIsFollowing, isFollowLoading, handleFollowing };
};

export default useFollowing;
