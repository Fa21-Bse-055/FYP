import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: For styling

// const Navbar = () => {

  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const handleMouseEnter = () => {
  //   setDropdownOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setDropdownOpen(false);
  // };
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <h2 className="navbar-logo">MyWebsite</h2>
//         <ul className="navbar-links">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/orginizationRegistration">Registration</Link></li>
{/* <li
          className="dropdown-parent"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a href="#">Registration</a>
          {dropdownOpen && (
            <ul className="dropdown">
              <li><a href="/admin-registration">Admin Registration</a></li>
              <li><a href="/org-registration">Organization Registration</a></li>
              <li><a href="/user-registration">User Registration</a></li>
            </ul>
          )} */}
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//           <li><Link to="/adminPage">Admin</Link></li>
//           <li><Link to="/adminRegistration">Admin Registration</Link></li>
//           <li><Link to="/adminLogin">Admin Login</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">MyWebsite</h2>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>        
          <li><Link to="/adminPage">Admin</Link></li>

          <li
            className="dropdown-parent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#">Login</a>
            {dropdownOpen && (
              <ul className="dropdown">
                <li><Link to="/organizationLogin">Organization Login</Link></li>
                <li><Link to="/adminLogin">Admin Login</Link></li>
              </ul>
            )}</li>

          <li
            className="dropdown-parent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#">Registration</a>
            {dropdownOpen && (
              <ul className="dropdown">
                <li><Link to="/organizationRegistration">Organization Registration</Link></li>
                <li><Link to="/studentRegistration">Student Registration</Link></li>
                <li><Link to="/adminRegistration">Admin Registration</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

