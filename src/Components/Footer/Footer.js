import React from 'react';
import './Footer.css'; // Import specific styles for the footer
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="favicon.ico" alt="Our Company Logo" />
      </div>
      <div className="footer-text">
        <p>Start today with safely securing and verifying your documents</p>
        <Link to="/try-for-free"><button className="footer-button">Register Now</button></Link>
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><Link to="/about">About</Link></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/cookie-policy">Cookie Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
