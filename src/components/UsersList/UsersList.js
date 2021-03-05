import React from "react";

import "./UsersList.css";
import UserCard from "../SharedUi/UserCard/UserCard";

const UsersList = ({ users, findPeopleMode }) => {
  return (
    <div className="users-list">
      {users.map((user) => (
        <UserCard
          key={user._id}
          id={user._id}
          imgUrl={user.image.url}
          name={user.name}
          country={user.country}
          bio={user.bio}
          findPeopleMode={findPeopleMode}
        />
      ))}
    </div>
  );
};

export default UsersList;
