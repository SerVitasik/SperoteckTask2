import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import axios from "axios";

const Registration = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;

  const { value: enteredName,
    hasError: nameInputHasError,
    enteredValueIsValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetInputName,
    touchedToTrue: nameTouchedToTrue
  } = useInput(value => value.trim() !== '');

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



  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

  }, [enteredNameIsValid, enteredEmailIsValid, enteredPasswordIsValid]);



  const formSubbmissionHandler = async (e) => {
    e.preventDefault();
    nameTouchedToTrue();
    emailTouchedToTrue();
    passwordTouchedToTrue();
    if (!enteredNameIsValid || !enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }
    try {
      await axios.post('/api/auth/registration', { username: enteredName, email: enteredEmail, password: enteredPassword }, {
        headers: { 'Content-Type': 'application/json' },

      }).then(response => console.log(response));
    } catch (error) {
      console.log(error);
    }
    resetInputName();
    resetInputEmail();
    resetInputPassword();
  };


  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
  const passwordInputClasses = passwordInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <React.Fragment>
      <h1>Registration</h1>
      <form onSubmit={formSubbmissionHandler}>
        <div className={nameInputClasses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' onBlur={nameBlurHandler} id='name' onChange={nameChangeHandler} value={enteredName} />
          {nameInputHasError && <p className="error-text">Name must not be empty</p>}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor='email'>Your email</label>
          <input type='text' onBlur={emailBlurHandler} id='email' onChange={emailChangeHandler} value={enteredEmail} />
          {emailInputHasError && <p className="error-text">Invalid email</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor='password'>Password</label>
          <input type='password' onBlur={passwordBlurHandler} id='password' onChange={passwordChangeHandler} value={enteredPassword} />
          {passwordInputHasError && <p className="error-text">The password must match the following pronunciations (minimum 8 characters, including at least one uppercase letter, one lowercase letter and one number)</p>}
        </div>
        <div className="form-actions">
          <button className="button" disabled={!formIsValid}>Sign up</button>
          <Link to="/login" Link className="button">Already have an account?</Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Registration;
