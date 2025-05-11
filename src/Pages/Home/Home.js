import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileUpload, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaLock, FaChartLine, FaExclamationTriangle, FaFileAlt, FaCalendarAlt, FaFingerprint } from 'react-icons/fa';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { ThemeContext } from '../../Components/context/ThemeContext';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [file, setFile] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileDetails, setFileDetails] = useState(null);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const verificationSectionRef = useRef(null);
  const render = useRef(1);

  // Smart contract details
  const verificationContractAddress = '0x32f3b827364d9be1e2c254496f84c78419697df4'; 
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_uploadContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        }
      ],
      "name": "verifyDocument",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fun() {
      const searchParams = new URLSearchParams(window.location.search);
      const docId = searchParams.get("docId");
      if (docId) {
        scrollToVerification();
        try {
          const response = await axios.get(
            `http://172.0.6.207:3000/api/users/getCert?cert_id=${docId}`
          );
          // alert(response.data.data.cert_hash);
          await verifyDocumentHash(response.data.data.cert_hash);
        } catch (e) {
          alert(e.message);
        }
      }
    }
    if (render.current === 1) {
      fun();
    }
    return () => {
      render.current = 2;
    };
  }, []);

  const scrollToVerification = () => {
    verificationSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
useEffect(()=>{
  const queryParams = new URLSearchParams(document.location.search)
  if(queryParams.get("docHash")){
    console.log(queryParams.get("docHash"));
    scrollToVerification();
    verifyDocumentHash(queryParams.get("docHash"))
  }
},[])
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   setVerificationStatus(null);
  //   setErrorMessage('');
  //   setFileDetails(null);
  //   setVerificationProgress(0);
    
  //   if (selectedFile) {
  //     // Extract file details
  //     const fileInfo = {
  //       name: selectedFile.name,
  //       type: selectedFile.type,
  //       size: (selectedFile.size / 1024).toFixed(2) + ' KB',
  //       lastModified: new Date(selectedFile.lastModified).toLocaleDateString()
  //     };
  //     setFileDetails(fileInfo);
      
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const fileContent = e.target.result;
  //       const hash = CryptoJS.SHA256(fileContent).toString();
  //       verifyDocumentHash(hash);
  //     };
  //     reader.readAsText(selectedFile);
  //   }
  // };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setVerificationStatus(null);
    setErrorMessage('');
    setFileDetails(null);
    setVerificationProgress(0);
  
    if (selectedFile) {
      // Extract file details
      const fileInfo = {
        name: selectedFile.name,
        type: selectedFile.type,
        size: (selectedFile.size / 1024).toFixed(2) + ' KB',
        lastModified: new Date(selectedFile.lastModified).toLocaleDateString()
      };
      setFileDetails(fileInfo);
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        // Convert ArrayBuffer to CryptoJS WordArray
        const wordArray = CryptoJS.lib.WordArray.create(
          new Uint8Array(arrayBuffer)
        );
        const hashHex = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
        console.log("SHA-256:", hashHex);
        verifyDocumentHash(hashHex);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };
  
  const verifyDocumentHash = async (hash) => {
    console.log("hhash:" +hash);
    // alert("hash: "+ hash);
    setIsLoading(true);
    setVerificationProgress(0);
    
    // Simulate progress steps
    const progressInterval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new ethers.Contract(
        verificationContractAddress,
        contractABI,
        provider
      );

      const isVerified = await contract.verifyDocument(hash);
      
      // Complete the progress bar
      clearInterval(progressInterval);
      setVerificationProgress(100);
      
      // Short delay to show 100% before showing result
      setTimeout(() => {
        if (isVerified) {
          setVerificationStatus(true);
        } else {
          setVerificationStatus(false);
          setErrorMessage('This document has not been uploaded to the blockchain or has been tampered with.');
        }
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error verifying document:', error);
      clearInterval(progressInterval);
      setVerificationProgress(100);
      
      setTimeout(() => {
        setErrorMessage('Error verifying the document. Please try again.');
        setVerificationStatus(false);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className={`home-page ${theme}`}>
      <div className="cyber-grid"></div>
      <div className="glowing-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <section className="hero-section animate-on-scroll">
        <div className="hero-content">
          <div className="hero-badge">Blockchain Powered</div>
          <h1>
            <span className="gradient-text">BlockSecure</span>
            <span className="subtitle">Document Verification System</span>
          </h1>
          <p>Secure, transparent, and efficient document verification using cutting-edge blockchain technology</p>
          <div className="hero-buttons">
            <button 
              className="primary-button"
              onClick={scrollToVerification}
            >
              Verify Document
            </button>
            <button 
              className="secondary-button"
              onClick={() => navigate('/uploadDocument')}
            >
              Upload Document
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="cube-container">
            <div className="cube">
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>
        </div>
      </section>

      <section ref={verificationSectionRef} className="verification-section animate-on-scroll" id="verification">
        <div className="section-header">
          <h2>Instant Document Verification</h2>
          <p>Verify the authenticity of any document in seconds</p>
        </div>
        <div className="verification-container">
          <div className="verification-card">
            <div className="file-upload">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                <FaFileUpload /> Choose File
              </label>
              {file && <span className="file-name">{file.name}</span>}
            </div>
            
            {fileDetails && (
              <div className="file-details">
                <h3>Document Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <FaFileAlt />
                    <span>Name: {fileDetails.name}</span>
                  </div>
                  <div className="detail-item">
                    <FaFingerprint />
                    <span>Type: {fileDetails.type || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <FaChartLine />
                    <span>Size: {fileDetails.size}</span>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>Modified: {fileDetails.lastModified}</span>
                  </div>
                </div>
              </div>
            )}
            
            {!isLoading && !verificationStatus && !file && (
              <button
                className="verify-button"
                disabled={true}
              >
                Verify Document
              </button>
            )}

            {!isLoading && !verificationStatus && file && (
              <button
                className="verify-button"
                onClick={() => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const fileContent = e.target.result;
                    const hash = CryptoJS.SHA256(fileContent).toString();
                    verifyDocumentHash(hash);
                  };
                  reader.readAsText(file);
                }}
              >
                Verify Document
              </button>
            )}

            {isLoading && (
              <div className="verification-process">
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${verificationProgress}%` }}
                  ></div>
                </div>
                <div className="verification-loading">
                  <span className="loading-spinner"></span>
                  <span>Verifying Document... {verificationProgress}%</span>
                </div>
                <div className="verification-steps">
                  <div className={`step ${verificationProgress >= 20 ? 'active' : ''}`}>
                    <div className="step-icon">1</div>
                    <div className="step-text">Reading Document</div>
                  </div>
                  <div className={`step ${verificationProgress >= 40 ? 'active' : ''}`}>
                    <div className="step-icon">2</div>
                    <div className="step-text">Calculating Hash</div>
                  </div>
                  <div className={`step ${verificationProgress >= 60 ? 'active' : ''}`}>
                    <div className="step-icon">3</div>
                    <div className="step-text">Connecting to Blockchain</div>
                  </div>
                  <div className={`step ${verificationProgress >= 80 ? 'active' : ''}`}>
                    <div className="step-icon">4</div>
                    <div className="step-text">Verifying Authenticity</div>
                  </div>
                  <div className={`step ${verificationProgress >= 100 ? 'active' : ''}`}>
                    <div className="step-icon">5</div>
                    <div className="step-text">Completing Verification</div>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus !== null && !isLoading && (
              <div className={`verification-result ${verificationStatus ? 'valid' : 'invalid'}`}>
                <div className="result-icon">
                  {verificationStatus ? <FaCheckCircle /> : <FaTimesCircle />}
                </div>
                <div className="result-text">
                  <h3>{verificationStatus ? 'Document is Valid' : 'Document is Invalid'}</h3>
                  <p>
                    {verificationStatus 
                      ? 'This document has been verified on the blockchain and is authentic.' 
                      : errorMessage || 'This document could not be verified on the blockchain.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="features-section animate-on-scroll">
        <div className="section-header">
          <h2>Why Choose BlockSecure?</h2>
          <p>Our platform offers cutting-edge features for secure document verification</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Secure Verification</h3>
            <p>Blockchain-powered verification ensuring document authenticity and tamper-proof records</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaLock />
            </div>
            <h3>Privacy Focused</h3>
            <p>End-to-end encryption and decentralized storage protecting your sensitive information</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Real-time Tracking</h3>
            <p>Monitor your document verification status in real-time with detailed analytics</p>
          </div>
        </div>
      </section>

      <section className="stats-section animate-on-scroll">
        <div className="stats-container">
          <div className="stat-item">
            <h3>10+</h3>
            <p>Documents Verified</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Verification Accuracy</p>
          </div>
          <div className="stat-item">
            <h3>1+</h3>
            <p>Trusted Organizations</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home; 