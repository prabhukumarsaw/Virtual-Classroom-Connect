// src/components/ProtectedRoomRoute.js
import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { RoomContext } from '@/context/RoomContext'; // Import RoomContext
import Spinner from '../components/Spinner';

const ProtectedRoomRoute = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { loading: roomLoading } = useContext(RoomContext);
  const { roomId } = useParams();

  // While loading authentication status or room data
  if (authLoading || roomLoading) {
    return <Spinner />;
  }

  // If the user is authenticated and a participant, render the children
  if (roomId ) {
    return children;
  }

  // If not authenticated or not a participant, redirect to the home page
  return <Navigate to="/" replace />;
};

export default ProtectedRoomRoute;
