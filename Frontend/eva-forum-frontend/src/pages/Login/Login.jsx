import React, { useState, useContext } from "react"; // Import necessary hooks and context
import axios from "../../axiosConfig"; // Axios instance for API calls
import { Link, useNavigate } from "react-router-dom"; // React Router for navigation
import { AppState } from "../../App"; // Import user state context
import classes from "./Login.module.css"; // CSS module for styling
import { FaEye } from "react-icons/fa"; // Icon for showing password
import { FaEyeSlash } from "react-icons/fa6"; // Icon for hiding password

function Login() {
  const navigate = useNavigate(); // Hook to handle navigation
  const { setUser } = useContext(AppState); // Get setUser function from context
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status

  // Function to toggle password visibility
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  }

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    if (!email || !password) {
      setErrorMessage("Please provide all required information");
      return;
    }

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setLoading(true); // Set loading state to true
    setErrorMessage(null); // Clear any previous error messages

    try {
      // Send login request to the server
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      // Store the token and user info in local storage and context
      localStorage.setItem("token", data.token);
      setUser({ username: data.username });
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.log(error) // Log error to the console
      setErrorMessage("Login failed."); // Set error message for failed login
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  // Function to navigate to the signup page
  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.centered_container}>
      <div className={`${classes.login_box}`}>
        <h2>Login to Your Account</h2>
        {errorMessage && <p style={{ marginBottom: "20px", color : "red"}}>{errorMessage}</p>} {/* Display error message if exists */}
        <form onSubmit={handleSubmit}> {/* Form for login */}
          <div className={`${classes.formGroup}`}>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className={classes.input}
              required // Require email input
            />
          </div>
          <div className={`${classes.formGroup}`}>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Toggle input type based on visibility
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className={classes.input}
              required // Require password input
            />
          <span className={classes.eyes} onClick={passwordVisibility}> {/* Eye icon for toggling password visibility */}
            {
              showPassword ? <FaEye className={classes.activeEye} size={20}/> : <FaEyeSlash size={20}/>
            }
          </span>
          </div>
          <Link to="/forgot-password" className={classes.forgotPasswordLink}> {/* Link to forgot password */}
            Forgot password?
          </Link>
          <button
            type="submit"
            className={`${classes.loginButton}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "LOG IN"} {/* Change button text based on loading state */}
          </button>
        </form>
        <p className={classes.register_link}>
          Don't have an account?{" "}
          <span
            className={classes.highlightText}
            role="button"
            onClick={handleCreateAccountClick} // Navigate to signup page
          >
            Create a new account
          </span>
        </p>
      </div>
      <div className={`${classes.about_box}`}>
        <h2 className={classes.about}>About</h2>
        <p>
          <span className={classes.evangadi_text}>
            Evangadi Networks <br />
          </span>
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
          onClick={handleCreateAccountClick} // Navigate to signup page
          aria-label="Create a new account"
        >
          CREATE A NEW ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default Login; 
