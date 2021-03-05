import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

import "./ProfileIntro.css";
import Card from "../SharedUi/Card/Card";
import Avatar from "../SharedUi/Avatar/Avatar";
import Button from "../SharedUi/Button/Button";

import useFollowing from "../../hooks/useFollowing";

const ProfileIntro = ({
  isOwnProfile,
  id,
  imgUrl,
  name,
  country,
  bio,
  followingCount,
  followingList,
  followersCount,
  joinDate,
  viewMode,
  setViewMode,
  toggleMode,
  changeFormMode,
}) => {
  const { isFollowed, setIsFollowed, checkIsFollowing, isFollowLoading, handleFollowing } = useFollowing();

  const changeToEditMode = () => {
    changeFormMode();
    toggleMode();
  };

  useEffect(() => {
    setIsFollowed(checkIsFollowing(followingList, id));
  }, [id]);

  return (
    <Card lg className="profile-intro">
      <div className="profile-intro__header">
        <Avatar imgUrl={imgUrl} lg />
        {isOwnProfile ? (
          <Button type="button" primary right onClick={changeToEditMode}>
            {viewMode !== "EDIT" ? "Edit Profile" : "View Profile"}
          </Button>
        ) : (
          <Button
            type="button"
            primary
            right
            onClick={() => handleFollowing(id)}
            style={isFollowLoading ? { pointerEvents: "none" } : null}
          >
            {isFollowed === true ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>

      <div className="profile-intro__body">
        <span className="profile-intro__body__name">{name}</span>
        <span className="profile-intro__body__country">{country}</span>
        <span className="profile-intro__body__bio">{bio}</span>
      </div>

      <hr className="divider" />

      <div className="profile-intro__footer">
        <div
          className="profile-intro__footer__following"
          style={viewMode === "FOLLOWING" ? { color: "var(--color-primary-dark" } : null}
          onClick={() => setViewMode("FOLLOWING")}
        >
          <FontAwesomeIcon icon={faUserFriends} />
          <span>{followingCount}</span>
          <span>Following</span>
        </div>

        <div
          className="profile-intro__footer__followers"
          style={viewMode === "FOLLOWERS" ? { color: "var(--color-primary-dark" } : null}
          onClick={() => setViewMode("FOLLOWERS")}
        >
          <FontAwesomeIcon icon={faUserFriends} />
          <span>{followersCount}</span>
          <span>Followers</span>
        </div>

        <div className="profile-intro__footer__join-date">Joined in {joinDate}</div>
      </div>
    </Card>
  );
};

export default ProfileIntro;
