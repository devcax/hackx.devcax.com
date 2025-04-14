import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, CircularProgress, Alert } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext
import apiClient from '../utils/apiClient';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/api/auth/login', { username, password });
      const { token } = response.data;
      login(token); // Update auth context
      navigate('/admin'); // Redirect to admin panel
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <LockOpenIcon sx={{ fontSize: 50, color: '#5869ff', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#e2e8f0', mb: 3, fontWeight: 600 }}>
            Admin Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              InputProps={{
                disableUnderline: true,
                sx: { 
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  '&.Mui-focused': { backgroundColor: 'rgba(255, 255, 255, 0.12)' },
                }
              }}
              InputLabelProps={{
                sx: { 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': { color: '#b39ddb' }
                }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                disableUnderline: true,
                sx: { 
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  '&.Mui-focused': { backgroundColor: 'rgba(255, 255, 255, 0.12)' },
                }
              }}
              InputLabelProps={{
                sx: { 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': { color: '#b39ddb' }
                }
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2, textAlign: 'left', background: 'rgba(211, 47, 47, 0.2)', color: '#f87171' }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 8,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #8a5cf5, #5869ff)',
                boxShadow: '0 5px 15px rgba(138, 92, 245, 0.2)',
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: '0 8px 20px rgba(138, 92, 245, 0.3)',
                  background: 'linear-gradient(45deg, #9b6eff, #677aff)',
                },
                "&.Mui-disabled": {
                  background: 'rgba(138, 92, 245, 0.3)',
                  boxShadow: 'none',
                  cursor: 'not-allowed'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AdminLogin; 