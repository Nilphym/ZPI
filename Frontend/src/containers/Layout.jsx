import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './Navbar';

const Layout = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Navbar
        links={[
          { icon: 'home', text: 'Home', destination: 'login' },
          { icon: 'home', text: 'Projects', destination: 'projects' },
          { icon: 'home', text: 'Bilings', destination: 'bilings' },
          { icon: 'home', text: 'Team', destination: 'team' },
          { icon: 'home', text: 'Settings', destination: 'settings' }
        ]}
        profile={{ name: 'John Snow' }}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
