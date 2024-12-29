import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpenLogin, setDropdownOpenLogin] = useState(false);
  const [dropdownOpenRegistration, setDropdownOpenRegistration] = useState(false);

  const loginDropdownRef = useRef(null);
  const registrationDropdownRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (
      loginDropdownRef.current &&
      !loginDropdownRef.current.contains(event.target)
    ) {
      setDropdownOpenLogin(false);
    }

    if (
      registrationDropdownRef.current &&
      !registrationDropdownRef.current.contains(event.target)
    ) {
      setDropdownOpenRegistration(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <div className="nav-logo">
        <img src="CompLogo.png" alt="Company Logo" />
      </div>
        <h2 className="navbar-logo">
          <Link to="/" className="logo-link">BlockSecure</Link>
        </h2>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/adminPage">Admin</Link></li>

          {/* Login Dropdown */}
          <li
            className="dropdown-parent"
            ref={loginDropdownRef}
            onClick={() => setDropdownOpenLogin(!dropdownOpenLogin)}
          >
            <a href="#">Login</a>
            {dropdownOpenLogin && (
              <ul className="dropdown">
                <li><Link to="/organizationLogin">Organization Login</Link></li>
                <li><Link to="/adminLogin">Admin Login</Link></li>
              </ul>
            )}
          </li>

          {/* Registration Dropdown */}
          <li
            className="dropdown-parent"
            ref={registrationDropdownRef}
            onClick={() => setDropdownOpenRegistration(!dropdownOpenRegistration)}
          >
            <a href="#">Registration</a>
            {dropdownOpenRegistration && (
              <ul className="dropdown">
                <li><Link to="/organizationRegistration">Organization Registration</Link></li>
                <li><Link to="/studentRegistration">Student Registration</Link></li>
                <li><Link to="/adminRegistration">Admin Registration</Link></li>
              </ul>
            )}
          </li>
          <li><a href="/generateDocument">Generate Document</a></li>
          <li><a href="/uploadDocument">Upload Document</a></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;