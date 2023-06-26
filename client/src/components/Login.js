import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);
  const { login } = useContext(AuthContext);

  const [enteredEmail, setEnteredEmail] = useState('');

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const [enteredPassword, setEnteredPassword] = useState('');

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };



  const formSubbmissionHandler = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEXP.test(enteredEmail) || !PASSWORD_REGEXP.test(enteredPassword)) {
      setEnteredEmailIsValid(false);
      setEnteredPasswordIsValid(false);
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
  };


  const emailInputClasses = !enteredEmailIsValid ? 'form-control invalid' : 'form-control';
  const passwordInputClasses = !enteredPasswordIsValid ? 'form-control invalid' : 'form-control';

  return (
    <React.Fragment>
      <h1>Authorization</h1>
      <form onSubmit={formSubbmissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor='email'>Your email</label>
          <input type='text' id='email' onChange={emailChangeHandler} value={enteredEmail} />
          {!enteredEmailIsValid && <p className="error-text">Incorrect email</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} />
          {!enteredPasswordIsValid && <p className="error-text">Incorrect password</p>}
        </div>
        <div className="form-actions">
          <button className="button">Sign in</button>
          <Link to="/registration" className="button">Register</Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
