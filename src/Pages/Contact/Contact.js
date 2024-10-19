import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    try {
      const response = await fetch('http://localhost:3000/api/users/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.text();
      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setStatusMessage('Error sending message: ' + result);
      }
    } catch (error) {
      setStatusMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact_us_page">
        <h2>Contact Us</h2>
        <p>We're glad you're here! Whether you have a question, feedback,
          or just want to say hello, we're here to help.</p>
        <p>You can reach us via the contact form below,
          email or call us. We're available Monday through Friday,
          from 9AM to 5PM.</p>
        <p>Our team will respond to all inquiries within 24 hours.
          If you need immediate assistance, please call our support line.</p>
      </div>
      <div className='main-container'>
        <div className='contact-info'>
          <div className='image-style'>
            <div>
              <img src="location.png" alt="address image" />
            </div>
            <div className='address-style'>
              <h3>Address</h3>
              <p>People colony street No 12</p>
              <p>Attock, Punjab</p>
              <p>Pakistan</p>
            </div>
          </div>
          <div className='image-style'>
            <div>
              <img src='telephone.png' alt='contact image' />
            </div>
            <div className='address-style'>
              <h3>Mobile No</h3>
              <p>+92 341 816276782</p>
            </div>
          </div>
          <div className='image-style'>
            <div>
              <img src='mail.png' alt='gmail image' />
            </div>
            <div className='address-style'>
              <h3>G-mail</h3>
              <p>hammadawan939858@gmail.com</p>
            </div>
          </div>
        </div>
        <div className='contact-box'>
          <form onSubmit={handleSubmit}>
            <h1>Contact Us</h1>
            <div className='label-style'>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='label-style'>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='label-style'>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                placeholder='Enter your query here'
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
          {statusMessage && <p>{statusMessage}</p>} {/* Show success or error messages */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
