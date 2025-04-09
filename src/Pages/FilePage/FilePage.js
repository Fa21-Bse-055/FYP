import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./FilePage.css";

export default function DownloadVerificationFile() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Update with the actual URL where your verification file is located.
  const verificationFileUrl = 'http://localhost:3000/api/users/download';
  
  async function downloadFile() {
    setDownloading(true);
    setError(null);
    
    try {
      const response = await fetch(verificationFileUrl, {
        credentials: 'include'
      });
      
      if (response.ok) {
        window.location.href = verificationFileUrl;
        setSuccess(true);
      } else {
        setError(`Error: File not found (Status ${response.status})`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="file-page-container">
      <div className="file-page-content">
        <div className="file-icon">
          <span>📄</span>
        </div>
        
        <h1>Download Verification File</h1>
        
        <p className="description">
          Please download and upload the verification file to your website's root directory to verify your ownership.
        </p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {success ? (
          <div className="success-message">
            <p>File download initiated successfully!</p>
            <p>If the download didn't start automatically, click the button below to try again.</p>
          </div>
        ) : (
          <button 
            className="download-button" 
            onClick={downloadFile} 
            disabled={downloading}
          >
            {downloading ? 'Downloading...' : 'Download Verification File'}
          </button>
        )}
        
        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Download the verification file</li>
            <li>Upload it to your website's root directory</li>
            <li>The file should be accessible at: <code>https://www.yourwebsite.com/verification_code_12345.txt</code></li>
            <li>Once uploaded, our system will verify your website ownership</li>
          </ol>
        </div>
        
        <div className="action-links">
          <Link to="/dashboard" className="action-link">
            Return to Dashboard
          </Link>
        </div>
      </div>
      <div className="cyber-grid"></div>
    </div>
  );
}