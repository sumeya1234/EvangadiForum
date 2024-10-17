import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import classes from './Signup.module.css'; 
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

function Signup({toggleForm}) {
  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

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
      toggleForm()
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
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.signupBox}`}>
        <h4>Join the Network</h4>
        <p className={classes.loginLink}>
        Already have an account?
      
          <span className={classes.highlightText} role="button" onClick={toggleForm}>Sign in</span>


        </p>
        {error && <p className={classes.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={classes.signupForm}>
          <input className={classes.input}
            ref={usernameDom}
            type="text"
            placeholder="Username"
            required
            clas
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
          <div className={classes.passwordWrapper}>
            <input
              ref={passwordDom}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              minLength="8"
            />
            <span className={classes.eyes} onClick={passwordVisibility}>
              {showPassword ? <FaEye className={classes.activeEye} size={20}/> : <FaEyeSlash size={20}/>}
            </span>
          </div>
          <p>I agree to the <a href="" style={{color:"#fb8402"}}>privacy policy</a> and <a href="" style={{color:"#fb8402"}}>terms of service.</a></p>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Agree and Join'}
          </button>
        </form>

        <p style={{color:"#fb8402"}} role="button" onClick={toggleForm} className={classes.loginLink}>
          Already have an account? 
        </p>
      </div>
    </div>
  );
}

export default Signup;
