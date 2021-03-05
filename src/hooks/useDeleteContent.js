import { useContext } from "react";
import axios from "axios";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useDeleteContent = (contentType) => {
  const appUi = useContext(AppUiContext);
  const appAuth = useContext(AppAuthContext);

  const deleteContent = async (contentId, postId) => {
    appUi.startLoading();

    const confirmDelete = window.confirm("Are you sure you want to delete this?");

    if (confirmDelete !== true) {
      appUi.stopLoading();
      return false;
    }

    if (contentType.toLowerCase() === "post") {
      try {
        await axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_API_URL}/posts/${contentId}`,
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });
      } catch (err) {
        appUi.stopLoading();
        catchErrors(err, appAuth);
      }
    }

    if (contentType.toLowerCase() === "comment") {
      try {
        await axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${contentId}`,
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });
      } catch (err) {
        appUi.stopLoading();
        catchErrors(err, appAuth);
      }
    }
  };

  return { deleteContent };
};

export default useDeleteContent;
