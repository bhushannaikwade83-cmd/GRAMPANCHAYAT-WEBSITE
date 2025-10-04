import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout'; // Logout icon import केले
import { Link, useNavigate } from 'react-router-dom'; // useNavigate import केले

const AdminSidebar = ({ drawerWidth }) => {
  const navigate = useNavigate(); // Navigation साठी hook

  const handleLogout = () => {
    // प्रत्यक्ष ॲपमध्ये, तुम्ही येथे ऑथेंटिकेशन टोकन क्लिअर कराल
    navigate('/'); // होमपेजवर परत जा
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Dashboard Link */}
          <ListItem disablePadding component={Link} to="/admin/panel" sx={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Manage Members Link (Example) */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Members" />
            </ListItemButton>
          </ListItem>

           {/* Manage Content Link (Example) */}
           <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Content" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      
      {/* Logout बटण सर्वात खाली */}
      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;