import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import classes from "./Header.module.css";
import evangadiLogo from "../../assets/evangadi-logo.png";
import MenuIcon from "@mui/icons-material/Menu"; // You can use any icon library

function Header() {
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open state
  };

  return (
    <section className={classes.Wrapper}>
      <header className={classes.headerContainer}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={evangadiLogo} alt="Evangadi" />
          </Link>
        </div>
        <div className={classes.menuIcon} onClick={toggleMenu}>
          <MenuIcon /> {/* This is the icon for mobile screens */}
        </div>
        <nav className={`${classes.navLinks} ${menuOpen ? classes.active : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How it works</Link>
        </nav>
        <div className={classes.authButton}>
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
