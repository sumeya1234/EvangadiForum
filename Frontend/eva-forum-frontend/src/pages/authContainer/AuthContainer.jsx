import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import classes from './auth.module.css'; // Common styles for both pages

function AuthContainer({ initialForm }) {
  const [showLogin, setShowLogin] = useState(initialForm === 'login');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Navigate based on the initial form
    if (showLogin) {
      navigate('/login');
    } else {
      navigate('/signup');
    }
  }, [showLogin, navigate]);

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.formBox} ${showLogin ? classes.slideIn : classes.slideOut}`}>
        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Signup toggleForm={toggleForm} />
        )}
      </div>

      <div className={classes.aboutBox}>
        <h6 className={classes.about}>About</h6>
        <p>
          <span className={classes.evanga}>Evanga</span>
          <span className={classes.di_network}>di Networks</span>
          <br />
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your footsteps.
        </p>
        <br />
        <p>
          Whether you are willing to share your knowledge or you are just looking to meet mentors of your own,
          please start by joining the network here.
        </p>
        <button
          className={classes.createAccountButton}
          onClick={toggleForm}
          aria-label="Create a new account"
        >
          {showLogin ? 'CREATE A NEW ACCOUNT' : 'SIGN IN'}
        </button>
      </div>
    </div>
  );
}

export default AuthContainer;
