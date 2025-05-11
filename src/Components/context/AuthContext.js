import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [certificate , setCertificate] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    // Check for existing token in cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setLoading(false);
    } else {
      setCurrentUser(null);
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password, role) => {
    try {
      let endpoint;
      
      // Determine the correct login endpoint based on role
      if (role === 'admin') {
        endpoint = 'http://localhost:3000/api/admin/login';
      } else if (role === 'organization') {
        endpoint = 'http://localhost:3000/api/users/login';
      } else {
        return { success: false, error: 'Invalid role specified' };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.msg || 'Login failed' };
      }

      // Get user data from response
      const data = await response.json();
      console.log("Login response:", data);

// Check if organization account is verified
if (role === 'organization' && data.user.is_verified === false) {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return { success: false, error: 'Account not verified. Please check your email for verification link.' };
}

// Check if organization is approved by admin
if (role === 'organization' && data.user.is_approved === false) {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return { success: false, error: 'Your account is pending admin approval. Please wait for approval to login.' };
}


      // Set user data based on response
      if (role === 'admin') {
        setCurrentUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role, // Use role from backend
          username: data.user.name
        });
        navigate('/adminPage');
      } else if (role === 'organization') {
        setCurrentUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role, // Use role from backend
          organization_name: data.user.name
        });
        navigate('/dashboard');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (currentUser && currentUser.role === 'admin' || currentUser.role === 'super-admin') {
        await fetch('http://localhost:3000/api/admin/logout', {
          method: 'GET',
          credentials: 'include'
        });
      }
      
      // Clear cookies manually
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      setCurrentUser(null);
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the server request fails, clear the local state
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setCurrentUser(null);
      navigate('/');
      return { success: true };
    }
  };

  // Check if user has a specific role
  const hasRole = (roles) => {
    if (!currentUser) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(currentUser.role);
    }
    
    return currentUser.role === roles;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Value object to be provided to consumers
  const value = {
    currentUser,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated,
    toggle,
    setToggle,
    certificate,
    setCertificate
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 