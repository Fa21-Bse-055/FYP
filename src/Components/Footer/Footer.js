import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <Link to="/" className="footer-logo">
            <span className="logo-icon">◈</span> <span className="tech-span">BlockSecure</span>
          </Link>
        </div>

        <div className="footer-links-container">
          <div className="footer-column">
            <h3 className="footer-heading">PRODUCT</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">SERVICES</h3>
            <ul className="footer-links">
              <li><Link to="/uploadDocument">Upload Document</Link></li>
              <li><Link to="/generateDocument">Generate Document</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">ACCOUNT</h3>
            <ul className="footer-links">
              <li><Link to="/organizationlogin">Organization Login</Link></li>
              <li><Link to="/adminLogin">Admin Login</Link></li>
              <li><Link to="/organizationRegistration">Register</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} BlockSecure. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 