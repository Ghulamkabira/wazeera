// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessTokens');

  if (!accessToken) {
    // If no access token is found, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
