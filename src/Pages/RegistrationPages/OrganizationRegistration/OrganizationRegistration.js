import React, { useState, useEffect } from 'react';
import './OrganizationRegistration.css';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import { Link } from 'react-router-dom';

/**
 * OrganizationRegistration Component
 * 
 * VERIFICATION SETTINGS:
 * 
 * This component currently uses verification bypass to allow direct login without 
 * requiring email verification or admin approval.
 * 
 * To switch between verification modes:
 * 
 * 1. For BYPASS (direct login after registration):
 *    - Keep the line `formData.append("bypass_verification", "true")` (currently active)
 *    - Keep the auto-login code block active
 *    - Keep the original verification code commented
 * 
 * 2. For FULL VERIFICATION (email verification + admin approval):
 *    - Comment out the line `formData.append("bypass_verification", "true")`
 *    - Comment out the auto-login code block
 *    - Uncomment the ORIGINAL VERIFICATION CODE section
 * 
 * The relevant code can be found in the handleSubmit function below.
 */

const OrganizationRegistration = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationWebUrl, setOrganizationWebUrl] = useState("");
  const [CNICImage, setCNICImage] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    message: '',
    error: false
  });
  const [loading, setLoading] = useState(false);

  // Add animation for particles
  useEffect(() => {
    const particles = Array.from({ length: 20 }).map((_, i) => {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      return particle;
    });

    const container = document.querySelector(".login-container");
    particles.forEach((particle) => container.appendChild(particle));

    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationStatus({
      success: false,
      message: '',
      error: false
    });

    const formData = new FormData();
    formData.append("organization_name", organizationName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organization_web_url", organizationWebUrl);
    if (CNICImage) {
      formData.append("CNICImage", CNICImage);
    }

    try {
      // CURRENTLY USING BYPASS VERIFICATION - This skips both email verification and admin approval
      // formData.append("bypass_verification", "true");
      
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        // try {
        //   // Auto-login after successful registration (part of bypass)
        //   const loginResponse = await fetch('http://localhost:3000/api/users/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ 
        //       email: email, 
        //       password: password 
        //     }),
        //     credentials: 'include'
        //   });
          
        //   if (loginResponse.ok) {
        //     window.location.href = '/dashboard';
        //   } else {
        //     setRegistrationStatus({
        //       success: true,
        //       message: 'Registration successful! Auto-login failed. Please log in manually.',
        //       error: false
        //     });
        //   }
        // } catch (loginError) {
        //   console.error('Auto-login error:', loginError);
        //   setRegistrationStatus({
        //     success: true,
        //     message: 'Registration successful! You can now log in with your credentials.',
        //     error: false
        //   });
        // }

        //  ORIGINAL VERIFICATION CODE - Uncomment to enable email verification and admin approval
        setRegistrationStatus({
          success: true,
          message: 'Registration successful! Please check your email to verify your account.',
          error: false
        });
        // Reset form
        setOrganizationName('');
        setEmail('');
        setPassword('');
        setOrganizationWebUrl('');
        setCNICImage(null);
        

        
      } else {
        setRegistrationStatus({
          success: false,
          message: result.msg || 'Registration failed. Please try again.',
          error: true
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationStatus({
        success: false,
        message: 'An error occurred during registration. Please try again later.',
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="login-container">
        <AuthNavigation />
        <div className="left-section">
          <h1>Welcome to Organization Registration</h1>
          <p>
            Join our secure blockchain-based document verification platform. Our
            registration process is quick and easy, taking no more than 10
            minutes to complete.
          </p>
          <div className="quote img">
            <img src="org1.jpeg" alt="Organization Registration" />
          </div>
        </div>
        <div className="right-section">
          {registrationStatus.success ? (
            <div className="verification-message">
              <div className="success-icon">✓</div>
              <h2>Registration Submitted!</h2>
              <p>{registrationStatus.message}</p>
              <p>After email verification, your registration will be reviewed by an administrator.</p>
              {/* <p className="verification-note">
                <small>
                  Note: Verification bypass is currently enabled. 
                  To switch to full verification process (email verification + admin approval), 
                  edit OrganizationRegistration.js and follow the commented instructions.
                </small>
              </p> */}
              <div className="action-links">
                <Link to="/organizationLogin" className="login-link">Go to Login</Link>
              </div>
            </div>
          ) : (
            <form className="login-box" onSubmit={handleSubmit}>
              <h1>Organization Registration</h1>
              
              {registrationStatus.error && (
                <div className="error-message">
                  {registrationStatus.message}
                </div>
              )}
              
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
                />
              </div>
              <div>
                <button type="submit" disabled={loading}>
                  <span>{loading ? 'Registering...' : 'Register Organization'}</span>
                </button>
              </div>
            </form>
          )}
        </div>  
      </div>
      <Footer />
    </div>
  );
};

export default OrganizationRegistration;
