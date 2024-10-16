import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css'; 
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";
import evangadiLogo from "../../assets/evangadi-logo.png";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.logo}>
          <img src={evangadiLogo} alt="Evangadi Logo"/> {/* Replace with the actual path */}
          <br />
          <br />
          <div className={classes.socialLinks}>
            <Link to="https://www.facebook.com/evangaditech">
              <FaFacebook size={40} />
            </Link>
            <Link to="https://www.instagram.com/evangaditech/">
              <FaSquareInstagram size={40} />
            </Link>
            <Link to="https://www.youtube.com/@EvangadiTech">
              <GrYoutube size={40} />
            </Link>
          </div>
        </div>

        <div className={classes.footerLinks}>
          <h5>Useful Links</h5>
          <ul>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={classes.contactInfo}>
          <h5>Contact Info</h5>
         
          <p><Link to="mailto:support@evangadi.com">support@evangadi.com</Link></p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
