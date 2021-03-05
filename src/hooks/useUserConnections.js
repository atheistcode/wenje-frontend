import { useState } from "react";

const useUserConnections = () => {
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();

  const updateFollowing = (list) => {
    setFollowing(list);
  };

  const updateFollowers = (list) => {
    setFollowers(list);
  };

  return { following, updateFollowing, followers, updateFollowers };
};

export default useUserConnections;
