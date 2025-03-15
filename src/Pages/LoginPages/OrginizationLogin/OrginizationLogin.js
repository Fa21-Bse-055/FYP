import React, { useState, useEffect } from 'react';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import './OrginizationLogin.css'; 

function OrganizationLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    particles.forEach(particle => container.appendChild(particle));

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', email, password);
  };

  return (
    <div>
      <div className="login-container">
        <AuthNavigation />
        <div className="login-box">
          <h1>Organization Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </div>
            <button type="submit" className="login-button">
              <span>Login</span>
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
