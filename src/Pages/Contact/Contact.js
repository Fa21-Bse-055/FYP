import React, { useState, useEffect, useContext } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';
import Footer from '../../Components/Footer/Footer';
import { ThemeContext } from '../../Components/context/ThemeContext';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { theme } = useContext(ThemeContext);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className={`contact-page ${theme}`}>
      <div className="cyber-grid"></div>
      <div className="glowing-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <section className="contact-hero-section animate-on-scroll">
        <div className="contact-hero-content">
          <div className="hero-badge">Get In Touch</div>
          <h1>
            <span className="gradient-text">Contact Us</span>
            <span className="subtitle">We'd Love To Hear From You</span>
          </h1>
          <p>Have questions about our blockchain document verification system? Our team is ready to assist you with any inquiries or support needs.</p>
        </div>
      </section>
      
      <section className="contact-info-section animate-on-scroll">
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <h3>Email Us</h3>
            <p>support@blocksecure.com</p>
            <p>info@blocksecure.com</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <FaPhone />
            </div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>+1 (555) 987-6543</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Visit Us</h3>
            <p>123 Blockchain Avenue</p>
            <p>Tech District, CA 94103</p>
          </div>
        </div>
      </section>
      
      <section className="contact-form-section animate-on-scroll">
        <div className="form-container">
          <div className="form-header">
            <h2>Send Us A Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FaComment />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span> Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </button>
            
            {submitSuccess && (
              <div className="success-message">
                <FaEnvelope /> Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
        
        <div className="contact-image">
          <div className="cube-container">
            <div className="cube">
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact; 