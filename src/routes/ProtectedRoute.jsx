import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    // Redirect unauthenticated users to /login and preserve attempt location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
