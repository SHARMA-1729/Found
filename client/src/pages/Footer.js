import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-left">
          <div className="footer-item">
            <FaMapMarkerAlt className="footer-icon" />
            <div>
              <p>Noida,Sector-68</p>
             
            </div>
          </div>

          <div className="footer-item">
            <FaPhoneAlt className="footer-icon" />
            <strong>9310175626</strong>
          </div>

          <div className="footer-item">
            <FaEnvelope className="footer-icon" />
            <a href="mailto:support@company.com">support@gmail.com</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h3>About the company</h3>
          <p>
            We are dedicated to reuniting missing children with their families using advanced technology and community support. Our mission is to create a safe and reliable platform that connects people and ensures every child finds their way home.
          </p>

          <div className="footer-socials">
           
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
