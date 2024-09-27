import axiosInstance from '@/hooks/axiosInstance'; // Import your Axios instance
import React, { createContext, useState, useEffect } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/rooms');
        setRooms(response.data.rooms);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err.response ? err.response.data.message : 'Error fetching rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Create room
  const createRoom = async (roomData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/rooms', roomData);
      setRooms((prevRooms) => [...prevRooms, response.data.room]);
      return response.data;
    } catch (err) {
      console.error('Error creating room:', err);
      setError(err.response ? err.response.data.message : 'Error creating room');
    } finally {
      setLoading(false);
    }
  };

  // Join room
  const joinRoom = async (roomId, passcode) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/rooms/${roomId}/join`, { passcode });
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === response.data.room._id ? response.data.room : room))
      );
      return response.data;
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.response ? err.response.data.message : 'Error joining room');
    } finally {
      setLoading(false);
    }
  };

  const isParticipant = (roomId, userId) => {
    const room = rooms.find(room => room._id === roomId);
    return room && room.participants.includes(userId);
  };

  // Leave room
const leaveRoom = async (roomId) => {
  try {
    await axiosInstance.post(`/rooms/${roomId}/leave`);
    // Optionally remove the room from the state
    setRooms((prevRooms) => 
      prevRooms.map((room) => {
        if (room._id === roomId) {
          return { ...room, participants: room.participants.filter(participant => participant !== user._id) }; // Update participants
        }
        return room;
      })
    );
  } catch (error) {
    setError(error.response ? error.response.data.message : 'Error leaving the room.');
  }
};


  // Send message
  const sendMessage = async (roomId, message) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/rooms/${roomId}/messages`, { text: message });
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.response ? err.response.data.message : 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoomContext.Provider value={{ rooms, loading, error, createRoom, joinRoom, isParticipant, leaveRoom, sendMessage }}>
      {children}
    </RoomContext.Provider>
  );
};
