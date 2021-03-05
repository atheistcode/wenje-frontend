import { useContext, useState } from "react";
import axios from "axios";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import catchErrors from "../utils/catchErrors";

const useAddContent = (contentType, postId) => {
  const appUi = useContext(AppUiContext);
  const appAuth = useContext(AppAuthContext);

  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const fileReader = new FileReader();

  const handleOnChangeContent = (e) => {
    setTextContent(e.target.value);
  };

  const handleOnSelectImage = (e) => {
    setFile(e.target.files[0]);

    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.onerror = () => window.alert(fileReader.error);
  };

  const handleOnSubmitForm = async (e) => {
    e.preventDefault();

    if (textContent === "" && !file) {
      window.alert("Cannot add empty content. Please write something.");
      return false;
    }
    if (contentType === "comment" && textContent.length > 250) {
      window.alert("Maximum length is 250 characters.");
      return false;
    }
    if (contentType === "post" && textContent.length > 500) {
      window.alert("Maximum length is 500 characters.");
      return false;
    }

    const formData = new FormData();
    formData.append("content", textContent);
    formData.append("image", file);

    try {
      appUi.startLoading();

      if (contentType.toLowerCase() === "comment") {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
          data: {
            content: textContent,
          },
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });
      }

      if (contentType.toLowerCase() === "post") {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/posts`,
          data: formData,
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });
      }

      setTextContent("");
      setPreviewUrl();
      setFile();
    } catch (err) {
      appUi.stopLoading();
      catchErrors(err, appAuth);
    }
  };

  return { textContent, handleOnChangeContent, previewUrl, handleOnSelectImage, handleOnSubmitForm };
};

export default useAddContent;
