import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, isAuthenticated, logout, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeProfile();
    navigate('/');
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

          {/* Organization-specific links */}
          {isAuthenticated() && hasRole('organization') && (
            <>
              <li className="nav-item">
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/uploadDocument" 
                  className={`nav-link ${isActive('/uploadDocument') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/generateDocument" 
                  className={`nav-link ${isActive('/generateDocument') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Generate
                </Link>
              </li>
            </>
          )}

          {/* Admin-specific links */}
          {isAuthenticated() && hasRole(['admin', 'super-admin']) && (
            <li className="nav-item">
              <Link 
                to="/adminPage" 
                className={`nav-link ${isActive('/adminPage') ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Admin Panel
              </Link>
            </li>
          )}

          {/* Super-admin-specific links */}
          {isAuthenticated() && hasRole('super-admin') && (
            <li className="nav-item">
              <Link 
                to="/adminRegistration" 
                className={`nav-link ${isActive('/adminRegistration') ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Register Admin
              </Link>
            </li>
          )}

          {/* Authentication links for non-authenticated users */}
          {!isAuthenticated() && (
            <li className="nav-item auth-links">
              <Link 
                to="/organizationLogin" 
                className={`nav-link login-link ${isActive('/organizationLogin') ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/organizationRegistration" 
                className={`nav-link register-link ${isActive('/organizationRegistration') ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Register
              </Link>
            </li>
          )}

          {/* User profile dropdown for authenticated users */}
          {isAuthenticated() && (
            <li className="nav-item profile-dropdown">
              <div 
                className="profile-toggle" 
                onClick={toggleProfile}
              >
                <FaUser className="profile-icon" />
                <span className="profile-name">
                  {currentUser.username || currentUser.organization_name || currentUser.email}
                </span>
                <FaChevronDown className={`dropdown-icon ${isProfileOpen ? 'open' : ''}`} />
              </div>
              
              {isProfileOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-info">
                    <span className="profile-role">{currentUser.role}</span>
                    <span className="profile-email">{currentUser.email}</span>
                  </div>
                  <button className="logout-button" onClick={handleLogout}>
                    <FaSignOutAlt className="logout-icon" />
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;