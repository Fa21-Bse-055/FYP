import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../Components/context/AuthContext';
import Footer from '../../../Components/Footer/Footer';
import AuthNavigation from '../../../Components/AuthNavigation/AuthNavigation';
import './AdminLogin.css';

function AdminLogin() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, hasRole } = useAuth();

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
        if (container) {
            particles.forEach(particle => container.appendChild(particle));

            return () => {
                particles.forEach(particle => {
                    if (particle.parentNode === container) {
                        container.removeChild(particle);
                    }
                });
            };
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password, 'admin');
            
            if (!result.success) {
                setError(result.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('Connection error. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    // Redirect if already authenticated as admin or super-admin
    if (isAuthenticated() && hasRole(['admin', 'super-admin'])) {
        return <Navigate to="/adminPage" />;
    }

    return (
        <div>
            <div className="login-container">
                <AuthNavigation />
                <div className="login-box">
                    <h1>Admin Login</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
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
                                disabled={loading}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={loading}
                        >
                            <span>{loading ? 'Logging in...' : 'Login'}</span>
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLogin;
