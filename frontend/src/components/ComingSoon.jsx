import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  IconButton,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  Alert,
  InputAdornment
} from '@mui/material';
import { 
  GitHub as GitHubIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Send as SendIcon,
  Email as EmailIcon,
  FaceBook as FaceBookIcon,
  YouTube as YoutubeIcon
} from '@mui/icons-material';
import { FaTiktok } from 'react-icons/fa';

const ComingSoon = ({ launchDate = new Date('2026-12-31'), title = "HackXLk" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(launchDate));
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Calculate time remaining until launch date
  function calculateTimeLeft(launchDate) {
    const difference = new Date(launchDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Update countdown every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(launchDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Handle email subscription
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here you would normally send this to your backend
    console.log('Email submitted:', email);
    
    // Show success message
    setSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  // Components for countdown timer
  const TimeUnit = ({ value, label }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mx: { xs: 1, md: 2 },
        animationName: 'pulse',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: 60, md: 90 },
          height: { xs: 60, md: 90 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          boxShadow: '0 8px 32px rgba(31, 41, 55, 0.2)',
          mb: 1,
        }}
      >
        <Typography 
          variant={isMobile ? "h4" : "h2"} 
          sx={{ 
            color: '#e2e8f0',
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Paper>
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#94a3b8',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        py: 4,
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
          opacity: 0.1,
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={6}>
            <Typography 
              variant={isMobile ? "h3" : "h1"} 
              component="h1"
              sx={{ 
                color: '#e2e8f0',
                fontWeight: 800,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: { xs: 2, md: 4 },
                textShadow: '0 4px 12px rgba(15, 23, 42, 0.5)',
              }}
            >
              {title}
            </Typography>
            
            <Typography 
              variant={isMobile ? "h5" : "h3"} 
              component="h2"
              sx={{ 
                color: '#64748b',
                fontWeight: 600,
                mb: 6,
                background: 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Coming Soon
            </Typography>
          </Box>
        </Fade>

        {/* Countdown Timer */}
        <Grow in={true} timeout={1500}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: 8,
              flexWrap: 'wrap',
            }}
          >
            {Object.keys(timeLeft).length > 0 ? (
              <>
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
              </>
            ) : (
              <Typography variant="h4" sx={{ color: '#e2e8f0' }}>
                We've Launched!
              </Typography>
            )}
          </Box>
        </Grow>

        

        {/* Social Links */}
        <Fade in={true} timeout={2500}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                mb: 2 
              }}
            >
              Follow us on social media for updates
            </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {[
                { icon: <FaceBookIcon />, label: 'Facebook', href: 'https://facebook.com' },
                { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com' },
                { icon: <YouTubeIcon />, label: 'YouTube', href: 'https://youtube.com' },
                { icon: <FaTiktok size={24} />, label: 'TikTok', href: 'https://tiktok.com' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  aria-label={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#64748b',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#e2e8f0',
                      transform: 'translateY(-3px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
      
      {/* Footer */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          width: '100%', 
          textAlign: 'center',
          py: 2,
        }}
      >
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          © {new Date().getFullYear()} {title}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoon; 