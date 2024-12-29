import React from 'react';
import './Footer.css'; // Updated styles
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="CompLogo.png" alt="Company Logo" />
      </div>
      <div className="footer-text">
        <p>Start today with safely securing and verifying your documents.</p>
        <Link to="/organizationRegistration">
          <button className="footer-button">Register Now</button>
        </Link>
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><Link to="/about">About</Link></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/generateDocument">Generate Document</a></li>
          <li><a href="/uploadDocument">Upload Document</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
