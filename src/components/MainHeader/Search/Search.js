import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./Search.css";
import SearchForm from "./SearchForm/SearchForm";
import BackDrop from "../../SharedUi/BackDrop/BackDrop";
import SearchResultsBody from "./SearchResultsBody/SearchResultsBody";
import SearchResultsFooter from "./SearchResultsFooter/SearchResultsFooter";

import useSearchDb from "../../../hooks/useSearchDb";

const Search = () => {
  const {
    isSearchLoading,
    searchText,
    setSearchText,
    searchResults,
    handleOnChangeSearch,
    handleOnSubmitSearch,
    handleOnCloseSearchResults,
  } = useSearchDb();

  const [isSearchInFocus, setIsSearchInFocus] = useState(false);
  const handleOnFocusSearch = () => setIsSearchInFocus(true);

  const handleOnCloseBackdrop = () => {
    setIsSearchInFocus(false);
    handleOnCloseSearchResults();
    setSearchText("");
  };

  const myRef = React.createRef(null);

  return (
    <div>
      <SearchForm
        value={searchText}
        onFocus={handleOnFocusSearch}
        onChange={handleOnChangeSearch}
        onSubmit={handleOnSubmitSearch}
      />

      <BackDrop show={isSearchInFocus} zIndex="14" opacity="0.5" onClick={handleOnCloseBackdrop} />

      <CSSTransition
        in={isSearchInFocus}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="anim-display"
        nodeRef={myRef}
      >
        <div className="search-results-container" ref={myRef}>
          <SearchResultsBody
            isSearchLoading={isSearchLoading}
            searchResults={searchResults}
            onClickLink={handleOnCloseBackdrop}
          />
          <SearchResultsFooter onClickButton={handleOnCloseBackdrop} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Search;
