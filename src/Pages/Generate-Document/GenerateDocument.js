import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./GenerateDocument.css";
import { FaFileDownload, FaUserAlt, FaCalendarAlt, FaCertificate } from "react-icons/fa";
import { useAuth } from "../../Components/context/AuthContext";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import qrCode from "qrcode"
import CryptoJS from "crypto-js";

function GenerateDocument() {
  const [name, setName] = useState("Unnamed Certificate");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");
  const { currentUser ,docHash } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState("");


  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const years = Array.from({ length: 2030 - 1970 + 1 }, (_, i) => (1970 + i).toString());

  useEffect(() => {
  async  function fun(){
    const particles = document.querySelectorAll('.cyber-particle');
    particles.forEach((particle, index) => {
      particle.style.animationDelay = `${index * 0.3}s`;
    });
  }
  fun()
  }, []);

  async function fun(cert_id) {
    setTimeout(() => {
      const input = document.getElementById("certificate");
      html2canvas(input).then(async (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size in mm
        const pdfBlob = pdf.output("arraybuffer");
        const wordArray = CryptoJS.lib.WordArray.create(
          new Uint8Array(pdfBlob)
        );
        const hashHex = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
        console.log("SHA-256:", hashHex);
        pdf.save("certificate.pdf");
        try {
          await axios.post("http://localhost:3000/api/users/addCert", {
            cert_id,
            cert_hash: hashHex,
          });
        } catch (e) {
          console.log(e.message);
        }
      });
    }, 400);
  }


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const sendCertificateToStudent = async () => {
    if (!name || !day || !month || !year || !issuanceDate) {
      alert("Please fill in all certificate details before sending!");
      return;
    }
  
    const studentEmail = prompt("Enter the Student's Gmail:");
    if (!studentEmail || !studentEmail.includes("@gmail.com")) {
      alert("Please enter a valid Gmail address!");
      return;
    }
  
    const input = document.getElementById("certificate");
    console.log("input"+input);
    const canvas = await html2canvas(input);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  
    // 👉 Decode JWT
    const token = getCookie('token'); // change this name
    console.log("aa"+token);
    let organizationId = null;
    if (token) {
      const decodedToken = jwtDecode(token);
      organizationId = decodedToken?.organization_id;
      console.log("bb"+decodedToken);
    }

    if (!organizationId) {
      alert("Organization ID not found in token!");
      return;
    }
  
    const formData = new FormData();
    formData.append('studentEmail', studentEmail);
    formData.append('title', name || "Unnamed Certificate");
    formData.append('description', "Certificate Description");
    formData.append('day', day);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('issuanceDate', issuanceDate);
    formData.append('senderOrganization', organizationId);
    formData.append('certificate', blob, 'certificate.png');
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/student-documents/send-cert",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
  
      console.log("Certificate sent:", response.data);
      alert("Certificate sent successfully!");
    } catch (error) {
      console.error("Error sending certificate:", error.message);
      alert("Failed to send certificate.");
    }
  };

  const downloadCertificate = () => {
    const input = document.getElementById("certificate");
    const cert_id = Date.now();
    html2canvas(input).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  
      const qrDataUrl = await qrCode.toDataURL(
        `http://172.0.6.207:3001?docId=${cert_id}`
      );

      setQrCodeUrl(qrDataUrl);
      fun(cert_id);
    });
  };
  

  return (
    <div className="generate-container">
      <div className="cyber-particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="cyber-particle"></div>
        ))}
      </div>
      
      <h1 className="title">Generate Your Certificate</h1>
      <div className="content">
        <div className="form-card">
          <h2><FaCertificate className="form-icon" /> Fill in Details</h2>

          <label><FaUserAlt className="input-icon" /> Enter Name:</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label><FaCalendarAlt className="input-icon" /> Select Day:</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Select Day</option>
            {weekdays.map((weekday) => (
              <option key={weekday} value={weekday}>{weekday}</option>
            ))}
          </select>

          <label><FaCalendarAlt className="input-icon" /> Select Month:</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <label><FaCalendarAlt className="input-icon" /> Select Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <label><FaCalendarAlt className="input-icon" /> Select Date of Issuance:</label>
          <input
            type="date"
            value={issuanceDate}
            onChange={(e) => setIssuanceDate(e.target.value)}
          />

          <div className="pdf-button-container">
            <button onClick={downloadCertificate} className="pdf-button">
              <FaFileDownload className="btn-icon" /> Download as PDF
            </button>
            <button onClick={sendCertificateToStudent} className="pdf-button bg-green-500 hover:bg-green-600">
              📤 Send to Student
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
            <p className="certificate-day">{day || "Day"}</p>
            <p className="certificate-month">{month || "Month"}</p>
            <p className="certificate-year">{year || "Year"}</p>
            <p className="certificate-issuance">{issuanceDate || "Date of Issuance"}</p>
            <div className="qr-scan">
            <img id="qr-id" src={qrCodeUrl} alt={"qrcode"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateDocument;
