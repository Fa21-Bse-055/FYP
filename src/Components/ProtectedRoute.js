import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ allowedRoles, redirectPath = '/' }) => {
  const { currentUser, loading, hasRole } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is not authenticated or doesn't have the required role, redirect
  if (!currentUser || !hasRole(allowedRoles)) {
    return <Navigate to={redirectPath} replace />;
  }

  // If user is authenticated and has the required role, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 