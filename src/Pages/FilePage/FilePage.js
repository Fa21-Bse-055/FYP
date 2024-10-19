import React from 'react';
import "./FilePage.css";

export default function DownloadVerificationFile() {
  // Update with the actual URL where your verification file is located.
  const verificationFileUrl = 'http://192.168.100.8:3000/api/users/download';
  async function downloadFile(){
    try{
      const res = await fetch(verificationFileUrl)
    }
    catch(error){
    console.log(error.message);
    }
  }
  return (
    <div className="file-page-container">
      <div className="centered-content">
        <h1 className="title">Download Your Verification File</h1>
        <p className="subtitle">
          Please download and upload the verification file to your website's root directory to verify your ownership.
        </p>
        {/* <a href={verificationFileUrl} download>
          <button className="download-button">Download Verification File</button>
        </a> */}
    <button className="download-button" onClick={downloadFile}>Download Verification File</button>
        <p className="instructions">
          After uploading, the file should be accessible via a URL like:
          <br />
          <strong>https://www.yourwebsite.com/verification_code_12345.txt</strong>
        </p>
      </div>
    </div>
  );
}
