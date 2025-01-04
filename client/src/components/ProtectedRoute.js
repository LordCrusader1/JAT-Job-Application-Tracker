import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);  // Access auth state from context

  // If there's no token, redirect to login page
  return auth.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


