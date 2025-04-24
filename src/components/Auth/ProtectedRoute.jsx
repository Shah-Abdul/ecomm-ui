// src/components/auth/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state while authentication is being checked
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If admin access is required, check user role
  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;