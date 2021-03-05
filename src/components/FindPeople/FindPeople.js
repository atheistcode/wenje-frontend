import React, { useEffect } from "react";

import "./FindPeople.css";
import UserCard from "../SharedUi/UserCard/UserCard";

import useApiUser from "../../hooks/useApiUser";

const FindPeople = ({ pageMode }) => {
  let { people, findPeople } = useApiUser();

  useEffect(() => {
    findPeople();
  }, []);

  return (
    <div>
      <div className={`${pageMode ? "find-people--page" : "find-people"}`}>
        <h3 className="find-people__title">Who To Follow?</h3>
        {people && (
          <div className={`${pageMode ? "find-people__list--page" : "find-people__list"}`}>
            {!pageMode
              ? people
                  .slice(0, 5)
                  .map((user) => (
                    <UserCard
                      key={user._id}
                      id={user._id}
                      imgUrl={user.image.url}
                      name={user.name}
                      country={user.country}
                      bio={user.bio}
                      findPeopleMode={true}
                    />
                  ))
              : people.map((user) => (
                  <UserCard
                    key={user._id}
                    id={user._id}
                    imgUrl={user.image.url}
                    name={user.name}
                    country={user.country}
                    bio={user.bio}
                    findPeopleMode={true}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPeople;
