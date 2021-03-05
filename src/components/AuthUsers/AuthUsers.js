import React from "react";

import "./AuthUsers.css";
import Logo from "../SharedUi/Logo/Logo";
import Input from "../SharedUi/Input/Input";
import Button from "../SharedUi/Button/Button";
import Copyright from "../SharedUi/Copyright/Copyright";

const AuthUsers = ({ formMode, changeFormMode, inputs, onChangeInput, onSubmitForm }) => {
  return (
    <div className="auth-users">
      <Logo className="auth-users__logo" />
      <div>
        <div className="auth-users__headers">
          <h1>Wenje Social Network</h1>
          <h3>Please log in or sign up for an account</h3>
        </div>
        <form onSubmit={onSubmitForm} className="auth-users__form">
          {formMode === "FORGOT_PASSWORD" ? (
            <>
              <Input
                elemType="input"
                type="email"
                name="email"
                placeholder="Email"
                value={inputs["email"].value}
                onChange={onChangeInput}
                required={true}
              />
              <Button type="submit" primary className="auth-users__form__forgot-password-button">
                Send reset link
              </Button>
            </>
          ) : null}
          {formMode === "SIGN_UP" && (
            <Input
              elemType="input"
              type="text"
              name="name"
              placeholder="Name"
              value={inputs["name"].value}
              onChange={onChangeInput}
              required={true}
            />
          )}
          {(formMode === "SIGN_UP" || formMode === "SIGN_IN") && (
            <>
              <Input
                elemType="input"
                type="email"
                name="email"
                placeholder="Email"
                value={inputs["email"].value}
                onChange={onChangeInput}
                required={true}
              />
              <Input
                elemType="input"
                type="password"
                name="password"
                placeholder="Password"
                value={inputs["password"].value}
                onChange={onChangeInput}
                required={true}
              />
            </>
          )}
          {formMode === "SIGN_UP" && (
            <Input
              elemType="input"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={inputs["passwordConfirm"].value}
              onChange={onChangeInput}
              required={true}
            />
          )}
          {/* {formMode !== "FORGOT_PASSWORD" && (
            <span className="auth-users__form__forgot-password" onClick={changeFormMode("FORGOT_PASSWORD")}>
              Forgot Password
            </span>
          )} */}
          <div className="auth-users__form__buttons-container">
            <Button
              type={formMode === "SIGN_IN" ? "submit" : "button"}
              primary
              onClick={formMode === "SIGN_IN" ? null : changeFormMode("SIGN_IN")}
            >
              Sign In
            </Button>
            <Button
              type={formMode === "SIGN_UP" ? "submit" : "button"}
              secondary
              onClick={formMode === "SIGN_UP" ? null : changeFormMode("SIGN_UP")}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
      <Copyright />
    </div>
  );
};

export default AuthUsers;
