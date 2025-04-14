import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  
  // Handle the case when context is null (initial state)
  if (!auth) {
    // Show a loading spinner until context is initialized
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: '#0f172a' 
        }}
      >
        <CircularProgress color="secondary" />
        <Typography sx={{ mt: 2, color: '#94a3b8' }}>Loading...</Typography>
      </Box>
    );
  }
  
  const { isAdmin, loading } = auth;

  // If auth is loading, show loading indicator
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: '#0f172a' 
        }}
      >
        <CircularProgress color="secondary" />
        <Typography sx={{ mt: 2, color: '#94a3b8' }}>Checking authentication...</Typography>
      </Box>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute; 