import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TryForFree() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationWebUrl, setOrganizationWebUrl] = useState('');
  const [CNICImage, setCNICImage] = useState(null);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const navigate = useNavigate(); // Use react-router's navigate hook

  const handleCNICImageChange = (e) => {
    setCNICImage(e.target.files[0]);
  };

  const handleRequestTrial = async () => {
    if (!organizationName || !email || !password || !organizationWebUrl || !CNICImage) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('organization_name', organizationName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('organization_web_url', organizationWebUrl);
    formData.append('CNICImage', CNICImage);

    try {
      const response = await fetch('http://192.168.100.20:3000/api/users/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // if (result.email_verified) { // Assuming `email_verified` is returned in the response
        //   alert('Email verified! Redirecting to the download page.');
        // navigate('/download-verification-file'); // Redirect to next page
        // } else {
        //   alert('Email not verified. Please verify your email first.');
        // }
        navigate('/verify');
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Failed to send request. Please try again later.');
    }
  };

  const styles = createStyles(isDarkTheme);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <span style={styles.logo}>BLOCKCHAIN VERIFIED®</span>
        <div style={styles.navLinks}>
          <span style={styles.navItem}>Home</span>
          <span style={styles.navItem}>About</span>
          <span style={styles.navItem}>Pricing</span>
          <span style={styles.navItem}>Contact Us</span>
          <span style={styles.navItem}>Login</span>
          <span style={styles.tryForFree}>Try for free</span>
        </div>
        <input
          type="checkbox"
          checked={isDarkTheme}
          onChange={toggleTheme}
          style={styles.switch}
        />
      </div>

      <div style={styles.centeredContent}>
        <h1 style={styles.title}>Try for free!</h1>
        <p style={styles.subtitle}>
          Not convinced? Book a demo with one of our team members <br />
          to see the system in action!
        </p>

        <input
          style={styles.input}
          type="text"
          placeholder="Organization name *"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          style={styles.input}
          type="url"
          placeholder="Organization web URL *"
          value={organizationWebUrl}
          onChange={(e) => setOrganizationWebUrl(e.target.value)}
        />
        <input
          style={styles.input}
          type="file"
          accept="image/*"
          onChange={handleCNICImageChange}
        />

        <button style={styles.requestButton} onClick={handleRequestTrial}>
          Request a free trial
        </button>
      </div>
    </div>
  );
}

const createStyles = (isDarkTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Ensure the container takes the full viewport height
    justifyContent: 'center', // Center form vertically
    alignItems: 'center', // Center form horizontally
    backgroundColor: isDarkTheme ? '#001833' : '#f5f5f5',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 20px',
    backgroundColor: isDarkTheme ? '#001833' : '#fff',
    zIndex: 100, // Ensure it stays on top
  },
  logo: {
    color: isDarkTheme ? '#00eaff' : '#001833',
    fontWeight: 'bold',
    fontSize: '28px',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    color: isDarkTheme ? '#00eaff' : '#001833',
    margin: '0 10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tryForFree: {
    color: isDarkTheme ? '#00eaff' : '#001833',
    border: `1px solid ${isDarkTheme ? '#00eaff' : '#001833'}`,
    padding: '5px 10px',
    borderRadius: '5px',
  },
  centeredContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 550px',
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: isDarkTheme ? '#00eaff' : '#001833',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: isDarkTheme ? '#b0c7d9' : '#333',
    textAlign: 'center',
    marginBottom: '30px',
    lineHeight: '24px',
  },
  input: {
    width: '80%',
    height: '50px',
    border: `1px solid ${isDarkTheme ? '#00eaff' : '#001833'}`,
    borderRadius: '5px',
    padding: '0 10px',
    color: isDarkTheme ? '#00eaff' : '#001833',
    fontSize: '16px',
    marginBottom: '20px',
  },
  requestButton: {
    backgroundColor: isDarkTheme ? '#00eaff' : '#001833',
    padding: '12px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    color: isDarkTheme ? '#001833' : '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  switch: {
    marginLeft: '20px',
  },
});
