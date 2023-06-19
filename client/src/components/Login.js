import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;

  const { login } = useContext(AuthContext);


  const { value: enteredEmail,
    hasError: emailInputHasError,
    enteredValueIsValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetInputEmail,
    touchedToTrue: emailTouchedToTrue
  } = useInput(value => EMAIL_REGEXP.test(value));

  const { value: enteredPassword,
    hasError: passwordInputHasError,
    enteredValueIsValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetInputPassword,
    touchedToTrue: passwordTouchedToTrue
  } = useInput(value => PASSWORD_REGEXP.test(value));



  const formSubbmissionHandler = async (e) => {
    e.preventDefault();
    emailTouchedToTrue();
    passwordTouchedToTrue();
    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }
    try {
      await axios.post('/api/auth/login', { email: enteredEmail, password: enteredPassword }, {
        headers: { 'Content-Type': 'application/json' },

      }).then(response => {
        login(response.data.token, response.data.userId);
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Submited");
    resetInputEmail();
    resetInputPassword();
  };


  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
  const passwordInputClasses = passwordInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <React.Fragment>
      <h1>Authorization</h1>
      <form onSubmit={formSubbmissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor='email'>Your email</label>
          <input type='text' onBlur={emailBlurHandler} id='email' onChange={emailChangeHandler} value={enteredEmail} />
          {emailInputHasError && <p className="error-text">Email must not be empty</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor='password'>Password</label>
          <input type='password' onBlur={passwordBlurHandler} id='password' onChange={passwordChangeHandler} value={enteredPassword} />
          {passwordInputHasError && <p className="error-text">Incorrect password</p>}
        </div>
        <div className="form-actions">
          <Link to="/registration" className="button">Sign up</Link>
          <button className="button">Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
