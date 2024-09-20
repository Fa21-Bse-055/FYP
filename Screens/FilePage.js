import React from 'react';

export default function DownloadVerificationFile() {
  const verificationFileUrl = 'http://192.168.100.20:3000/api/users/download/';

  const styles = createStyles(true); // Assuming the dark theme is active

  return (
    <div style={styles.container}>
      <div style={styles.centeredContent}>
        <h1 style={styles.title}>Download Your Verification File</h1>
        <p style={styles.subtitle}>
          Please download and upload the verification file to your website's root directory to verify your ownership.
        </p>
        <a href={verificationFileUrl} download style={styles.downloadLink}>
          <button style={styles.downloadButton}>Download Verification File</button>
        </a>
        <p style={styles.instructions}>
          After uploading, the file should be accessible via a URL like:
          <br />
          <strong>https://www.yourwebsite.com/verification_code_12345.txt</strong>
        </p>
      </div>
    </div>
  );
}

// Styles based on the dark theme
const createStyles = (isDarkTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkTheme ? '#001833' : '#f5f5f5',
  },
  centeredContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    padding: '15px 400px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: isDarkTheme ? '#00eaff' : '#001833',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '16px',
    color: isDarkTheme ? '#b0c7d9' : '#333',
    textAlign: 'center',
    marginBottom: '30px',
  },
  downloadLink: {
    textDecoration: 'none',
  },
  downloadButton: {
    padding: '12px 20px',
    backgroundColor: isDarkTheme ? '#00eaff' : '#001833',
    color: isDarkTheme ? '#001833' : '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  instructions: {
    fontSize: '16px',
    color: isDarkTheme ? '#b0c7d9' : '#333',
    textAlign: 'center',
    marginTop: '20px',
    lineHeight: '24px',
  },
});
