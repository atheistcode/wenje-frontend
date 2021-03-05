import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./UserCard.css";
import Avatar from "../Avatar/Avatar";

import AppAuthContext from "../../../context/appAuthContext";
import UserConnectionsContext from "../../../context/userConnectionsContext";
import useFollowing from "../../../hooks/useFollowing";

const UserCard = ({ id, imgUrl, name, country, bio, findPeopleMode }) => {
  const appAuth = useContext(AppAuthContext);
  const userConn = useContext(UserConnectionsContext);

  const { isFollowed, setIsFollowed, checkIsFollowing, isFollowLoading, handleFollowing } = useFollowing();

  useEffect(() => {
    setIsFollowed(checkIsFollowing(userConn.following || appAuth.user.following, id));
  }, [userConn.following, id]);

  return (
    <div className="user-card">
      <div className="user-card__body">
        <div className="user-card__body__avatar">
          <Avatar md imgUrl={imgUrl} />
        </div>
        <div className="user-card__body__text">
          <Link to={`/users/${id}`} className="user-card__body__text__name">
            {name}
          </Link>
          <span className="user-card__body__text__country">{country}</span>
          <span className="user-card__body__text__bio">{bio}</span>
        </div>
      </div>
      {findPeopleMode && (
        <div
          className="user-card__footer"
          style={isFollowLoading ? { pointerEvents: "none" } : null}
          onClick={() => handleFollowing(id)}
        >
          <span>{isFollowed ? "- Unfollow" : "+ Follow"}</span>
        </div>
      )}
    </div>
  );
};

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  findPeopleMode: PropTypes.bool,
};

export default UserCard;
