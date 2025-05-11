import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaDownload, FaPaperPlane } from "react-icons/fa";
import "./UploadCSV.css";

const API_BASE = "http://localhost:3000";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [sendOptionsVisible, setSendOptionsVisible] = useState(null); // holds cert._id when active

  const fileUrl = relPath => `${API_BASE}${relPath}`;

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return setMessage("Please select a CSV file.");
    setMessage("Uploading…");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/api/bulk-upload`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage(res.data.message || "Upload complete.");
      if (searchEmail) fetchCertificates(searchEmail);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  async function fetchCertificates(email) {
    const res = await axios.get(`${API_BASE}/api/student-documents/fetch-cert`, {
      params: { email }
    });
    return res.data.certificates;
  }

  useEffect(() => {
    if (searchEmail) {
      fetchCertificates(searchEmail)
        .then(setCertificates)
        .catch(console.error);
    }
  }, [searchEmail]);

  useEffect(() => {
    const trimmed = searchEmail.trim();
    if (!trimmed) return;

    const delay = setTimeout(() => fetchCertificates(searchEmail.trim()), 300);
    return () => clearTimeout(delay);
  }, [searchEmail]);

  const handleDownload = async cert => {
    try {
      const res = await axios.get(fileUrl(cert.certificatePath), {
        responseType: 'blob'
      });
      const blobUrl = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${cert.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleSend = async (cert, method) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/send-certificate`, {
        certificateId: cert._id,
        method // "gmail" or "dashboard"
      });
      console.log("cert._id",cert._id);
      
      setMessage(res.data.message || `Certificate sent via ${method}`);
    } catch (err) {
      console.error("Sending failed:", err);
      setMessage("Failed to send certificate.");
    }
    setSendOptionsVisible(null); // hide options after sending
  };

  return (
    <div className="uploadcsv-container">
      <h1>Bulk Certificate Upload + Search</h1>

      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          accept=".csv"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit">Upload CSV</button>
      </form>
      {message && <p className="message">{message}</p>}

      <div className="search-bar">
        <FaSearch className="icon" />
        <input
          type="text"
          placeholder="Search by student email…"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
        />
      </div>

      {searchEmail && certificates.length === 0 && (
        <p className="no-results">No certificates for “{searchEmail}”</p>
      )}
      <div className="cert-grid">
        {certificates.map(cert => (
          <div key={cert._id} className="cert-card">
            <div>
              <h3>{cert.title}</h3>
              <p><strong>Email:</strong> {cert.studentEmail}</p>
              <p><strong>Date:</strong> {cert.day} {cert.month} {cert.year}</p>
            </div>

            <div className="actions">
              <button onClick={() => handleDownload(cert)}>
                <FaDownload /> Download
              </button>
              <button onClick={() => setSendOptionsVisible(cert._id)}>
                <FaPaperPlane /> Send
              </button>
              {sendOptionsVisible === cert._id && (
                <div className="send-options">
                  <button onClick={() => handleSend(cert, "gmail")}>Send to Gmail</button>
                  <button onClick={() => handleSend(cert, "dashboard")}>Send to Dashboard</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
