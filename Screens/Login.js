import React, { useState } from 'react';

export default function LoginPage() {
  const [code, setCode] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Handle Code Input Change
  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  // Theme Toggle Function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const styles = createStyles(isDarkTheme);

  return (
    <div style={styles.container}>
      {/* Top navigation bar */}
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

      {/* Centered Login Form */}
      <div style={styles.centeredFormContainer}>
        <h1 style={styles.title}>Login</h1>
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

        {/* Code Input */}
        <div style={styles.codeContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              style={styles.codeInput}
              maxLength={1}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(e.target.value, index)}
            />
          ))}
        </div>

        {/* Login Button */}
        <button style={styles.loginButton}>Login</button>

        {/* Forgot Password Link */}
        <p style={styles.forgotPassword}>
          Forget your Password? <span style={styles.clickHere}>Click here.</span>
        </p>
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '500px', // Limit width of the form
    width: '100%',
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
  centeredFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '15px 500px',
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: isDarkTheme ? '#00eaff' : '#001833',
    marginBottom: '10px',
  },
  input: {
    width: '60%',
    height: '50px',
    border: `1px solid ${isDarkTheme ? '#00eaff' : '#001833'}`,
    borderRadius: '5px',
    padding: '0 10px',
    color: isDarkTheme ? '#00eaff' : '#001833',
    fontSize: '16px',
    marginBottom: '20px',
  },
  codeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  codeInput: {
    width: '40px',
    height: '50px',
    border: `1px solid ${isDarkTheme ? '#00eaff' : '#001833'}`,
    borderRadius: '5px',
    padding: '0 10px',
    fontSize: '16px',
    textAlign: 'center',
    margin: '0 5px',
    color: isDarkTheme ? '#00eaff' : '#001833',
  },
  loginButton: {
    backgroundColor: isDarkTheme ? '#00eaff' : '#001833',
    padding: '12px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    color: isDarkTheme ? '#001833' : '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  forgotPassword: {
    marginTop: '20px',
    color: isDarkTheme ? '#b0c7d9' : '#333',
    fontSize: '14px',
  },
  clickHere: {
    color: '#00eaff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  switch: {
    marginLeft: '20px',
  },
});
