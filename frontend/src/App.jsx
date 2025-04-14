import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Page imports
import RegistrationForm from "./pages/RegistrationForm";
import AdminPortal from "./pages/AdminPortal";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ComingSoon from "./components/ComingSoon";
import NotFound from "./components/NotFound";

// Other components
import Navbar from "./components/layout/Navbar";

// Already in index.js: import { AuthProvider } from './context/AuthContext';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#8a5cf5',
      },
      secondary: {
        main: '#5869ff',
      },
      background: {
        default: '#0f172a',
        paper: '#1e293b',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/" element={<ComingSoon launchDate={new Date('2025-5-31')} title="hackx.lk" />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminPortal />} />
              {/* Add other admin routes here */}
            </Route>

            {/* Catch-all or Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
