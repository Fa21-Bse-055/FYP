import React, { useState, useEffect } from 'react';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import './AdminLogin.css';
import { Navigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');  
    const [loginSucess, setLoginSucess] = useState(false);

    // Add animation for particles
    useEffect(() => {
        const particles = Array.from({ length: 20 }).map((_, i) => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            return particle;
        });

        const container = document.querySelector('.login-container');
        particles.forEach(particle => container.appendChild(particle));

        return () => {
            particles.forEach(particle => {
                if (particle.parentNode === container) {
                    container.removeChild(particle);
                }
            });
        };
    }, []);

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
                console.log("sucess :"+data);
                setLoginSucess(true);
             
            } else {
                console.log("error :"+data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if(loginSucess){
        return <Navigate to="/adminPage" />;
    }

    return (
        <div>
            <div className="login-container">
                <AuthNavigation />
                <div className="login-box">
                    <h1>Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            <span>Login</span>
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLogin;
