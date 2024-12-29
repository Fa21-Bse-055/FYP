// // src/pages/About.js
// import React from 'react';
// import "./About.css"
// import { Link } from 'react-router-dom';
// import Footer from '../../Components/Footer/Footer';

// const About = () => {
//   return (
//     <div className='about-container'>
//       <div className='content'>
//         <h1><u>About Us</u></h1>
//         <p>We are committed to providing the best services to our customers.</p>
//         <div className='img-container'>
//           <div className='img-style'>
//             <img src="about.jpg" alt='About Us' />
//           </div>
//           <div className='text-container'>
//             <h3>Our Story</h3>
//             <p>
//               Hello! I'm Hammad, the creator of this website. With a passion for blockchain technology,
//               I founded this platform to help individuals and businesses securely verify their documents
//               online. Our mission is to provide a user-friendly, reliable solution that empowers users to
//               take control of their information with ease and confidence.<br/>
//               We believe in transparency, security, and innovation. Whether you're an
//               individual or a business, our platform is designed to simplify your document verification
//               process, ensuring that you can focus on what really matters.<br/>
//               Thank you for being a part of our journey. We're excited to work with you and continue 
//               improving the way we verify documents online. If you'd like to learn more, feel free to 
//               explore the site or <Link to="/contact">get in touch</Link> with any questions!
//             </p>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import "./About.css";
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

const About = () => {
  return (
    <div>
    <div className="about-container">
      <main className="main-content">
        <section className="hero-section">
          <h1>About Us</h1>
          <p>Empowering individuals and businesses with cutting-edge document verification solutions.</p>
        </section>
     
          <div className="mission-section">
            <p> <h2>Our Mission</h2> We strive to simplify document verification with secure, fast, and reliable blockchain technology, fostering trust and transparency globally.</p>
            <div className="image-container">
              <img src="mission.png" alt="Our Mission" />
            </div>
          </div>
          <div className="story-section"> 
          <div className="image-container1">
              <img src="story.jpg" alt="Our Story" />
            </div>    
            <p>
            <h2>Our Story</h2>
              Founded by a team of passionate innovators, OurWebsite began as a vision to transform the way documents are verified. 
              With years of experience in blockchain and technology, we crafted a solution to empower individuals and organizations to verify credentials with ease.
              <br />
              <Link to="/contact">Get in touch</Link> to learn more about our journey.
            </p>
          </div>
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default About;

