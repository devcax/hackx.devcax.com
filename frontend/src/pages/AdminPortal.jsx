import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Tooltip,
  Collapse,
  Fade,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Badge,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Popover,
  Chip
} from '@mui/material';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import _ from 'lodash';
import apiClient from '../utils/apiClient';
import { AuthContext } from '../context/AuthContext';

// Drawer width
const drawerWidth = 280;

const TeamRow = ({ team, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow 
        sx={{ 
          '& > *': { borderBottom: 'unset' },
          transition: 'background-color 0.2s',
          '&:hover': { 
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          }
        }}
      >
        <TableCell sx={{ width: '48px', p: 1 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ 
              color: 'primary.light',
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {team.teamName}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {team.captain.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {team.captain.email}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {team.captain.phone}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Delete Team">
            <IconButton 
              onClick={() => onDelete(team._id)} 
              size="small" 
              sx={{ 
                color: 'error.main',
                '&:hover': { 
                  backgroundColor: 'rgba(244, 67, 54, 0.08)',
                  transform: 'scale(1.1)'
                },
                transition: 'transform 0.2s'
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box 
              sx={{ 
                m: 2,
                p: 3, 
                backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                borderRadius: 2,
                borderLeft: '4px solid',
                borderLeftColor: 'primary.main',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                component="div" 
                sx={{ 
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <GroupsIcon fontSize="small" color="primary" />
                Team Members 
                <Badge 
                  badgeContent={team.members?.length || 0} 
                  color="primary"
                  sx={{ ml: 1 }}
                />
              </Typography>
              
              {team.members && team.members.length > 0 ? (
                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                  <Table size="small" aria-label="team members">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'text.disabled', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>Name</TableCell>
                        <TableCell sx={{ color: 'text.disabled', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {team.members.map((member, index) => (
                        <TableRow 
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            transition: 'background-color 0.2s',
                            '&:hover': { 
                              backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            }
                          }}
                        >
                          <TableCell 
                            component="th" 
                            scope="row"
                            sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}
                          >
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                              {member.name}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {member.email}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.disabled', 
                    fontStyle: 'italic',
                    mt: 1 
                  }}
                >
                  No additional members.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const AdminPortal = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth, logout, token } = useContext(AuthContext);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  
  // New state for controlling active section and drawer
  const [activeSection, setActiveSection] = useState('teams');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    hasMembers: false,
    noMembers: false,
  });
  const [activeFilters, setActiveFilters] = useState([]);
  
  // For responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filtered teams based on search and filters
  const filteredTeams = useMemo(() => {
    let result = [...teams];
    
    // Apply search filter
    if (searchQuery) {
      result = _.filter(result, (team) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          team.teamName?.toLowerCase().includes(searchLower) ||
          team.captain?.name?.toLowerCase().includes(searchLower) ||
          team.captain?.email?.toLowerCase().includes(searchLower) ||
          team.captain?.phone?.includes(searchQuery) ||
          _.some(team.members || [], member => 
            member.name?.toLowerCase().includes(searchLower) || 
            member.email?.toLowerCase().includes(searchLower)
          )
        );
      });
    }
    
    // Apply other filters
    if (filters.hasMembers) {
      result = _.filter(result, team => (team.members?.length || 0) > 0);
    }
    
    if (filters.noMembers) {
      result = _.filter(result, team => !(team.members?.length || 0) > 0);
    }
    
    return result;
  }, [teams, searchQuery, filters]);

  // Update active filters count
  useEffect(() => {
    const newActiveFilters = [];
    if (filters.hasMembers) newActiveFilters.push('Has Members');
    if (filters.noMembers) newActiveFilters.push('No Members');
    setActiveFilters(newActiveFilters);
  }, [filters]);

  const fetchTeams = async () => {
    if (!autoRefresh) setLoading(true);
    setError('');
    try {
      const currentToken = token || auth?.token;
      
      
      const response = await apiClient.get('/api/teams');
      
      
      setTeams(response.data);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Fetch teams error:', err.response?.data || err.message);
      setError(`Failed to fetch teams: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentToken = token || auth?.token;
    
    if (currentToken) {
      fetchTeams();
    } else {
      setError('Authentication token missing. Please log in again.');
      setLoading(false);
    }
  }, [token, auth?.token]);

  useEffect(() => {
    const currentToken = token || auth?.token;
    let intervalId = null;
    if (autoRefresh && currentToken) {
      intervalId = setInterval(() => {
        
        fetchTeams();
      }, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    }; 
  }, [autoRefresh, token, auth?.token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await apiClient.delete(`/api/teams/${id}`);
        setTeams(teams.filter((team) => team._id !== id));
      } catch (err) {
        setError('Failed to delete team.');
        console.error('Delete team error:', err);
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery(''); // Clear search when closing
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const clearFilters = () => {
    setFilters({
      hasMembers: false,
      noMembers: false,
    });
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const isFilterOpen = Boolean(filterAnchorEl);

  // Sidebar component
  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#111827' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <NightlightIcon color="primary" /> Admin Dashboard
        </Typography>
        {isMobile && (
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <List sx={{ px: 1 }}>
          <ListItemButton
            selected={activeSection === 'teams'}
            onClick={() => handleSectionChange('teams')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: 'rgba(99, 102, 241, 0.15)',
                '&:hover': {
                  bgcolor: 'rgba(99, 102, 241, 0.25)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: 4,
                  bgcolor: 'primary.main',
                  borderRadius: '0 4px 4px 0'
                }
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: activeSection === 'teams' ? 'primary.main' : 'text.secondary' }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Registered Teams" 
              primaryTypographyProps={{ 
                fontSize: 15,
                fontWeight: activeSection === 'teams' ? 600 : 400,
                color: activeSection === 'teams' ? 'white' : 'text.secondary'
              }} 
            />
            <Badge badgeContent={teams?.length || 0} color="primary" />
          </ListItemButton>
          
          <ListItemButton
            selected={activeSection === 'proposals'}
            onClick={() => handleSectionChange('proposals')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: 'rgba(99, 102, 241, 0.15)',
                '&:hover': {
                  bgcolor: 'rgba(99, 102, 241, 0.25)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: 4,
                  bgcolor: 'primary.main',
                  borderRadius: '0 4px 4px 0'
                }
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: activeSection === 'proposals' ? 'primary.main' : 'text.secondary' }}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Proposals" 
              primaryTypographyProps={{ 
                fontSize: 15,
                fontWeight: activeSection === 'proposals' ? 600 : 400,
                color: activeSection === 'proposals' ? 'white' : 'text.secondary'
              }} 
            />
          </ListItemButton>
          
          <ListItemButton
            selected={activeSection === 'settings'}
            onClick={() => handleSectionChange('settings')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: 'rgba(99, 102, 241, 0.15)',
                '&:hover': {
                  bgcolor: 'rgba(99, 102, 241, 0.25)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: 4,
                  bgcolor: 'primary.main',
                  borderRadius: '0 4px 4px 0'
                }
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: activeSection === 'settings' ? 'primary.main' : 'text.secondary' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Site Settings" 
              primaryTypographyProps={{ 
                fontSize: 15,
                fontWeight: activeSection === 'settings' ? 600 : 400,
                color: activeSection === 'settings' ? 'white' : 'text.secondary'
              }} 
            />
          </ListItemButton>
        </List>
      </Box>
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        p: 2, 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <FormControlLabel
          control={
            <Switch 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Auto Refresh
            </Typography>
          }
        />
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ 
            mt: 2,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0f172a' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ 
            flexGrow: 1, 
            color: 'white',
            fontWeight: 600
          }}>
            {activeSection === 'teams' && 'Registered Teams'}
            {activeSection === 'proposals' && 'Proposals'}
            {activeSection === 'settings' && 'Site Settings'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search Box */}
            <Collapse in={isSearchOpen} orientation="horizontal">
              <TextField
                size="small"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  width: { xs: '180px', sm: '220px' },
                  mr: 1,
                  '.MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton 
                        size="small" 
                        onClick={() => setSearchQuery('')}
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { 
                    color: 'white', 
                    fontSize: '0.875rem',
                  }
                }}
              />
            </Collapse>
            
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={fetchTeams} 
                disabled={loading && !autoRefresh}
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                  height: 40,
                  width: 40
                }}
              >
                {loading && !autoRefresh ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <RefreshIcon />
                )}
              </IconButton>
            </Tooltip>
            
            <Tooltip title={isSearchOpen ? "Close Search" : "Search"}>
              <IconButton 
                onClick={handleSearchToggle}
                sx={{ 
                  color: 'white',
                  bgcolor: isSearchOpen ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { bgcolor: isSearchOpen ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.1)' },
                  height: 40,
                  width: 40
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Filter">
              <IconButton 
                onClick={handleFilterClick}
                sx={{ 
                  color: 'white',
                  bgcolor: activeFilters.length > 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { bgcolor: activeFilters.length > 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.1)' },
                  height: 40,
                  width: 40,
                  position: 'relative'
                }}
              >
                <FilterListIcon />
                {activeFilters.length > 0 && (
                  <Badge 
                    badgeContent={activeFilters.length} 
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            
            {/* Filter Menu */}
            <Popover
              open={isFilterOpen}
              anchorEl={filterAnchorEl}
              onClose={handleFilterClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    width: 280,
                    bgcolor: '#1e293b',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  }
                }
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 600,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <FilterAltIcon fontSize="small" color="primary" />
                  Filter Teams
                </Typography>
                
                <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <MenuItem sx={{ borderRadius: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={filters.hasMembers} 
                          onChange={() => handleFilterChange('hasMembers')}
                          color="primary"
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Teams with members
                        </Typography>
                      }
                      sx={{ width: '100%' }}
                    />
                  </MenuItem>
                  
                  <MenuItem sx={{ borderRadius: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={filters.noMembers} 
                          onChange={() => handleFilterChange('noMembers')}
                          color="primary"
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Teams without members
                        </Typography>
                      }
                      sx={{ width: '100%' }}
                    />
                  </MenuItem>
                </FormControl>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={clearFilters}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'text.secondary',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        bgcolor: 'rgba(255, 255, 255, 0.03)'
                      },
                      textTransform: 'none',
                      borderRadius: 1.5,
                    }}
                  >
                    Clear Filters
                  </Button>
                  
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CheckIcon />}
                    onClick={handleFilterClose}
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1.5,
                    }}
                  >
                    Apply Filters
                  </Button>
                </Box>
              </Box>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar / Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better performance on mobile
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: '#111827',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: 0 },
          mt: 8 // Space for AppBar
        }}
      >
        {/* Content for the active section */}
        {activeSection === 'teams' && (
          <Box>
            {error && (
              <Alert 
                severity="error" 
                variant="filled"
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                {error}
              </Alert>
            )}
            
            {/* Active filters display */}
            {(activeFilters.length > 0 || searchQuery) && (
              <Box 
                sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 1,
                  alignItems: 'center'
                }}
              >
                {searchQuery && (
                  <Chip
                    label={`Search: ${searchQuery}`}
                    onDelete={() => setSearchQuery('')}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5 }}
                  />
                )}
                
                {activeFilters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={filter}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5 }}
                  />
                ))}
                
                {(activeFilters.length > 0 || searchQuery) && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={clearFilters}
                    sx={{ 
                      color: 'text.disabled',
                      fontSize: 12,
                      ml: 1,
                      '&:hover': { color: 'text.secondary' }
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
            )}
            
            {lastRefreshed && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mb: 2, 
                  color: 'text.disabled',
                  fontSize: 12
                }}
              >
                Last refreshed: {lastRefreshed.toLocaleTimeString()}
                {searchQuery || activeFilters.length > 0 ? 
                  ` | Showing ${filteredTeams.length} of ${teams?.length || 0} teams` : ''}
              </Typography>
            )}

            {loading && !autoRefresh ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : filteredTeams.length === 0 && !loading ? (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  my: 10,
                  p: 5, 
                  borderRadius: 4,
                  bgcolor: 'rgba(30, 41, 59, 0.4)',
                  border: '1px dashed rgba(255, 255, 255, 0.1)'
                }}
              >
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                  {teams.length === 0 ? 'No teams registered yet.' : 'No matching teams found.'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  {teams.length === 0 
                    ? 'Teams will appear here once they complete registration.' 
                    : 'Try adjusting your search or filters to find what you\'re looking for.'}
                </Typography>
                
                {teams.length > 0 && (searchQuery || activeFilters.length > 0) && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearFilters}
                    sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>
            ) : (
              <Fade in={true} timeout={800}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    bgcolor: '#1e293b',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="h6" sx={{ 
                      color: 'white',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <GroupsIcon fontSize="small" color="primary" />
                      Registered Teams
                      <Badge badgeContent={filteredTeams?.length || 0} color="primary" sx={{ ml: 1 }} />
                    </Typography>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={fetchTeams}
                      startIcon={<RefreshIcon />}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: 'none'
                      }}
                    >
                      Refresh
                    </Button>
                  </Box>
                  
                  <TableContainer>
                    <Table aria-label="collapsible table">
                      <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
                        <TableRow>
                          <TableCell sx={{ width: '48px', p: 1 }} />
                          <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 13 }}>
                            Team Name
                          </TableCell>
                          <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 13 }}>
                            Leader Name
                          </TableCell>
                          <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 13 }}>
                            Leader Email
                          </TableCell>
                          <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 13 }}>
                            Leader Phone
                          </TableCell>
                          <TableCell align="right" sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 13 }}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTeams.map((team) => (
                          <TeamRow key={team._id} team={team} onDelete={handleDelete} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Fade>
            )}
          </Box>
        )}
        
        {activeSection === 'proposals' && (
          <Box sx={{ 
            textAlign: 'center', 
            my: 10,
            p: 5, 
            borderRadius: 4,
            bgcolor: 'rgba(30, 41, 59, 0.4)',
            border: '1px dashed rgba(255, 255, 255, 0.1)'
          }}>
            <DescriptionIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              Proposals Section
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              This section is under development. Check back later.
            </Typography>
          </Box>
        )}
        
        {activeSection === 'settings' && (
          <Box sx={{ 
            textAlign: 'center', 
            my: 10,
            p: 5, 
            borderRadius: 4,
            bgcolor: 'rgba(30, 41, 59, 0.4)',
            border: '1px dashed rgba(255, 255, 255, 0.1)'
          }}>
            <SettingsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              Site Settings
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              This section is under development. Check back later.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPortal;