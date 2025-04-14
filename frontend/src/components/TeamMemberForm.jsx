import React from 'react';
import { IconButton, Grid, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CustomTextField from './CustomTextField';
import { motion } from 'framer-motion';

const TeamMemberForm = ({ member, index, onChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box sx={{ 
        mb: 3, 
        p: 3, 
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: 2, 
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        overflow: 'hidden'
      }}>
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
          Team Member {index + 1}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item size={{xs: 12, sm: 6}}>
            <CustomTextField
              icon={PersonIcon}
              label="Name"
              name="name"
              value={member.name || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item size={{xs: 12, sm: 6}}>
            <CustomTextField
              icon={EmailIcon}
              label="Email"
              name="email"
              type="email"
              value={member.email || ''}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        
        {index > 0 && (
          <IconButton 
            aria-label="delete" 
            onClick={() => onRemove(index)}
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ff4d4d'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </motion.div>
  );
};

export default TeamMemberForm;
