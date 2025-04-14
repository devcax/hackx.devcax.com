import React from 'react';
import { TextField, Box } from '@mui/material';

const CustomTextField = ({ 
  icon: Icon,  // Pass the icon component as a prop
  label, 
  type, // Add type prop to check if it's a phone input
  ...props   // Spread other props like name, value, onChange, etc.
}) => {
  const inputBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: '12px',
    padding: '8px 12px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:focus-within': {
      boxShadow: '0 0 0 2px #8a5cf5',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    }
  };

  const iconStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    mr: 1.5,
    fontSize: '30px',
    transition: 'color 0.2s ease',
    '.MuiBox-root:focus-within &': {
      color: '#b39ddb'
    }
  };

  const inputStyle = {
    "& .MuiInput-root": {
      color: 'white',
      letterSpacing: props.name === 'phone' ? '0.5px' : 'normal', // Add letter spacing for phone numbers
    },
    "& .MuiInput-input": {
      padding: props.name === 'phone' ? '8px 0' : '6px 0', // Add more vertical padding for phone numbers
    },
    "& .MuiInputLabel-root": {
      color: 'rgba(255, 255, 255, 0.7)',
      transform: 'translate(0, 13.2px) scale(1)',
      transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      '&.Mui-focused': {
        color: '#b39ddb',
        fontWeight: 500,
      }
    },
    "& .MuiInputLabel-shrink": {
      color: '#b39ddb',
      fontWeight: 500,
      transform: 'translate(0, -1.5px) scale(0.75)',
    },
  };

  return (
    <Box sx={inputBoxStyle}>
      {Icon && <Icon sx={iconStyle} />}
      <TextField
        label={label}
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          ...(props.name === 'phone' && {
            inputProps: {
              style: { 
                letterSpacing: '0.5px',
                fontFamily: 'monospace' // Use monospace for phone numbers
              }
            }
          })
        }}
        sx={inputStyle}
        {...props}
      />
    </Box>
  );
};

export default CustomTextField; 