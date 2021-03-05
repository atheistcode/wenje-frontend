import { useContext, useState } from "react";
import axios from "axios";

import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useApiUser = () => {
  const appAuth = useContext(AppAuthContext);

  const [fetchedUser, setFetchedUser] = useState(null);
  const [people, setPeople] = useState([]);

  const fetchUser = async (userId) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/users/${userId}`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      setFetchedUser(response.data.data.userData);
    } catch (err) {
      catchErrors(err, appAuth);
    }
  };

  const findPeople = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/users/findpeople`,
        headers: {
          Authorization: `Bearer ${appAuth.token}`,
        },
      });

      setPeople(response.data.data.whoToFollow);
    } catch (err) {
      catchErrors(err, appAuth);
    }
  };

  return { fetchedUser, fetchUser, people, findPeople };
};

export default useApiUser;
