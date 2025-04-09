import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Components/context/AuthContext';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import './OrginizationLogin.css'; 

function OrganizationLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    type: null, // 'verification' or 'approval'
    message: ''
  });
  const { login, isAuthenticated, hasRole } = useAuth();

  // Add animation for particles
  useEffect(() => {
    const particles = Array.from({ length: 20 }).map((_, i) => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      return particle;
    });

    const container = document.querySelector('.login-container');
    if (container) {
      particles.forEach(particle => container.appendChild(particle));

      return () => {
        particles.forEach(particle => {
          if (particle.parentNode === container) {
            container.removeChild(particle);
          }
        });
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatusMessage({ type: null, message: '' });
    setLoading(true);

    try {
      // Use the auth context login directly
      const result = await login(email, password, 'organization');
      
      if (!result.success) {
        // Handle different error types based on the error message
        if (result.error.includes('not verified')) {
          setStatusMessage({
            type: 'verification',
            message: result.error
          });
        } else if (result.error.includes('pending admin approval')) {
          setStatusMessage({
            type: 'approval',
            message: result.error
          });
        } else {
          setError(result.error || 'Login failed. Please check your credentials.');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already authenticated as organization
  if (isAuthenticated() && hasRole('organization')) {
    return <Navigate to="/dashboard" />;
  }

  // Render status messages if needed
  if (statusMessage.type === 'verification') {
    return (
      <div>
        <div className="login-container">
          <AuthNavigation />
          <div className="status-message verification">
            <div className="status-icon">!</div>
            <h2>Email Verification Required</h2>
            <p>{statusMessage.message}</p>
            <p>Please check your email inbox and click the verification link to complete your registration.</p>
            <div className="action-links">
              <button onClick={() => setStatusMessage({ type: null, message: '' })} className="back-button">
                Back to Login
              </button>
              <Link to="/organizationRegistration" className="register-link">
                Register Again
              </Link>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  if (statusMessage.type === 'approval') {
    return (
      <div>
        <div className="login-container">
          <AuthNavigation />
          <div className="status-message approval">
            <div className="status-icon">⏳</div>
            <h2>Approval Pending</h2>
            <p>{statusMessage.message}</p>
            <p>Your organization has been registered but is waiting for administrator approval. Please check back later.</p>
            <div className="action-links">
              <button onClick={() => setStatusMessage({ type: null, message: '' })} className="back-button">
                Back to Login
              </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div>
      <div className="login-container">
        <AuthNavigation />
        <div className="login-box">
          <h1>Organization Login</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              <span>{loading ? 'Logging in...' : 'Login'}</span>
            </button>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OrganizationLogin;
