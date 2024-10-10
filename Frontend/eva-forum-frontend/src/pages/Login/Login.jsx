import React, { useState, useContext } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import classes from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide all required information");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser({ username: data.username });
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAccountClick = () => {
    navigate("/register");
  };

  return (
    <div className={classes.centered_container}>
      <div className={`${classes.login_box}`}>
        <h2>Login to Your Account</h2>
        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className={`${classes.formGroup}`}>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
              required
            />
          </div>
          <div className={`${classes.formGroup}`}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
              required
            />
          </div>
          <Link to="/forgot-password" className={classes.forgotPasswordLink}>
            Forgot password?
          </Link>
          <button
            type="submit"
            className={`${classes.loginButton}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        <p className={classes.register_link}>
          Don't have an account?{" "}
          <span
            className={classes.highlightText}
            role="button"
            onClick={handleCreateAccountClick}
          >
            Create a new account
          </span>
        </p>
      </div>
      <div className={`${classes.about_box}`}>
        <h3 className={classes.about}>About</h3>
        <p>
          <span className={classes.evangadi_text}>
            Evangadi Networks <br />
          </span>
          <br />
          No matter what stage of life you are in, whether you’re just starting
          elementary school <br />
          or being promoted to CEO of a Fortune 500 company, you have much to
          offer to those <br />
          who are trying to follow in your footsteps.
        </p>
        <br />
        <p>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors <br /> of your own, please start by joining
          the network here.
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

export default Login;
