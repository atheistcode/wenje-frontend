import { useContext, useState, useReducer, useCallback } from "react";
import axios from "axios";

import AppUiContext from "../context/appUiContext";
import AppAuthContext from "../context/appAuthContext";
import { reducer, initialState } from "../reducers/inputsReducer";
import formValidation from "../utils/formValidation";
import catchErrors from "../utils/catchErrors";

// TODO: implement forgot password
const useFormData = () => {
  const appUi = useContext(AppUiContext);
  const appAuth = useContext(AppAuthContext);

  const [formMode, setFormMode] = useState("SIGN_IN");
  const [inputs, dispatch] = useReducer(reducer, initialState);

  const handleOnChangeInput = useCallback((e) => {
    dispatch({
      type: "INPUT_CHANGE",
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const handleOnUploadImage = useCallback(
    async (e) => {
      appUi.startLoading();

      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);

      try {
        await axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_API_URL}/users/uploadimage`,
          data: formData,
          headers: {
            Authorization: `Bearer ${appAuth.token}`,
          },
        });

        appUi.stopLoading();
        window.alert(
          `Your profile image has been successfully updated.\nPlease click on View Profile if you can't view all your updates.`
        );
      } catch (err) {
        appUi.stopLoading();
        catchErrors(err, appAuth);
      }
    },
    [appAuth] // eslint-disable-line
  );

  const handleOnSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = formValidation(inputs);

      dispatch({
        type: "VALIDATE_FORM",
        validationErrors: validationErrors,
      });

      const isFormValid = Object.values(validationErrors).every((validationError) => {
        return validationError === "";
      });

      if (!isFormValid) {
        let errorMessage = "Validation Errors:\n";
        Object.values(validationErrors).map((el) => (errorMessage += `${el} \n`));
        window.alert(errorMessage);
        return;
      }

      appUi.startLoading();

      if (formMode === "SIGN_UP")
        try {
          const res = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/signup`,
            data: {
              name: inputs.name.value,
              email: inputs.email.value,
              password: inputs.password.value,
            },
          });

          appUi.stopLoading();
          appAuth.login(res.data.data.user.userData, res.data.data.user.token);
        } catch (err) {
          appUi.stopLoading();
          catchErrors(err, appAuth);
        }

      if (formMode === "SIGN_IN")
        try {
          const res = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/signin`,
            data: {
              email: inputs.email.value,
              password: inputs.password.value,
            },
            headers: {
              Authorization: `Bearer ${appAuth.token}`,
            },
          });

          appUi.stopLoading();
          appAuth.login(res.data.data.user.userData, res.data.data.user.token);
        } catch (err) {
          appUi.stopLoading();
          catchErrors(err, appAuth);
        }

      if (formMode === "EDIT_PROFILE") {
        const dataBody = {};
        Object.keys(inputs).forEach((inputName) => {
          if (inputs[inputName].value !== "" && inputs[inputName].validationError === "") {
            dataBody[inputName] = inputs[inputName].value;
          }
        });

        try {
          await axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}/users/update`,
            data: dataBody,
            headers: {
              Authorization: `Bearer ${appAuth.token}`,
            },
          });

          appUi.stopLoading();
          window.alert(
            `Your profile has been successfully updated.
            \nFields updated: ${Object.keys(dataBody).join(", ")}.
            \nPlease Click View Profile to see your updates.`
          );
        } catch (err) {
          appUi.stopLoading();
          catchErrors(err, appAuth);
        }
      }
    },
    [formMode, appAuth, inputs] // eslint-disable-line
  );

  const handleClearInputs = useCallback((e) => {
    dispatch({
      type: "CLEAR_INPUTS",
    });
  }, []);

  const handleChangeFormMode = useCallback(
    (mode) => (e) => {
      if (e) e.preventDefault();

      setFormMode(mode);

      handleClearInputs();
    },
    [handleClearInputs]
  );
  // const handleChangeFormMode = useCallback(
  //   (mode) => {
  //     setFormMode(mode);

  //     handleClearInputs();
  //   },
  //   [handleClearInputs]
  // );

  return {
    formMode,
    handleChangeFormMode,
    inputs,
    handleOnChangeInput,
    handleOnUploadImage,
    handleOnSubmitForm,
    handleClearInputs,
  };
};

export default useFormData;
