// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: For styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">MyWebsite</h2>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/orginizationRegistration">Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/adminPage">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
