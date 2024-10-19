import React from 'react';
import Footer from '../../Components/Footer/Footer';
import './Login.css'; 

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label>Email address</label>
            <input type="email" placeholder="Enter your email" required/>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required/>
          </div>
          {/* <div className="otp-group">
            {[...Array(6)].map((_, index) => (
              <input type="text" key={index} maxLength="1" className="otp-input" />
            ))}
          </div> */}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="forgot-password">
          Forgot your password? <a href="#">Click here.</a>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
