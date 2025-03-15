import React, { useState, useEffect, useContext } from "react";
import { pinata } from "./config";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import Footer from "../../Components/Footer/Footer";
import { ThemeContext } from '../../Components/context/ThemeContext';
import { FaFileUpload, FaCloudUploadAlt, FaDatabase, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import "./UploadDocument.css";

function UploadDocument() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentHash, setContentHash] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const hash = CryptoJS.SHA256(fileContent).toString();
      setContentHash(hash);
      console.log("Content Hash:", hash);
    };
    reader.readAsText(file);
  };

  const handleSubmission = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    setIsLoading(true);

    try {
      const response = await pinata.upload.file(selectedFile);
      const ipfsHash = response.cid || response.IpfsHash;
      if (!ipfsHash) {
        console.error("No IPFS hash found in Pinata response.");
        return;
      }

      setIpfsHash(ipfsHash);
      console.log("Extracted IPFS Hash:", ipfsHash);

      await storeHashOnBlockchain(contentHash);
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeHashOnBlockchain = async (hash) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Call the correct function as per your ABI
      const tx = await contract.uploadDocumentHash(hash);
      console.log("Transaction Submitted. Hash:", tx.hash);
      setTransactionHash(tx.hash);
      await tx.wait();
  
      console.log("Transaction successful. Content hash stored on blockchain:", hash);
    } catch (error) {
      console.error("Failed to store hash on blockchain:", error);
    }
  };
  

  const retrieveHashFromBlockchain = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const retrievedHashes = await contract.getDocumentHashes();
      if (retrievedHashes && retrievedHashes.length > 0) {
        // Get the most recent hash
        const latestHash = retrievedHashes[retrievedHashes.length - 1];
        setStoredHash(latestHash);
        console.log("Retrieved hash from blockchain:", latestHash);
      } else {
        console.log("No hashes found on the blockchain");
        setStoredHash("No hashes found");
      }
    } catch (error) {
      console.error("Failed to retrieve hash from blockchain:", error);
    } finally {
      setIsLoading(false);
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
            
            <div 
              className="buttons-container"
              style={{ marginTop: "-15px" }}
            >
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
              
              <button 
                onClick={retrieveHashFromBlockchain} 
                className="secondary-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span> Retrieving...
                  </>
                ) : (
                  <>
                    <FaDatabase /> Retrieve Stored Hash
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
