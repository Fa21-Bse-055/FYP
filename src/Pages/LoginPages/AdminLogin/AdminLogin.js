import React, { useState } from 'react';
import Footer from '../../../Components/Footer/Footer';
import './AdminLogin.css';

function AdminLogin() {
    const [email, setEmail] = useState('');  // Manage email state
    const [password, setPassword] = useState('');  // Manage password state
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent form from reloading the page

        try {
            const response = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setSuccessMessage(`Logged in as SuperAdmin: ${data.msg}`);
                setErrorMessage('');  // Clear any error message on successful login
            } else {
                setErrorMessage(`Login failed: ${data.msg}`);
                setSuccessMessage('');  // Clear success message on failure
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
        <div className="login-container">
            <div className="login-box">
                <h1>Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // Update state on input change
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // Update state on input change
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLogin;
