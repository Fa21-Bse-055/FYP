// src/pages/TryForFree.js
import React from 'react';
import './OrganizationRegistration.css';
import Footer from '../../../Components/Footer/Footer';
import { useState } from 'react';

const OrganizationRegistration = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationWebUrl, setOrganizationWebUrl] = useState('');
  const [CNICImage, setCNICImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("organization_name", organizationName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organization_web_url", organizationWebUrl);
    formData.append("CNICImage", CNICImage);  // `CNICImage` is the file selected by the user

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        body: formData,
        // credentials: 'include',  // To include cookies if needed for CORS requests
      });

      const result = await response.json();
      if (response.ok) {
        console.log("sucess");
        
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
    <div className="login-container">
    <div className="left-section">
        <h1>Welcome to Organization Registration</h1>
        <p>
            Our registration process is quick and easy, taking no more than 10 minutes to complete.
        </p>
        <div className="quote img">
                <img
                    src="org1.jpeg"
                    alt="User testimonial"
              />
        </div>
    </div>
    <div className="right-section">
        <form className="login-box" onSubmit={handleSubmit}>
            <h1>Organization Registration</h1>
            <div className="space">
                <label htmlFor="name">Organization Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Organization name..."
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                />
            </div>
            <div className="space">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="space">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="space">
                <label htmlFor="domain">Domain Name:</label>
                <input
                    type="text"
                    id="domain"
                    name="domain"
                    placeholder="Enter Domain name..."
                    value={organizationWebUrl}
                    onChange={(e) => setOrganizationWebUrl(e.target.value)}
                    required
                />
            </div>
            <div className="space">
                <label htmlFor="CNICImage">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setCNICImage(e.target.files[0])}
                    required
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            {/* <div>
            Already have an account? <a href="/login">Login</a>
            </div> */}
        </form>
    </div>  
</div>
 <Footer/>
</div>

  );
};



// const OrginizationRegistration =()=>(     
//       <form className="login-box">
//       <h1>Orginization Registration</h1>
//               <div className="space">
//                 <label htmlFor="name">Orginization Name:</label>
//                 <input type="text" id="name" name="name" placeholder="Enter Orginization name..." required />
//               </div>
//               <div className="space">
//                 <label htmlFor="email">Email:</label>
//                 <input type="email" id="email" name="email" placeholder="Enter your email..." required />
//               </div>
//               <div className="space">
//                 <label htmlFor="name">Password:</label>
//                 <input type="password" id="password" name="password" placeholder="Enter your Password..." required />
//               </div>
//               <div className="space">
//                 <label htmlFor="name">Domain Name:</label>
//                 <input type="text" id="name" name="name" placeholder="Enter Domain name..." required />
//               </div>   
//               <div className="space">
//                 <label htmlFor="name">Image:</label>
//                 <input type="file" id="image" name="image" required />
//               </div>  
//               <div>      
//                 <button type="submit">Submit</button>
//               </div>
//       </form>
// );

// const PersonRegistration = () =>(   
//    <form className="login-box">
//    <h1>Person Registration</h1>
//            <div className="space">
//              <label htmlFor="name">user Name:</label>
//              <input type="text" id="name" name="name" placeholder="Enter Orginization name..." required />
//            </div>
//            <div className="space">
//              <label htmlFor="email">Email:</label>
//              <input type="email" id="email" name="email" placeholder="Enter your email..." required />
//            </div>
//            <div className="space">
//              <label htmlFor="name">Password:</label>
//              <input type="password" id="password" name="password" placeholder="Enter your Password..." required />
//            </div>

//            <div>      
//              <button type="submit">Submit</button>
//            </div>
//    </form>
// )

export default OrganizationRegistration;
