import React from 'react';
import "./FilePage.css";

export default function DownloadVerificationFile() {
  // Update with the actual URL where your verification file is located.
  const verificationFileUrl = 'http://localhost:3000/api/users/download';
  // const downloadFile = async () => { 
  //   try {

  //     const response = await fetch(verificationFileUrl, {
  //       method: 'GET',
  //       credentials: 'include', // Include cookies for authentication
  //       redirect: 'follow', // Automatically follow redirects if the server issues one
  //     });

  //     console.log(response);
  //     if (response.ok) {
  //       // Redirect the browser to the file's URL for download
  //       window.location.href = verificationFileUrl;
  //     } else {
  //       throw new Error('File download failed');
  //     }
  //   } catch (error) {
  //     console.error('Download error:', error.message);
  //   }
  // };
  async function downloadFile(){
  

    try{
      const response = await fetch(verificationFileUrl,{credentials:'include'})
      if(response.ok){
        window.location.href = verificationFileUrl;
      }
      else{
        alert(`Error: File not found (Status ${response.status})`)
      }
    }
    catch(error){
      alert(`Error: ${error.message}`);
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