import React from "react";

import "./SearchResultsFooter.css";
import Button from "../../../SharedUi/Button/Button";

const SearchResultsFooter = ({ onClickButton }) => {
  return (
    <div className="search-results__footer">
      <Button secondary left type="button" onClick={onClickButton} className="search-results__button">
        Close
      </Button>
    </div>
  );
};

export default SearchResultsFooter;
