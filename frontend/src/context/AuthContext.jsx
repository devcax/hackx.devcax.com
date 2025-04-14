import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient'; // Update this path if needed

export const AuthContext = createContext(null); // Provide a default value (can be null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Initialize token as null
  const [isAdmin, setIsAdmin] = useState(false); // Initialize isAdmin as false
  const [loading, setLoading] = useState(true); // Start loading

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('adminToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAdmin(true);
        // Set default token in apiClient headers
        apiClient.defaults.headers.common['x-auth-token'] = storedToken;
      }
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
      // Handle potential localStorage access errors (e.g., in private browsing)
    } finally {
      setLoading(false); // Set loading to false *after* checking token
    }
  }, []);

  const login = (newToken) => {
    try {
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setIsAdmin(true);
      // Set auth header for subsequent requests
      apiClient.defaults.headers.common['x-auth-token'] = newToken;
      console.log('Auth token set in login:', newToken);
    } catch (error) {
      console.error("Error writing token to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('adminToken');
      setToken(null);
      setIsAdmin(false);
      // Remove auth header
      delete apiClient.defaults.headers.common['x-auth-token'];
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    auth: { token, isAdmin }, // Package token and isAdmin in an auth object
    token, // Keep individual values for backward compatibility
    isAdmin,
    login,
    logout,
    loading
  }), [token, isAdmin, loading]);

  // Always render the provider, pass loading state down
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 