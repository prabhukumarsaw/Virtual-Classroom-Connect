import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (<Spinner />)
  }

  if (user) {
    return children;
  }

  return (<Navigate to="/" state={{ from: location }} replace />)
};

export default PrivateRouter;
