import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const errorCodeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        delay: 0.1
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />

      {/* Animated elements */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ textAlign: 'center', py: 6 }}>
            {/* 404 Error Code */}
            <motion.div
              variants={errorCodeVariants}
              animate={['visible', 'pulse']}
            >
              <Paper
                elevation={24}
                sx={{
                  display: 'inline-block',
                  py: 3,
                  px: 6,
                  mb: 4,
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  borderRadius: 4,
                  border: '1px solid rgba(138, 92, 245, 0.3)',
                  boxShadow: '0 0 30px rgba(138, 92, 245, 0.2)',
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #8a5cf5 0%, #5869ff 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: 4
                  }}
                >
                  404
                </Typography>
              </Paper>
            </motion.div>
            
            {/* Error message */}
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#e2e8f0', 
                  mb: 2,
                  fontWeight: 600 
                }}
              >
                Page Not Found
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#94a3b8', 
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </Typography>
            </motion.div>
            
            {/* Action buttons */}
            <motion.div variants={itemVariants}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  background: 'linear-gradient(135deg, #8a5cf5 0%, #5869ff 100%)',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: '0 4px 20px rgba(88, 105, 255, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7a4ce5 0%, #4859ff 100%)',
                    boxShadow: '0 6px 25px rgba(88, 105, 255, 0.4)',
                  }
                }}
              >
                Return Home
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
      
      {/* Decorative elements */}
      <Box sx={{ position: 'absolute', opacity: 0.4, bottom: -120, left: -120 }}>
        <svg width="400" height="400" viewBox="0 0 200 200">
          <motion.path
            d="M 0, 100 C 0, 0 100, 0 100, 100 S 200, 200 200, 100 150, 0 100, 0 50, 100 0, 100"
            fill="none"
            stroke="rgba(138, 92, 245, 0.6)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.6,
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: 'reverse' } 
            }}
          />
        </svg>
      </Box>
      
      <Box sx={{ position: 'absolute', opacity: 0.4, top: -120, right: -120 }}>
        <svg width="400" height="400" viewBox="0 0 200 200">
          <motion.path
            d="M 0, 100 C 0, 0 100, 0 100, 100 S 200, 200 200, 100 150, 0 100, 0 50, 100 0, 100"
            fill="none"
            stroke="rgba(88, 105, 255, 0.6)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.6,
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: 'reverse', delay: 1.5 } 
            }}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default NotFound; 