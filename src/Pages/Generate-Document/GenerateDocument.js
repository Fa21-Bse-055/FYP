import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./GenerateDocument.css";
import { FaFileDownload, FaUserAlt, FaCalendarAlt, FaCertificate } from "react-icons/fa";
import { useAuth } from "../../Components/context/AuthContext";

function GenerateDocument() {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");
  const { currentUser } = useAuth();
  
  // Add animation effect for particles
  useEffect(() => {
    const particles = document.querySelectorAll('.cyber-particle');
    particles.forEach((particle, index) => {
      particle.style.animationDelay = `${index * 0.3}s`;
    });
  }, []);

  const downloadCertificate = () => {
    const input = document.getElementById("certificate");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size in mm
      pdf.save("certificate.pdf");
      
      // Track the generated document in localStorage
      const generatedDoc = {
        id: `gen_${Date.now()}`,
        name: name || "Unnamed Certificate",
        type: "certificate",
        date: new Date().toISOString(),
        userId: currentUser?.id || 'unknown',
        orgName: currentUser?.organization_name || 'Unknown Organization'
      };
      
      // Get existing generated documents or initialize empty array
      const existingDocs = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
      
      // Add new document to array
      existingDocs.push(generatedDoc);
      
      // Save back to localStorage
      localStorage.setItem('generatedDocuments', JSON.stringify(existingDocs));
      
      console.log('Document generated and tracked:', generatedDoc);
      alert('Certificate generated and downloaded successfully!');
    });
  };

  return (
    <div className="generate-container">
      {/* Cyber particles for futuristic effect */}
      <div className="cyber-particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="cyber-particle"></div>
        ))}
      </div>
      
      <h1 className="title">Generate Your Certificate</h1>
      <div className="content">
        {/* Input Form */}
        <div className="form-card">
          <h2><FaCertificate className="form-icon" /> Fill in Details</h2>

          <label><FaUserAlt className="input-icon" /> Enter Name:</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label><FaCalendarAlt className="input-icon" /> Enter Day:</label>
          <input
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <label><FaCalendarAlt className="input-icon" /> Enter Month:</label>
          <input
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />

          <label><FaCalendarAlt className="input-icon" /> Enter Year:</label>
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <label><FaCalendarAlt className="input-icon" /> Enter Date of Issuance:</label>
          <input
            type="text"
            placeholder="Date of Issuance"
            value={issuanceDate}
            onChange={(e) => setIssuanceDate(e.target.value)}
          />

          <div className="pdf-button-container">
            <button onClick={downloadCertificate} className="pdf-button">
              <FaFileDownload className="btn-icon" /> Download as PDF
            </button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div id="certificate" className="certificate-preview">
          <img
            src="Modern Vintage Certificate of Achievement.png"
            alt="Certificate Template"
            className="certificate-template"
          />
          <div className="certificate-text">
            <h2 className="certificate-name">{name || "Your Name"}</h2>
            <p className="certificate-day">{day || "DD"}</p>
            <p className="certificate-month">{month || "MM"}</p>
            <p className="certificate-year">{year || "YYYY"}</p>
            <p className="certificate-issuance">
              {issuanceDate || "Date of Issuance"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateDocument;
