import React, { useEffect, useContext } from 'react';
import { FaShieldAlt, FaLock, FaChartLine, FaUsers, FaServer, FaCode } from 'react-icons/fa';
import Footer from '../../Components/Footer/Footer';
import { ThemeContext } from '../../Components/context/ThemeContext';
import './About.css';

const About = () => {
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

  return (
    <div className={`about-page ${theme}`}>
      <div className="cyber-grid"></div>
      <div className="glowing-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <section className="hero-section animate-on-scroll">
        <div className="hero-content">
          <div className="hero-badge">Our Story</div>
          <h1>
            <span className="gradient-text">About</span>
            <span className="subtitle">BlockSecure</span>
          </h1>
          <p>Revolutionizing document verification with cutting-edge blockchain technology</p>
        </div>
          </section>

      <section className="mission-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="divider"></div>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <p>
                At BlockSecure, we aim to provide a secure, efficient, and transparent document verification system
                that eliminates fraud and reduces verification time. Our blockchain-based solution
                ensures the authenticity of documents while maintaining privacy and security.
              </p>
              <p>
                We believe in a future where document verification is seamless, trustworthy, and accessible to all.
                Our platform leverages the power of blockchain to create an immutable record of document authenticity,
                making fraud a thing of the past.
              </p>
            </div>
            <div className="mission-image">
              <div className="hexagon-container">
                <div className="hexagon"></div>
                <div className="hexagon"></div>
                <div className="hexagon"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="technology-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Technology Stack</h2>
            <div className="divider"></div>
          </div>
          <div className="tech-grid">
            <div className="tech-card">
              <FaShieldAlt className="tech-icon" />
              <h3>Blockchain</h3>
              <p>Secure and immutable document verification using distributed ledger technology</p>
            </div>
            <div className="tech-card">
              <FaLock className="tech-icon" />
              <h3>Encryption</h3>
              <p>Advanced encryption algorithms for maximum data protection and privacy</p>
            </div>
            <div className="tech-card">
              <FaChartLine className="tech-icon" />
              <h3>Analytics</h3>
              <p>Real-time verification tracking with comprehensive analytics dashboard</p>
            </div>
            <div className="tech-card">
              <FaServer className="tech-icon" />
              <h3>Cloud Infrastructure</h3>
              <p>Scalable cloud architecture ensuring high availability and performance</p>
            </div>
            <div className="tech-card">
              <FaCode className="tech-icon" />
              <h3>Smart Contracts</h3>
              <p>Automated verification processes with self-executing contract protocols</p>
            </div>
            <div className="tech-card">
              <FaUsers className="tech-icon" />
              <h3>User Experience</h3>
              <p>Intuitive interface designed for seamless user interaction and accessibility</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <div className="divider"></div>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <div className="member-glow"></div>
                <img src="/images/hammad-profile.jpg" alt="Hammad" />
              </div>
              <h3>Muhammad Hammad</h3>
              <p>Blockchain Developer</p>
              <div className="member-bio">Expert in blockchain architecture and smart contract development</div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-glow"></div>
                <img src="/images/ahmar-profile.jpg" alt="Hammad" />
              </div>
              <h3>Ahmar Anwar</h3>
              <p>Backend Developer</p>
              <div className="member-bio">Specializes in Backend Technologies with 1+ year experience in node js</div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-glow"></div>
                <img src="/images/muqtadir-profile.jpg" alt="Hammad" />
              </div>
              <h3>Muqtadir Medhi</h3>
              <p>Research Specialist</p>
              <div className="member-bio">Focused on research and analytics, with real time experience in research industry</div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <div className="divider"></div>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-container">
                <FaShieldAlt className="value-icon" />
              </div>
              <h3>Security</h3>
              <p>We prioritize the highest level of data protection in every aspect of our platform</p>
            </div>
            <div className="value-card">
              <div className="value-icon-container">
                <FaUsers className="value-icon" />
              </div>
              <h3>Transparency</h3>
              <p>We believe in open and honest verification processes with complete auditability</p>
            </div>
            <div className="value-card">
              <div className="value-icon-container">
                <FaChartLine className="value-icon" />
              </div>
              <h3>Efficiency</h3>
              <p>We continuously optimize our verification workflow to save time and resources</p>
            </div>
          </div>
      </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;