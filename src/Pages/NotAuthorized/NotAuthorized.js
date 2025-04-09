import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Components/context/AuthContext';
import './NotAuthorized.css';

const NotAuthorized = () => {
  const { currentUser, isAuthenticated } = useAuth();

  return (
    <div className="not-authorized-container">
      <div className="not-authorized-content">
        <div className="error-code">403</div>
        <h1>Access Denied</h1>
        <div className="error-message">
          <p>You don't have permission to access this page.</p>
          {isAuthenticated() ? (
            <p>
              Your current role ({currentUser.role}) does not have sufficient privileges.
            </p>
          ) : (
            <p>Please log in to access this resource.</p>
          )}
        </div>
        <div className="action-buttons">
          {isAuthenticated() ? (
            <>
              {currentUser.role === 'organization' && (
                <Link to="/dashboard" className="action-button">
                  Go to Dashboard
                </Link>
              )}
              {(currentUser.role === 'admin' || currentUser.role === 'super-admin') && (
                <Link to="/adminPage" className="action-button">
                  Go to Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/organizationLogin" className="action-button">
                Organization Login
              </Link>
              <Link to="/adminLogin" className="action-button">
                Admin Login
              </Link>
            </>
          )}
          <Link to="/" className="action-button home">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="cyber-grid"></div>
    </div>
  );
};

export default NotAuthorized; 