import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { FaCertificate, FaDownload, FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Chat from "../../Components/Chat/chat";
import "./StudentDashboard.css";

function StudentDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [previewCert, setPreviewCert] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;


  useEffect(() => {
    const fetchCertificates = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        const studentEmail = user.emailAddresses[0].emailAddress;
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/student-documents/fetch-cert`, {
            params: { email: studentEmail }
          });
          setCertificates(response.data.certificates || []);
        } catch (error) {
          console.error("Failed to fetch certificates:", error);
        }
      }
    };

    fetchCertificates();
  }, [user]);

  const handleDownload = async (certificate) => {
    if (!certificate?.certificatePath) {
      alert("No file available for download!");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${certificate.certificatePath}`);
      if (!response.ok) throw new Error('Failed to fetch PDF');
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificate.name || "certificate"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate. Please try again.");
    }
  };
  


  const toDataURL = (url) =>
    fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));

  return (
    <div className="dashboard-container">
      {/* --- Header Section --- */}
      
      {showChat && <Chat studentEmail={userEmail} />}
<button
        onClick={() => setShowChat(prev => !prev)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
          backgroundColor: "#00eaff",
          color: "#0a0f24",
          padding: "10px 16px",
          borderRadius: "50%",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 234, 255, 0.3)",
          cursor: "pointer",
          fontSize: "20px"
        }}
        title={showChat ? "Close Chat" : "Open Chat"}
      >
        {showChat ? "✖" : "💬"}
      </button>
    
      <div className="dashboard-header">
        <h1 className="dashboard-title">📜 Your Certificates</h1>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: { width: "60px", height: "60px" },
            },
          }} 
        />
      </div>

      {/* --- Main Section --- */}
      {certificates.length === 0 ? (
        <p className="dashboard-no-certificates">You have no certificates yet!</p>
      ) : (
        <div className="certificate-grid">
          {certificates.map((cert) => (
            <div key={cert._id || cert.id} className="certificate-card">
              <div className="certificate-header">
                <FaCertificate className="certificate-icon" />
                <h2 className="certificate-name">{cert.name}</h2>
              </div>

              <div className="certificate-details">
                <p><strong>Day:</strong> {cert.day}</p>
                <p><strong>Month:</strong> {cert.month}</p>
                <p><strong>Year:</strong> {cert.year}</p>
                <p><strong>Issuance Date:</strong> {cert.issuanceDate}</p>
              </div>

              <div className="certificate-actions">
                <button className="certificate-btn download-btn" onClick={() => handleDownload(cert)}>
                  <FaDownload /> Download
                </button>
                <button className="certificate-btn preview-btn" onClick={() => setPreviewCert(cert)}>
                  <FaEye /> Preview
                </button>
              </div>

              <div className="certificate-footer">
                <p><strong>Sent At:</strong> {cert.sentAt ? new Date(cert.sentAt).toLocaleString() : "Unknown"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Preview Modal --- */}
      {previewCert && (
        <div className="modal-overlay" onClick={() => setPreviewCert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={`${process.env.REACT_APP_API_BASE_URL}${previewCert.certificatePath}`} 
              alt="Certificate Preview" 
              className="modal-image" 
            />
            <button className="close-btn" onClick={() => setPreviewCert(null)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
