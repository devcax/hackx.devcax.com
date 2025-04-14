import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar 
      position="fixed" 
      elevation={1}
      sx={{
        background: 'linear-gradient(90deg, rgba(88, 28, 135, 0.65), rgba(37, 99, 235, 0.65))',
        paddingX: '100px',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            color: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          HackX
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          sx={{ 
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.95)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.25)'
            }
          }}
        >
          Register
        </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 