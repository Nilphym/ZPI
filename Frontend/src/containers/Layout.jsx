import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './Navbar';

const Layout = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Navbar
        links={[
          { icon: 'dashboard', text: 'Dashboard', destination: 'dashboard' },
          { icon: 'bugs', text: 'Bugs', destination: 'bugs' },
          { icon: 'tests', text: 'Tests', destination: 'tests' },
          { icon: 'logout', text: 'Logout', destination: 'logout' }
        ]}
        profile={{ name: 'John Snow' }}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
