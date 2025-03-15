import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <div className="logo-cube"></div>
          </div>
          <span className="logo-text">BlockSecure</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/uploadDocument" 
              className={`nav-link ${isActive('/upload') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/generateDocument" 
              className={`nav-link ${isActive('/generate') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Generate
            </Link>
          </li>
          <li className="nav-item auth-links">
            <Link 
              to="/organizationLogin" 
              className={`nav-link login-link ${isActive('/login') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link 
              to="/organizationRegistration" 
              className={`nav-link register-link ${isActive('/register') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Register
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;