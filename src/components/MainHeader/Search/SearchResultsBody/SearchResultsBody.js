import React from "react";
import { Link } from "react-router-dom";

import "./SearchResultsBody.css";
import SearchLoading from "../SearchLoading/SearchLoading";
import Avatar from "../../../SharedUi/Avatar/Avatar";

const SearchResults = ({ isSearchLoading, searchResults, onClickLink }) => {
  return (
    <div className="search-results-body">
      <div className="search-results-body__header">
        {searchResults && searchResults.length !== 0 ? `Found ${searchResults.length} results.` : "Nothing found."}
      </div>

      {isSearchLoading && <SearchLoading />}

      {searchResults &&
        searchResults.map((user) => {
          return (
            <Link key={user._id} to={`/users/${user._id}`} onClick={onClickLink} className="search-results-body__item">
              <Avatar imgUrl={user.image.url} circle />
              <h4 className="search-results-body__item__name">{user.name}</h4>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchResults;
