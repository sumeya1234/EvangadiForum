import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import classes from "./Header.module.css";
import evangadiLogo from "../../../public/evangadi-logo.png";

function Header() {
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <section className={classes.Wrapper}>
    <header className={classes.headerContainer}>
      <div className={classes.logo}>
        <Link to="/">
          <img src={evangadiLogo} alt="Evangadi" />
        </Link>
      </div>
      <nav className={classes.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/how-it-works">How it works</Link> {/* This link points to Features */}
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
