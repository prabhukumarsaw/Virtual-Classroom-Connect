import axiosInstance from '@/hooks/axiosInstance';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axiosInstance.get('/profile');
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching auth status:', error);
          localStorage.removeItem('token'); // Token may be invalid, remove it
        }
      } else {
        // No token, user not authenticated
        setUser(null);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post('/login', formData);
      localStorage.setItem('token', response.data.token); // Save token in localStorage
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/logout');
      localStorage.removeItem('token'); // Remove token from localStorage
      axiosInstance.defaults.headers.common['Authorization'] = null;
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

 
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
