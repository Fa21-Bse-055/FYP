import React, { useState, useEffect, useContext } from "react";
import { pinata } from "./config";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import Footer from "../../Components/Footer/Footer";
import { ThemeContext } from '../../Components/context/ThemeContext';
import { FaFileUpload, FaCloudUploadAlt, FaDatabase, FaCheckCircle, FaExternalLinkAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/context/AuthContext';
import "./UploadDocument.css";

function UploadDocument() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentHash, setContentHash] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { currentUser , toggle , setToggle } = useAuth();

  const contractAddress = "0x26305c500596194ba56ec8c136ffd037c9b2f3ae";
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "DocumentUploaded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        }
      ],
      "name": "uploadDocumentHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDocumentHashes",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
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

  const changeHandler = (event) => {
    const file = event.target.files[0];
      setSelectedFile(file);
      setErrorMessage("");
    
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
    
        // Hash using same method as above
        const wordArray = CryptoJS.lib.WordArray.create(
        new Uint8Array(arrayBuffer)
      );
      const hashHex = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
      console.log("SHA-256:", hashHex);
      setContentHash(hashHex);
      };
    
      reader.readAsArrayBuffer(file);
  };
  
  const handleSubmission = async () => {
    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");
    
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    if (!documentTitle.trim()) {
      setErrorMessage("Please provide a document title");
      return;
    }

    setIsLoading(true);

    try {
      // Upload to IPFS via Pinata
      const response = await pinata.upload.file(selectedFile);
      const ipfsHash = response.cid || response.IpfsHash;
      if (!ipfsHash) {
        console.error("No IPFS hash found in Pinata response.");
        setErrorMessage("Error uploading to IPFS. Please try again.");
        setIsLoading(false);
        return;
      }

      setIpfsHash(ipfsHash);
      console.log("File uploaded to IPFS. Hash:", ipfsHash);
      
      // Store on blockchain
      await storeHashOnBlockchain(contentHash);
      // setToggle(true)
      
      // Save to backend or localStorage
      await saveDocumentToBackend(contentHash, ipfsHash);
      
    } catch (error) {
      console.error("File upload process failed:", error);
      setErrorMessage("Error during upload process. Please try again or check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const storeHashOnBlockchain = async (hash) => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask not detected. Please install MetaMask.");
        setErrorMessage("MetaMask not detected. Please install MetaMask to store documents on blockchain.");
        return false;
      }
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Call the uploadDocumentHash function
      const tx = await contract.uploadDocumentHash(hash);
      console.log("Transaction Submitted. Hash:", tx.hash);
      setTransactionHash(tx.hash);
      
      setSuccessMessage("Transaction submitted to blockchain. Waiting for confirmation...");
      
      // Wait for transaction confirmation
      await tx.wait();
  
      console.log("Transaction successful. Content hash stored on blockchain:", hash);
      return true;
    } catch (error) {
      console.error("Failed to store hash on blockchain:", error);
      
      if (error.code === 4001) {
        // User rejected the transaction
        setErrorMessage("Transaction was rejected. Please approve the transaction in MetaMask to store document on blockchain.");
      } else if (error.message && error.message.includes("user rejected")) {
        setErrorMessage("Transaction was rejected. Please approve the transaction in MetaMask to store document on blockchain.");
      } else {
        setErrorMessage("Error storing document on blockchain. Document will be tracked locally only.");
      }
      
      return false;
    }
  };
  
  const saveDocumentToBackend = async (contentHash, ipfsHash) => {
    try {
      // Try the original endpoint
      const response = await fetch('http://localhost:3000/api/users/upload-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: documentTitle,
          description: "Uploaded via blockchain",
          ipfsHash: ipfsHash,
          contentHash: contentHash,
          type: selectedFile.type,
          size: selectedFile.size,
          filename: selectedFile.name,
          status: "pending"
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Document saved to backend:", data);
        setSuccessMessage("Document uploaded successfully!");
        setTimeout(() => navigate('/dashboard'), 1500);
        return;
      }
      
      console.log("Primary endpoint failed, using localStorage fallback");
      
      // Get existing documents from localStorage or initialize empty array
      const localDocuments = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
      
      // Add the new document
      const newDocument = {
        _id: `local_${Date.now()}`,
        title: documentTitle,
        description: "Uploaded via blockchain",
        ipfsHash: ipfsHash,
        contentHash: contentHash,
        type: selectedFile.type,
        size: selectedFile.size,
        filename: selectedFile.name,
        status: "pending",
        createdAt: new Date().toISOString(),
        userId: currentUser?.id || 'unknown',
        orgName: currentUser?.organization_name || 'Unknown Organization'
      };
      
      localDocuments.push(newDocument);
      
      // Save back to localStorage
      localStorage.setItem('blockSecureDocuments', JSON.stringify(localDocuments));
      
      console.log("Document saved to localStorage:", newDocument);
      
      setSuccessMessage("Document uploaded to blockchain! Using local storage to track documents.");
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error("Error saving document to backend:", error);
      
      // Error fallback - use localStorage
      const localDocuments = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
      
      const newDocument = {
        _id: `local_${Date.now()}`,
        title: documentTitle,
        description: "Uploaded via blockchain",
        ipfsHash: ipfsHash,
        contentHash: contentHash,
        type: selectedFile.type,
        size: selectedFile.size,
        filename: selectedFile.name,
        status: "pending",
        createdAt: new Date().toISOString(),
        userId: currentUser?.id || 'unknown',
        orgName: currentUser?.organization_name || 'Unknown Organization'
      };
      
      localDocuments.push(newDocument);
      localStorage.setItem('blockSecureDocuments', JSON.stringify(localDocuments));
      
      setSuccessMessage("Document uploaded to blockchain! Using local storage to track documents.");
      setTimeout(() => navigate('/dashboard'), 1500);
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
      
      <div className="landing-page animate-on-scroll">
        <div className="content-section">
          <div className="hero-badge">Blockchain Storage</div>
          <h1 className="title">
            <span className="gradient-text">Upload Document</span>
            <span className="subtitle">Secure Storage on Blockchain</span>
          </h1>
          <p className="description">
            Securely upload and store your files on IPFS with blockchain verification. Your documents will be tamper-proof and easily verifiable.
          </p>
          
          <div className="upload-section">
            {errorMessage && (
              <div className="error-message">
                <FaExclamationTriangle /> {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="success-message">
                <FaCheckCircle /> {successMessage}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="document-title">Document Title:</label>
              <input
                type="text"
                id="document-title"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Enter document title"
                required
                className="form-input"
              />
            </div>
            
            <label htmlFor="file-upload" className="file-upload-label">
              <FaFileUpload /> Choose File
              <input 
                type="file" 
                id="file-upload" 
                onChange={changeHandler} 
                className="file-input" 
                style={{ display: 'none' }}
              />
            </label>
            {selectedFile && (
              <div className="selected-file">
                <FaCheckCircle /> {selectedFile.name}
              </div>
            )}
            
            <div className="buttons-container">
              <button 
                onClick={handleSubmission} 
                className="primary-button"
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span> Uploading...
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt /> Upload to Blockchain
                  </>
                )}
              </button>
            </div>
            
            {storedHash && (
              <div className="stored-hash">
                <strong>Stored Content Hash:</strong> {storedHash}
                {transactionHash && (
                  <div className="transaction-link">
                    <a 
                      href={`https://sepolia.etherscan.io/tx/${transactionHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="etherscan-link"
                    >
                      View Transaction on Sepolia Etherscan <FaExternalLinkAlt />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="image-section">
          <img
            src="/upDoc.png"
            alt="Upload Illustration"
            className="illustration"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default UploadDocument;
