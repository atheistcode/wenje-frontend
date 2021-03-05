import React from "react";

import "./AuthPage.css";
import Welcome from "../components/Welcome/Welcome";
import AuthUsers from "../components/AuthUsers/AuthUsers";

import useFormData from "../hooks/useFormData";

const AuthPage = () => {
  const { formMode, handleChangeFormMode, inputs, handleOnChangeInput, handleOnSubmitForm } = useFormData();

  return (
    <div className="auth-page">
      <div>
        <Welcome />
      </div>
      <div>
        <AuthUsers
          formMode={formMode}
          changeFormMode={handleChangeFormMode}
          inputs={inputs}
          onChangeInput={handleOnChangeInput}
          onSubmitForm={handleOnSubmitForm}
        />
      </div>
    </div>
  );
};

export default AuthPage;
