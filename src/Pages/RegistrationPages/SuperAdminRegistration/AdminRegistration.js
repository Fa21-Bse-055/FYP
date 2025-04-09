import React, { useState, useEffect } from 'react';
import './AdminRegistration.css';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Components/context/AuthContext';

const AdminRegistration = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { currentUser, hasRole } = useAuth();
  const navigate = useNavigate();

  // Check if user is super admin
  useEffect(() => {
    if (currentUser && !hasRole('super-admin')) {
      navigate('/not-authorized');
    }
  }, [currentUser, hasRole, navigate]);

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

    const container = document.querySelector('.login-container1');
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
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = {
      username: userName,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Admin registered successfully!');
        // Reset form
        setUserName('');
        setEmail('');
        setPassword('');
      } else {
        setError(result.msg || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error registering admin:', error);
      setError('Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated or not super admin, redirect
  if (!currentUser) {
    return <Navigate to="/adminLogin" />;
  }

  return (
    <div>
      <div className="login-container1">
        <AuthNavigation />
        {/* Left Section */}
        <div className="left-section1">
          <h1>Welcome to the Admin Registration</h1>
          <p>
            Register new administrators to help manage the document verification platform. Only super administrators can create new admin accounts.
          </p>
          <div className="quote img">
            <img
              src="/admin-registration.jpg"
              alt="Admin Registration"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=Admin+Registration";
              }}
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="right-section1">
          <form className="login-box1" onSubmit={handleSubmit}>
            <h1>Admin Registration</h1>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <div className="space">
              <label htmlFor="name">Username:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter username..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                <span>{loading ? 'Registering...' : 'Register Admin'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRegistration;
