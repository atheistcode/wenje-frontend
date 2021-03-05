import { useContext, useState, useCallback } from "react";
import axios from "axios";

import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useSearchDb = () => {
  const appAuth = useContext(AppAuthContext);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const startSearchLoading = useCallback(() => setIsSearchLoading(true), []);
  const stopSearchLoading = useCallback(() => setIsSearchLoading(false), []);

  const searchDb = async (searchString) => {
    startSearchLoading();

    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/users/search?byName=${searchString}`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      stopSearchLoading();
      setSearchResults(res.data.data.users);
    } catch (err) {
      stopSearchLoading();
      catchErrors(err, appAuth);
    }
  };

  const handleOnChangeSearch = useCallback((e) => {
    if (e.target.value === "") {
      setSearchResults(null);
    }
    setSearchText(e.target.value);
    searchDb(e.target.value);
  }, []);

  const handleOnSubmitSearch = useCallback((e) => {
    e.preventDefault();

    if (e.target.value) {
      searchDb(e.target.value);
    }
  }, []);

  const handleOnCloseSearchResults = useCallback(() => {
    setSearchResults(null);
  }, []);

  return {
    isSearchLoading,
    searchText,
    setSearchText,
    searchResults,
    handleOnChangeSearch,
    handleOnSubmitSearch,
    handleOnCloseSearchResults,
  };
};

export default useSearchDb;
