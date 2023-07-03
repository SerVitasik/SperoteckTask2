import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {

  const { login } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
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
    try {
      await axios.post('/api/auth/login', { email: enteredEmail, password: enteredPassword }, {
        headers: { 'Content-Type': 'application/json' },

      }).then(response => {
        login(response.data.token, response.data.userId);
      });
    } catch (error) {
      setIsError(true);
    }
  };


  return (
    <React.Fragment>
      <h1>Authorization</h1>
      <form onSubmit={formSubbmissionHandler}>
        <div className="form-control">
          <label htmlFor='email'>Your email</label>
          <input type='text' id='email' onChange={emailChangeHandler} value={enteredEmail} />
        </div>
        <div className="form-control">
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} />
        </div>
        {isError && <p className="error-text">Incorrect email or password</p>}
        <div className="form-actions">
          <button className="button">Sign in</button>
          <Link to="/registration" className="button">Register</Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
