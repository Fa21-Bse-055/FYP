import React, { useState, useEffect } from 'react';
import './OrganizationRegistration.css';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import { Navigate } from 'react-router-dom';

const OrganizationRegistration = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationWebUrl, setOrganizationWebUrl] = useState('');
  const [CNICImage, setCNICImage] = useState(null);
  const [sucessRegistration, setSucessRegistration] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("organization_name", organizationName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organization_web_url", organizationWebUrl);
    formData.append("CNICImage", CNICImage);  

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        body: formData,
        // credentials: 'include',  // To include cookies if needed for CORS requests
      });

      const result = await response.json();
      if (response.ok) {
        console.log("sucess");
        setSucessRegistration(true);
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if(sucessRegistration){
    return <Navigate to='/OrganizationLogin'/>;
  }

  return (
    <div>
      <div className="login-container">
        <AuthNavigation />
        <div className="left-section">
          <h1>Welcome to Organization Registration</h1>
          <p>
            Join our secure blockchain-based document verification platform. Our registration process is quick and easy, taking no more than 10 minutes to complete.
          </p>
          <div className="quote img">
            <img
              src="org1.jpeg"
              alt="Organization Registration"
            />
          </div>
        </div>
        <div className="right-section">
          <form className="login-box" onSubmit={handleSubmit}>
            <h1>Organization Registration</h1>
            <div className="space">
              <label htmlFor="name">Organization Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Organization name..."
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />
            </div>
            <div className="space">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space">
              <label htmlFor="domain">Domain Name:</label>
              <input
                type="text"
                id="domain"
                name="domain"
                placeholder="Enter Domain name..."
                value={organizationWebUrl}
                onChange={(e) => setOrganizationWebUrl(e.target.value)}
                required
              />
            </div>
            <div className="space">
              <label htmlFor="CNICImage">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setCNICImage(e.target.files[0])}
                required
              />
            </div>
            <div>
              <button type="submit">
                <span>Register Organization</span>
              </button>
            </div>
          </form>
        </div>  
      </div>
      <Footer/>
    </div>
  );
};

export default OrganizationRegistration;
