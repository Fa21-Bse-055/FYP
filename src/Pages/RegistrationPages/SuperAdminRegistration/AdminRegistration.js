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
    <div className="login-container">   
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Admin Registration</h1>
        <div className="space">
          <label htmlFor="name">UserName:</label>
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
        <div>      
          <button type="submit">Submit</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default AdminRegistration;
