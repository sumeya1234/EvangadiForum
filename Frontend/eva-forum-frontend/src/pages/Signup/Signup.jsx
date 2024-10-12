import React, { useRef, useState } from 'react'; // Import React and hooks
import { useNavigate, Link } from 'react-router-dom'; // React Router for navigation
import axios from '../../axiosConfig'; // Axios instance for API calls
import classes from './Signup.module.css'; // CSS module for styling

function Signup() {
  const navigate = useNavigate(); // Hook for navigation
  // Create refs for form inputs
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  // State for loading status and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous error messages
    setLoading(true); // Set loading state

    // Get values from refs
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    // Validate required fields
    if (!usernameValue || !firstValue || !lastnameValue || !emailValue || !passValue) {
      setError('Please provide all required information');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    // Validate password length
    if (passValue.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      // Send registration request to the server
      await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue,
      });
      alert('Registration was successful. Please login.'); // Alert user on success
      navigate('/login'); // Redirect to login page
    } catch (error) {
      // Handle errors from the server
      setError(error?.response?.data?.msg || 'Something went wrong, please try again.');
      console.log(error?.response?.data); // Log error details for debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Navigate to signup page (not used here, but kept for structure)
  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  // Navigate to login page
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
        {error && <p className={classes.errorMessage}>{error}</p>} {/* Display error message if exists */}

        <form onSubmit={handleSubmit} className={classes.signupForm}>
          <input
            ref={usernameDom} // Reference for username input
            type="text"
            placeholder="Username"
            required // Make input required
          />
          <div className={classes.inputWrapper}>
              <input
              ref={firstnameDom} // Reference for first name input
              type="text"
              placeholder="First Name"
              required // Make input required
            />
            <input
              ref={lastnameDom} // Reference for last name input
              type="text"
              placeholder="Last Name"
              required // Make input required
            />
          </div>
          <input
            ref={emailDom} // Reference for email input
            type="email"
            placeholder="Email"
            required // Make input required
          />
          <input
            ref={passwordDom} // Reference for password input
            type="password"
            placeholder="Password"
            required // Make input required
            minLength="8" // Minimum length for password
          />
          {/* Agreement to terms and privacy policy */}
          <p>I agree to the <a href="" style={{color:"#fb8402"}}>privacy policy </a>and <a href="" style={{color:"#fb8402"}}>terms of service.</a></p>
          <button type="submit" disabled={loading}> {/* Disable button while loading */}
            {loading ? 'Registering...' : 'Agree and Join'} {/* Change button text based on loading state */}
          </button>
        </form>

        <p style={{color:"#fb8402"}} role="button" onClick={handleLogin} className={classes.loginLink}>
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
          onClick={handleCreateAccountClick} // Navigate to create account
          aria-label="Create a new account"
        >
          CREATE A NEW ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default Signup; // Export the Signup component
