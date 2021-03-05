import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./SearchForm.css";
import Input from "../../../SharedUi/Input/Input";

const SearchForm = ({ value, onFocus, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <Input
        elemType="input"
        type="search"
        placeholder="Search..."
        name="search"
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        className="search-form__input"
      />
      <span className="search-form__icon" onClick={onSubmit}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </form>
  );
};

export default SearchForm;
