import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import classes from './Signup.module.css'; 

function Signup() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!usernameValue || !firstValue || !lastnameValue || !emailValue || !passValue) {
      setError('Please provide all required information');
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (passValue.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue,
      });
      alert('Registration was successful. Please login.');
      navigate('/login');
    } catch (error) {
      setError(error?.response?.data?.msg || 'Something went wrong, please try again.');
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  }
  return (
    <div className={classes.container}>
      <div className={`${classes.signupBox} p-4 border rounded`}>
        <h4>Join the Network</h4>
        <p className={classes.loginLink}>
          Already have an account? <span role="button" onClick={handleLogin}>Sign in</span>
        </p>
        {error && <p className={classes.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={classes.signupForm}>
          <input
            ref={usernameDom}
            type="text"
            placeholder="Username"
            required
          />
          <div className={classes.inputWrapper}>
              <input
              ref={firstnameDom}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              ref={lastnameDom}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            ref={emailDom}
            type="email"
            placeholder="Email"
            required
          />
          <input
            ref={passwordDom}
            type="password"
            placeholder="Password"
            required
            minLength="8"
          />
          <p>I agree to the <a href="" style={{color:"#fb8402"}}>privacy policy </a>and <a href="" style={{color:"#fb8402"}}>terms of service.</a></p>
          <button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Registering...' : 'Agree and Join'}
          </button>
        </form>

        <p style={{color:"#fb8402"} } role="button" onClick={handleCreateAccountClick} className={classes.loginLink}>
          Already have an account? 
        </p>
      </div>
      <div className={`${classes.aboutBox} p-4`}>
        <h6 className={classes.about}>About</h6>
        <p>
        <span className={classes.evanga}>Evanga</span>
     <span className={classes.di_network}>di Networks</span>

          <br />
          No matter what stage of life you are in, whether you’re just starting
          elementary school 
          or being promoted to CEO of a Fortune 500 company, you have much to
          offer to those 
          who are trying to follow in your footsteps.
        </p>
        <br />
        <p>Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
        </p>
        <button
          className={classes.createAccountButton}
          onClick={handleCreateAccountClick}
          aria-label="Create a new account"
        >
          CREATE A NEW ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default Signup;