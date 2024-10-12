import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { AppState } from "../../App"; 
import classes from "./Header.module.css"; 
import evangadiLogo from "../../../public/evangadi-logo.png"; 

function Header() {
  // Accessing the user state and setUser function from the AppState context
  const { user, setUser } = useContext(AppState);
  // useNavigate hook is used to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Removing the token from localStorage
    setUser(null); // Setting the user state to null to log the user out
    navigate("/login"); // Redirecting the user to the login page
  };

  return (
    <section className={classes.Wrapper}>
      <header className={classes.headerContainer}>
        {/* Logo section that links to the homepage */}
        <div className={classes.logo}>
          <Link to="/">
            <img src={evangadiLogo} alt="Evangadi" /> {/* Displaying the Evangadi logo */}
          </Link>
        </div>
        {/* Navigation links */}
        <nav className={classes.navLinks}>
          <Link to="/">Home</Link> {/* Link to the homepage */}
          <Link to="/how-it-works">How it works</Link> {/* Link to the How it works page */}
        </nav>
        {/* Authentication buttons */}
        <div className={classes.authButton}>
          {/* If user is logged in, show LOG OUT button, otherwise show SIGN IN button */}
          {user ? (
            <button onClick={handleLogout} className={classes.btnPrimary}>
              LOG OUT
            </button>
          ) : (
            <Link to="/login">
              <button className={classes.btnPrimary}>SIGN IN</button>
            </Link>
          )}
        </div>
      </header>
    </section>
  );
}

export default Header;
