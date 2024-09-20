import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AuthContext } from '@/context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // While loading authentication status
  if (loading) {
    return <Spinner />;
  }

  // If the user is authenticated, render the children
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login page
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
