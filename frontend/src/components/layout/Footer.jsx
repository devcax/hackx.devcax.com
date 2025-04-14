import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ 
       
        bottom: 0,
        width: '100%',
        py: 2,
        // background: 'linear-gradient(90deg, rgba(88, 28, 135, 0.65), rgba(37, 99, 235, 0.65))',
        // backdropFilter: 'blur(10px)',
        // borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        // boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.2)',
        textAlign: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
      <Typography variant="caption" sx={{ color: '#64748b' }}>
           © {new Date().getFullYear()} hackx.lk. All rights reserved.
           
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 