import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./GenerateDocument.css";

function GenerateDocument() {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");

  const downloadCertificate = (type) => {
    const input = document.getElementById("certificate");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      if (type === "pdf") {
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size in mm
        pdf.save("certificate.pdf");
      } else if (type === "image") {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "certificate.png";
        link.click();
      }
    });
  };

  return (
    <div className="generate-container">
      <h1 className="title">Generate Your Certificate</h1>
      <div className="content">
        {/* Input Form */}
        <div className="form-card">
          <h2>Fill in Details</h2>

          <label>Enter Name:</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Enter Day:</label>
          <input
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <label>Enter Month:</label>
          <input
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />

          <label>Enter Year:</label>
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <label>Enter Date of Issuance:</label>
          <input
            type="text"
            placeholder="Date of Issuance"
            value={issuanceDate}
            onChange={(e) => setIssuanceDate(e.target.value)}
          />

          <div className="buttons">
            <button onClick={() => downloadCertificate("pdf")}>
              Download as PDF
            </button>
            <button onClick={() => downloadCertificate("image")}>
              Download as Image
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
