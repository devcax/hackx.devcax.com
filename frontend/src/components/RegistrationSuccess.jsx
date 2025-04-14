import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegistrationSuccess = ({ onRegisterAnother }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Paper
        elevation={10}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(21, 128, 61, 0.2) 100%)',
          backdropFilter: "blur(10px)",
          border: '1px solid rgba(74, 222, 128, 0.3)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#4ade80' }} />
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{
            color: '#f0fdf4',
            fontWeight: 600,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Registration Successful!
        </Typography>
        <Typography sx={{ color: '#dcfce7', maxWidth: 400, mb: 2 }}>
          Your team has been successfully registered. We'll be in touch soon.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={onRegisterAnother}
            sx={{
              background: 'linear-gradient(45deg, #8a5cf5, #5869ff)',
              boxShadow: '0 5px 15px rgba(138, 92, 245, 0.2)',
              borderRadius: 8,
              px: 3,
              py: 1,
              fontWeight: 600,
              "&:hover": {
                background: 'linear-gradient(45deg, #9b6eff, #677aff)',
                boxShadow: '0 8px 20px rgba(138, 92, 245, 0.3)',
              }
            }}
          >
            Register Another Team
          </Button>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              borderRadius: 8,
              px: 3,
              py: 1,
              fontWeight: 600,
              "&:hover": {
                borderColor: 'rgba(255, 255, 255, 0.6)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default RegistrationSuccess; 