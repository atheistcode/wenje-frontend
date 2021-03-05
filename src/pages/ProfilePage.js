import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ProfilePage.css";
import ProfileIntro from "../components/ProfileIntro/ProfileIntro";
import EditProfile from "../components/EditProfile/EditProfile";
import AddPost from "../components/AddPost/AddPost";
import PostsList from "../components/PostsList/PostsList";
import UsersList from "../components/UsersList/UsersList";
import FindPeople from "../components/FindPeople/FindPeople";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import userConnectionsContext from "../context/userConnectionsContext";
import useApiUser from "../hooks/useApiUser";
import useApiPost from "../hooks/useApiPost";
import useFormData from "../hooks/useFormData";

const ProfilePage = () => {
  const appUi = useContext(AppUiContext);
  const appAuth = useContext(AppAuthContext);
  const userConn = useContext(userConnectionsContext);

  const [viewMode, setViewMode] = useState("FEED");

  const { fetchedUser, fetchUser } = useApiUser();
  const { fetchedPosts, fetchPosts } = useApiPost();
  const {
    formMode,
    handleChangeFormMode,
    inputs,
    handleOnChangeInput,
    handleOnUploadImage,
    handleOnSubmitForm,
  } = useFormData();

  const userId = useParams().userId;

  let isOwnProfile;
  if (userId === appAuth.user._id) {
    isOwnProfile = true;
  } else {
    isOwnProfile = false;
  }

  const handleToggleEditMode = () => {
    (viewMode === "FEED" || viewMode === "FOLLOWING" || viewMode === "FOLLOWERS") &&
      setViewMode("EDIT") &&
      handleChangeFormMode("EDIT_PROFILE");
    viewMode === "EDIT" && setViewMode("FEED");

    fetchUser(userId);
  };

  useEffect(() => {
    fetchUser(userId);
    fetchPosts(userId);
  }, [userId]);

  return (
    <>
      {!appUi.isLoading && fetchedUser && (
        <div className="app profile-page">
          <main>
            <ProfileIntro
              isOwnProfile={isOwnProfile}
              id={fetchedUser._id}
              imgUrl={fetchedUser.image.url}
              name={fetchedUser.name}
              country={fetchedUser.country}
              bio={fetchedUser.bio}
              followingCount={fetchedUser.following.length}
              followingList={userConn.following || appAuth.user.following}
              followersCount={fetchedUser.followers.length}
              joinDate={new Date(fetchedUser.createdAt).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
              })}
              viewMode={viewMode}
              toggleMode={handleToggleEditMode}
              setViewMode={setViewMode}
              changeFormMode={handleChangeFormMode("EDIT_PROFILE")}
            />
            {isOwnProfile && viewMode === "EDIT" && (
              <EditProfile
                inputs={inputs}
                handleOnChangeInput={handleOnChangeInput}
                handleOnUploadImage={handleOnUploadImage}
                handleOnSubmitForm={handleOnSubmitForm}
              />
            )}
            {viewMode === "FEED" && (
              <>
                {isOwnProfile && <AddPost refresh={() => fetchPosts(userId)} />}
                {fetchedPosts && <PostsList posts={fetchedPosts} refresh={() => fetchPosts(userId)} />}
              </>
            )}
            {viewMode === "FOLLOWING" && <UsersList users={fetchedUser.following} />}
            {viewMode === "FOLLOWERS" && <UsersList users={fetchedUser.followers} />}
          </main>
          <FindPeople />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
