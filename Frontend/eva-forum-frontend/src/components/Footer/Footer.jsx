import React from 'react';
import classes from './Footer.module.css'; 
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.logo}>
          <img src="/evangadi-logo.png" alt="Evangadi Logo" /> {/* Replace with the actual path */}
          <br />
          <br />
          <div className={classes.socialLinks}>
          <FaFacebook  size={40}/>  <FaSquareInstagram size={40} /> <GrYoutube size={40} />
          </div>

          

        </div>

      

        <div className={classes.footerLinks}>
          <h3>Useful Link</h3>
          <ul>
            <li><a href="/how-it-works">How it works</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className={classes.contactInfo}>
        <h3>Contact Info</h3>
          <p>Evangadi Networks</p>
          <p><a href="mailto:support@evangadi.com">support@evangadi.com</a></p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
