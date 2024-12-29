import React, { useState } from 'react';
import './AdminRegistration.css';
import Footer from '../../../Components/Footer/Footer';

const AdminRegistration = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: userName,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('=')[1]}`
        },
        credentials: 'include', 
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Admin registered successfully!');
      } else {
        alert(result.msg || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
        <div className="login-container1">
            {/* Left Section */}
            <div className="left-section1">
                <h1>Welcome to the Admin Registration</h1>
                <p>
                    Create your admin account to manage and verify organizations efficiently.
                </p>
                <div className="quote1 img">
                    <img
                        src="admin login.png"
                        alt="Admin Features"
                    />
                </div>
            </div>
            
            {/* Right Section */}
            <div className="right-section1">
                <form className="login-box1" onSubmit={handleSubmit}>
                    <h1>Admin Registration</h1>
                    <div className="space1">
                        <label htmlFor="name">User Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter User Name..."
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space1">
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
                    <div className="space1">
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
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </div>
);
};

export default AdminRegistration;
