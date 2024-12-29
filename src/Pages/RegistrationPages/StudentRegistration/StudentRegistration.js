// src/pages/TryForFree.js
import React, { useState } from 'react';
import './StudentRegistration.css';
import Footer from '../../../Components/Footer/Footer';

const StudentRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Uncomment and adjust the following code as needed
    // try {
    //   const response = await fetch('http://192.168.100.8:3000/api/users/register', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const result = await response.json();
    //   if (response.ok) {
    //     navigate('/verify');
    //   } else {
    //     alert(result.message || 'Something went wrong.');
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  return (
    <div>
    <div className="login-container2">   
            <div className="left-section2">
                <h1>Welcome to the Student Registration</h1>
                <p>
                    Create your student account here, it will take less then 2 min...
                </p>
                <div className="quote2 img">
                    <img
                        src="st reg.jpeg"
                        alt="Admin Features"
                    />
                </div>
            </div>

<div className='right-section2'>
      <form className="login-box2" onSubmit={handleSubmit}>
        <h1>Student Registration</h1>
        <div className="space2">
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
        <div className="space2">
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
        <div className='p-st'>
          <p>Or Login with</p>
        </div>
        <div  className="login-cont2">
             <img src='google2.png' alt='google'></img>
        </div>
      </form>
      </div>     
    </div>
    <Footer />
    </div>
  );
};

export default StudentRegistration;
