import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthNavigation.css';

const AuthNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="auth-nav-container">
      <button className="auth-nav-button" onClick={toggleDropdown}>
        <span className="nav-text">NAVIGATE</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`chevron ${isOpen ? 'open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="auth-dropdown">
          <div className="auth-dropdown-section">
            <h3>Login Pages</h3>
            <ul>
              <li><Link to="/AdminLogin">Admin Login</Link></li>
              <li><Link to="/OrganizationLogin">Organization Login</Link></li>
              <li><Link to="/studentLogin">Student Login</Link></li>
            </ul>
          </div>
          <div className="auth-dropdown-section">
            <h3>Registration Pages</h3>
            <ul>
              <li><Link to="/AdminRegistration">Admin Registration</Link></li>
              <li><Link to="/OrganizationRegistration">Organization Registration</Link></li>
            </ul>
          </div>
          <div className="auth-dropdown-section">
            <h3>Main Site</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthNavigation; 