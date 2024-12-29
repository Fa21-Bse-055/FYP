// import React, { useState } from "react";
// import { pinata } from "./config";
// import { ethers } from 'ethers';
// import CryptoJS from "crypto-js"; // Import crypto-js
// import "./UploadDocument.css";

// function UploadDocument() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [contentHash, setContentHash] = useState("");
//   const [ipfsHash, setIpfsHash] = useState("");
//   const [storedHash, setStoredHash] = useState("");

//   const contractAddress = "0x95241f58c376b6e35823994f432e6c5962ba4228";
//   const contractABI = [
//     {
//       inputs: [{ internalType: "string", name: "_ipfsHash", type: "string" }],
//       name: "setIPFSHash",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getIPFSHash",
//       outputs: [{ internalType: "string", name: "", type: "string" }],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];

//   const changeHandler = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);

//     // Calculate the hash of the file content
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileContent = e.target.result;
//       const hash = CryptoJS.SHA256(fileContent).toString(); // Compute SHA-256 hash
//       setContentHash(hash);
//       console.log("Content Hash:", hash);
//     };
//     reader.readAsText(file);
//   };

//   const handleSubmission = async () => {
//     try {
//       if (!selectedFile) {
//         console.error("No file selected");
//         return;
//       }

//       // Upload the file to Pinata
//       const response = await pinata.upload.file(selectedFile);
//       const ipfsHash = response.cid || response.IpfsHash;
//       if (!ipfsHash) {
//         console.error("No IPFS hash found in Pinata response.");
//         return;
//       }

//       setIpfsHash(ipfsHash);
//       console.log("Extracted IPFS Hash:", ipfsHash);

//       // Store the new hash on the blockchain
//       await storeHashOnBlockchain(contentHash);
//     } catch (error) {
//       console.log("File upload failed:", error);
//     }
//   };

//   const storeHashOnBlockchain = async (hash) => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, contractABI, signer);

//       const tx = await contract.setIPFSHash(hash);
//       console.log("Transaction Submitted. Hash:", tx.hash);
//       await tx.wait();

//       console.log("Transaction successful. Content hash stored on blockchain:", hash);
//       console.log(`View transaction: https://sepolia.etherscan.io/tx/${tx.hash}`);
//     } catch (error) {
//       console.log("Failed to store hash on blockchain:", error);
//     }
//   };

//   const retrieveHashFromBlockchain = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const contract = new ethers.Contract(contractAddress, contractABI, provider);

//       const retrievedHash = await contract.getIPFSHash();
//       setStoredHash(retrievedHash);

//       console.log("Retrieved hash from blockchain:", retrievedHash);
//     } catch (error) {
//       console.log("Failed to retrieve hash from blockchain:", error);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="upload-section">
//         <label className="form-label">Choose File</label>
//         <input type="file" onChange={changeHandler} className="file-input" />
//         <button onClick={handleSubmission} className="submit-button">
//           Submit
//         </button>
//       </div>

//       <div className="retrieve-section">
//         <button onClick={retrieveHashFromBlockchain} className="retrieve-button">
//           Retrieve Stored Hash
//         </button>
//         {storedHash && (
//           <p>
//             <strong>Stored Content Hash:</strong> {storedHash}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UploadDocument;


import React, { useState } from "react";
import { pinata } from "./config";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import Footer from "../../Components/Footer/Footer";
import "./UploadDocument.css";

function UploadDocument() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentHash, setContentHash] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");

  const contractAddress = "0x95241f58c376b6e35823994f432e6c5962ba4228";
  const contractABI = [
    {
      "inputs": [],
      "name": "getIPFSHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "setIPFSHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  

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
    }
  };

  const storeHashOnBlockchain = async (hash) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.setIPFSHash(hash);
      console.log("Transaction Submitted. Hash:", tx.hash);
      await tx.wait();

      console.log("Transaction successful. Content hash stored on blockchain:", hash);
    } catch (error) {
      console.error("Failed to store hash on blockchain:", error);
    }
  };

  const retrieveHashFromBlockchain = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const retrievedHash = await contract.getIPFSHash();
      setStoredHash(retrievedHash);

      console.log("Retrieved hash from blockchain:", retrievedHash);
    } catch (error) {
      console.error("Failed to retrieve hash from blockchain:", error);
    }
  };

  return (
    <div>
    <div className="landing-page">
      <div className="content-section">
        <h1 className="title">Upload File</h1>
        <p className="description">
          Securely upload and store your files. Retrieve your content hash from the blockchain.
        </p>
        <div className="upload-section">
          <input type="file" onChange={changeHandler} className="file-input" />
          <button onClick={handleSubmission} className="primary-button">
            Submit
          </button>
        </div>
        <div className="retrieve-section">
          <button onClick={retrieveHashFromBlockchain} className="secondary-button">
            Retrieve Stored Hash
          </button>
          {storedHash && (
            <p className="stored-hash">
              <strong>Stored Content Hash:</strong> {storedHash}
            </p>
          )}
        </div>
      </div>
      <div className="image-section">
        <img
          src="upDoc.png"
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
