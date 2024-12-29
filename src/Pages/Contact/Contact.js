import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    try {
      const response = await fetch("http://localhost:3000/api/users/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      if (response.ok) {
        setStatusMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatusMessage("Error sending message: " + result);
      }
    } catch (error) {
      setStatusMessage("Failed to send message. Please try again later.");
    }
  };

  return (
    <div>
    <div className="contact-container">
      <div className="contact-info">
        <div className="info-item">
          <img src="location.png" alt="Address" />
          <div>
            <h3>Address</h3>
            <p>People colony street No 12</p>
            <p>Attock, Punjab</p>
            <p>Pakistan</p>
          </div>
        </div>
        <div className="info-item">
          <img src="telephone.png" alt="Phone" />
          <div>
            <h3>Mobile No</h3>
            <p>+92 341 816276782</p>
          </div>
        </div>
        <div className="info-item">
          <img src="mail.png" alt="Email" />
          <div>
            <h3>Email</h3>
            <p>hammadawan939858@gmail.com</p>
          </div>
        </div>
      </div>
   <div className="page-par">
      <div className="contact-img">
      <img src="contactUs.png" alt="contact us">
      </img>
      </div>
      <div className="content-wrapper">
        <div className="contact-box">
          <form onSubmit={handleSubmit}>
            <h1>Contact Us</h1>
            <div className="label-style">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="label-style">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="label-style">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your query here"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
          {statusMessage && <p>{statusMessage}</p>}
        </div>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
