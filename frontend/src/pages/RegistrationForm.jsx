import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
  useTheme,
  alpha,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import TeamMemberForm from "../components/TeamMemberForm";
import { teamService } from "../services/api";
import CustomTextField from "../components/CustomTextField";
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from "../components/layout/Footer";
import RegistrationSuccess from "../components/RegistrationSuccess";

const StepCircle = ({ number, active, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        background: active 
          ? 'linear-gradient(135deg, #8a5cf5, #5869ff)' 
          : 'rgba(48, 28, 100, 0.9)',
        boxShadow: active ? '0 0 15px rgba(138, 92, 245, 0.6)' : '0 2px 4px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: onClick ? 'scale(1.05)' : 'none',
          boxShadow: onClick 
            ? (active ? '0 0 20px rgba(138, 92, 245, 0.8)' : '0 4px 8px rgba(0,0,0,0.3)')
            : (active ? '0 0 15px rgba(138, 92, 245, 0.6)' : '0 2px 4px rgba(0,0,0,0.2)'),
        }
      }}
    >
      {number}
    </Box>
  );
};

const RegistrationForm = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Team Name', 'Team Leader', 'Team Members'];

  const [formData, setFormData] = useState({
    teamName: "",
    captain: {
      name: "",
      email: "",
      phone: "",
    },
    members: [{ name: "", email: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Add new refs and state for the mouse effect
  const paperRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement over the paper component
  const handleMouseMove = (e) => {
    if (!paperRef.current) return;
    
    const rect = paperRef.current.getBoundingClientRect();
    
    // Calculate position relative to the paper element
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Calculate the center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate how far from center (from -1 to 1)
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Handle mouse enter/leave events
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset transformation when mouse leaves
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate transformation values based on mouse position
  const getTransform = () => {
    if (!isHovering) return '';
    
    // Further reduced intensity values for a very subtle effect
    const rotateX = mousePosition.y * -1.5; // Minimal vertical tilt
    const rotateY = mousePosition.x * 1.5;  // Minimal horizontal tilt
    const scaleFactor = 1.003; // Very slight scale increase
    
    return `
      perspective(1500px) // Increased perspective for subtlety
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scaleFactor})
    `;
  };

  // Maximum number of additional team members allowed
  const MAX_TEAM_MEMBERS = 4;

  const handlePhoneFocus = () => {
    if (!formData.captain.phone.startsWith("+94 ")) {
      setFormData({
        ...formData,
        captain: {
          ...formData.captain,
          phone: "+94 " + formData.captain.phone.replace(/^\+94\s?/, ""),
        },
      });
    }
  };

  const handlePhoneBlur = () => {
    if (formData.captain.phone === "+94 " || formData.captain.phone === "+94") {
      setFormData({
        ...formData,
        captain: {
          ...formData.captain,
          phone: "",
        },
      });
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters except the +94 prefix
    let cleaned = value.replace(/[^\d+]/g, "");
    
    // Ensure the number starts with +94
    if (!cleaned.startsWith("+94")) {
      cleaned = "+94" + cleaned.replace(/^\+94/, "");
    }
    
    // Limit to 9 digits after +94
    if (cleaned.length > 12) { // +94 + 9 digits
      cleaned = cleaned.slice(0, 12);
    }
    
    // Format as 71 993 8765
    if (cleaned.length > 3) {
      let number = cleaned.slice(3); // Remove +94
      let parts = [];
      
      // First 2 digits
      if (number.length > 0) {
        parts.push(number.slice(0, 2));
      }
      // Next 3 digits
      if (number.length > 2) {
        parts.push(number.slice(2, 5));
      }
      // Last 4 digits
      if (number.length > 5) {
        parts.push(number.slice(5, 9));
      }
      
      cleaned = "+94 " + parts.join(" ");
    }
    
    return cleaned;
  };

  const handleCaptainChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      // Format phone number while typing
      const formattedValue = formatPhoneNumber(value);
      setFormData({
        ...formData,
        captain: {
          ...formData.captain,
          [name]: formattedValue,
        },
      });
      return;
    }
    
    setFormData({
      ...formData,
      captain: {
        ...formData.captain,
        [name]: value,
      },
    });
  };

  const handleTeamNameChange = (e) => {
    setFormData({
      ...formData,
      teamName: e.target.value,
    });
  };

  const handleAddMember = () => {
    if (formData.members.length < MAX_TEAM_MEMBERS) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: "", email: "" }],
      });
    } else {
      setNotification({
        open: true,
        message: `Maximum of ${MAX_TEAM_MEMBERS} team members allowed.`,
        severity: "warning",
      });
    }
  };

  const handleMemberChange = (index, name, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      members: updatedMembers,
    });
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      members: updatedMembers,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  const validateStep = (step) => {
    const errors = [];

    switch (step) {
      case 0:
        if (!formData.teamName.trim()) {
          errors.push("Team name is required");
        }
        break;
      case 1:
        if (!formData.captain.name.trim()) {
          errors.push("Team leader name is required");
        }
        
        const phoneDigits = formData.captain.phone.replace(/[^\d]/g, "");
        if (!formData.captain.phone.trim()) {
          errors.push("Phone number is required");
        } else if (phoneDigits.length !== 11) { // +94 + 9 digits
          errors.push("Phone number must be 9 digits (e.g., 71 993 8765)");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.captain.email.trim()) {
          errors.push("Team leader email is required");
        } else if (!emailRegex.test(formData.captain.email)) {
          errors.push("Please enter a valid email address (e.g., name@example.com)");
        }
        break;
      case 2:
        // Validate team members
        formData.members.forEach((member, index) => {
          if (!member.name.trim()) {
            errors.push(`Team member ${index + 1}: Name is required`);
          }
          if (!member.email.trim()) {
            errors.push(`Team member ${index + 1}: Email is required`);
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            errors.push(`Team member ${index + 1}: Please enter a valid email address`);
          }
        });
        break;
      default:
        return true;
    }

    if (errors.length > 0) {
      setNotification({
        open: true,
        message: errors.join("\n"),
        severity: "error",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const handleResetForm = () => {
    setFormData({
      teamName: "",
      captain: {
        name: "",
        email: "",
        phone: "",
      },
      members: [{ name: "", email: "" }],
    });
    setActiveStep(0);
    setIsSubmittedSuccessfully(false);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateStep(activeStep)) {
      return;
    }

    setLoading(true);

    try {
      await teamService.createTeam(formData);
      setIsSubmittedSuccessfully(true);
    } catch (error) {
      setNotification({
        open: true,
        message: `Registration failed: ${
          error.response?.data?.message || "Unknown error"
        }`,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step content rendering
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                Choose your Team Name
              </Typography>
              
              <CustomTextField
                icon={GroupIcon}
                label="Team Name"
                name="teamName"
                value={formData.teamName}
                onChange={handleTeamNameChange}
                autoFocus
              />
            </Box>
          </Fade>
        );
      case 1:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                Team Leader Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item size={12}>
                  <CustomTextField
                    icon={PersonIcon}
                    label="Leader Name"
                    name="name"
                    value={formData.captain.name}
                    onChange={handleCaptainChange}
                  />
                </Grid>
                <Grid item size={{xs: 12, sm: 6}}>
                  <CustomTextField
                    icon={PhoneIcon}
                    label="Phone Number"
                    name="phone"
                    value={formData.captain.phone}
                    onChange={handleCaptainChange}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                  />
                </Grid>
                <Grid item size={{xs: 12, sm: 6}}>
                  <CustomTextField
                    icon={EmailIcon}
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.captain.email}
                    onChange={handleCaptainChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                Team Members {formData.members.length > 0 && `(${formData.members.length}/${MAX_TEAM_MEMBERS})`}
              </Typography>
              
              <AnimatePresence initial={false}>
                {formData.members.map((member, index) => (
                  <TeamMemberForm
                    key={index}
                    member={member}
                    index={index}
                    onChange={handleMemberChange}
                    onRemove={handleRemoveMember}
                  />
                ))}
              </AnimatePresence>

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddMember}
                disabled={formData.members.length >= MAX_TEAM_MEMBERS}
                sx={{
                  mt: 2,
                  borderRadius: 8,
                  px: 3,
                  py: 1,
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  transition: "all 0.3s ease",
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Add Team Member
              </Button>
            </Box>
          </Fade>
        );
      default:
        return "Unknown step";
    }
  };
  
  // Custom stepper component
  const renderStepper = () => {
    const handleStepClick = (index) => {
      // Allow navigation only to previous steps
      if (index < activeStep) {
        setActiveStep(index);
      }
    };
    
    const numSteps = steps.length;
    const numGaps = numSteps > 1 ? numSteps - 1 : 1; // Avoid division by zero if only 1 step

    return (
      <Box sx={{ 
        width: '100%', 
        mb: 5, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          width: '80%',
          maxWidth: 500,
          my: 3
        }}>
          {/* Background line */}
          <Box sx={{
            position: 'absolute',
            left: 25,
            right: 25,
            top: 25, // Positioned at the center of the 50px high circles
            height: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            zIndex: 0
          }} />
          
          {/* Active line */}
          <Box sx={{
            position: 'absolute',
            left: 25,
            // Calculate width based on the proportion of the total line span
            width: activeStep === 0 ? 0 : `calc((100% - 50px) * ${activeStep} / ${numGaps})`, 
            top: 25, // Positioned at the center of the 50px high circles
            height: 3,
            background: 'linear-gradient(90deg, #8a5cf5, #5869ff)',
            zIndex: 1,
            transition: 'width 0.5s ease-in-out'
          }} />
          
          {steps.map((label, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2
            }}>
              <StepCircle 
                number={index + 1} 
                active={index <= activeStep} 
                onClick={index < activeStep ? () => handleStepClick(index) : undefined}
              />
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: index <= activeStep ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  fontWeight: index <= activeStep ? 500 : 400,
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '60px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(88, 28, 135, 0.15), transparent 70%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15), transparent 70%)',
          zIndex: 0
        }
      }}
    >
      <Button 
        component={Link} 
        to="/"
        startIcon={<ArrowBackIcon />} 
        sx={{
          position: 'absolute',
          top: 24, 
          left: 24,
          color: 'rgba(255, 255, 255, 0.7)',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }
        }}
      >
        Home
      </Button>

      <Container maxWidth="md" sx={{ py: 6, position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {isSubmittedSuccessfully ? (
            <motion.div key="success">
              <RegistrationSuccess onRegisterAnother={handleResetForm} />
            </motion.div>
          ) : (
            <motion.div key="form">
              <Paper
                elevation={24}
                ref={paperRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 5,
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease, border 0.3s ease",
                  transform: getTransform(),
                  willChange: 'transform',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 5,
                    background: `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(255, 255, 255, 0.03), transparent 60%)`,
                    opacity: isHovering ? 1 : 0,
                    transition: 'opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    willChange: 'opacity',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  align="center"
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    color: '#e2e8f0',
                    textShadow: '0 0 20px rgba(148, 163, 184, 0.2)',
                  }}
                >
                  Team Registration
                </Typography>

                {/* Stepper */}
                {renderStepper()}

                {/* Step Content */}
                <Box sx={{ minHeight: '180px', mb: 4 }}>
                  {getStepContent(activeStep)}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: activeStep > 0 ? 'space-between' : 'flex-end',
                  mt: 4 
                }}>
                  {/* Back Button */}
                  {activeStep > 0 && (
                     <Button
                      onClick={handleBack}
                      variant="outlined"
                      sx={{
                        borderRadius: 8,
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.6)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Back
                    </Button>
                  )}

                  {/* Next / Submit Button */}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      disabled={loading}
                      sx={{
                        borderRadius: 8,
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #8a5cf5, #5869ff)',
                        boxShadow: '0 10px 20px rgba(138, 92, 245, 0.3)',
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: '0 15px 25px rgba(138, 92, 245, 0.4)',
                          background: 'linear-gradient(45deg, #9b6eff, #677aff)',
                        },
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : "Register Team"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        borderRadius: 8,
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #8a5cf5, #5869ff)',
                        boxShadow: '0 10px 20px rgba(138, 92, 245, 0.3)',
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: '0 15px 25px rgba(138, 92, 245, 0.4)',
                          background: 'linear-gradient(45deg, #9b6eff, #677aff)',
                        },
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="standard"
          sx={{ 
            width: "100%", 
            backdropFilter: "blur(10px)",
            background: notification.severity === "success" 
              ? "linear-gradient(90deg, rgba(0, 176, 80, 0.65), rgba(0, 230, 118, 0.65))"
              : notification.severity === "error"
              ? "linear-gradient(90deg, rgba(211, 47, 47, 0.65), rgba(239, 83, 80, 0.65))"
              : notification.severity === "warning"
              ? "linear-gradient(90deg, rgba(237, 108, 2, 0.65), rgba(255, 152, 0, 0.65))"
              : "linear-gradient(90deg, rgba(41, 121, 255, 0.65), rgba(66, 165, 245, 0.65))",
            borderLeft: notification.severity === "success" 
              ? "4px solid rgb(0, 200, 83)"
              : notification.severity === "error"
              ? "4px solid rgb(211, 47, 47)"
              : notification.severity === "warning"
              ? "4px solid rgb(255, 152, 0)"
              : "4px solid rgb(66, 165, 245)",
            boxShadow: notification.severity === "success" 
              ? "0 8px 20px rgba(0, 176, 80, 0.3)"
              : notification.severity === "error"
              ? "0 8px 20px rgba(211, 47, 47, 0.3)"
              : notification.severity === "warning"
              ? "0 8px 20px rgba(255, 152, 0, 0.3)"
              : "0 8px 20px rgba(66, 165, 245, 0.3)",
            color: "white",
            fontWeight: 500,
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "white"
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      
      <Footer />
    </Box>
  );
};

export default RegistrationForm;