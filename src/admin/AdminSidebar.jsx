import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LanguageIcon from '@mui/icons-material/Language';
import TourIcon from '@mui/icons-material/Tour';
import AssignmentIcon from '@mui/icons-material/Assignment'; // Icon for Takrar
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const AdminSidebar = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const [openGrampanchayat, setOpenGrampanchayat] = useState(true);
  const [openNirdeshika, setOpenNirdeshika] = useState(true);

  const handleGrampanchayatClick = () => {
    setOpenGrampanchayat(!openGrampanchayat);
  };

  const handleLogout = () => {
    // Add Firebase auth.signOut() logic here
    navigate('/admin/login');
  };
  
  const menuItems = [
    { text: 'माहिती', icon: <InfoIcon />, path: '/admin/manage/info' },
    { text: 'नकाशा', icon: <MapIcon />, path: '/admin/manage/map' },
    { text: 'सदस्य', icon: <PeopleIcon />, path: '/admin/manage/members' },
    { text: 'ग्रामसभेचे निर्णय', icon: <GavelIcon />, path: '/admin/manage/decisions' },
    { text: 'पुरस्कार', icon: <EmojiEventsIcon />, path: '/admin/manage/awards' },
    { text: 'सण/उत्सव', icon: <CelebrationIcon />, path: '/admin/manage/festivals' },
    { text: 'सुविधा', icon: <HomeWorkIcon />, path: '/admin/manage/facilities' },
    { text: 'ई-सेवा', icon: <LanguageIcon />, path: '/admin/manage/eseva' },
    { text: 'पर्यटन सथळे', icon: <TourIcon />, path: '/admin/manage/tourism' },
  ];

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
          <ListItem disablePadding component={Link} to="/admin/panel">
            <ListItemButton>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="डॅशबोर्ड" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to="/admin/profile">
            <ListItemButton>
              <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
              <ListItemText primary="ग्रामपंचायत प्रोफाइल" />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleGrampanchayatClick}>
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="ग्रामपंचायत व्यवस्थापन" />
            {openGrampanchayat ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openGrampanchayat} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItems.map((item) => (
                 <ListItem key={item.text} disablePadding component={Link} to={item.path}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                 </ListItem>
              ))}
            </List>
          </Collapse>

          {/* निर्देशिका Section */}
          <ListItemButton onClick={() => setOpenNirdeshika(!openNirdeshika)}>
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="निर्देशिका" />
            {openNirdeshika ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openNirdeshika} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding component={Link} to="/admin/manage-nirdeshika/janaganana">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><ListAltIcon /></ListItemIcon>
                  <ListItemText primary="जनगणना" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to="/admin/manage-nirdeshika/contacts">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><ContactPhoneIcon /></ListItemIcon>
                  <ListItemText primary="दूरध्वनी क्रमांक" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to="/admin/manage-nirdeshika/helpline">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                  <ListItemText primary="हेल्पलाईन" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to="/admin/manage-nirdeshika/hospitals">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
                  <ListItemText primary="रुग्णालय" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          
          {/* ✅ ADDED: New link for Complaint Management */}
          <ListItem disablePadding component={Link} to="/admin/manage/complaints">
            <ListItemButton>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="तक्रार व्यवस्थापन" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="लॉग आउट" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
