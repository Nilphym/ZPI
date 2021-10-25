import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar } from './containers';

const Layout = () => {
  const { token } = useSelector((state) => state.auth);

  switch (token?.role) {
    case 'tester':
      return (
        <Box sx={{ display: 'flex' }}>
          <Navbar
            links={[
              { icon: 'dashboard', text: 'Dashboard', destination: '/dashboard' },
              { icon: 'tests', text: 'Tests', destination: '/tests' },
              {
                icon: 'bugs',
                name: 'Bugs',
                links: [
                  { text: 'All bugs', destination: '/bugs' },
                  { text: 'Bugs to review', destination: '/bugs/retest' }
                ]
              },
              { icon: 'profile', text: 'Profile', destination: '/profile' },
              { icon: 'logout', text: 'Logout', destination: '/logout' }
            ]}
            profile={{ name: 'John Snow' }}
          />
          <Outlet />
        </Box>
      );
    case 'dev':
      return (
        <Box sx={{ display: 'flex' }}>
          <Navbar
            links={[
              { icon: 'dashboard', text: 'Dashboard', destination: '/dashboard' },
              { icon: 'tests', text: 'Tests', destination: '/tests' },
              {
                icon: 'bugs',
                name: 'Bugs',
                links: [
                  { text: 'All bugs', destination: '/bugs' },
                  { text: 'Active bugs', destination: '/bugs/active' },
                  { text: 'My bugs', destination: '/bugs/assigned' }
                ]
              },
              { icon: 'profile', text: 'Profile', destination: '/profile' },
              { icon: 'logout', text: 'Logout', destination: '/logout' }
            ]}
            profile={{ name: 'John Snow' }}
          />
          <Outlet />
        </Box>
      );
    case 'pm':
      return (
        <Box sx={{ display: 'flex' }}>
          <Navbar
            links={[
              {
                icon: 'dashboard',
                name: 'Dashboard',
                links: [
                  { text: 'Dashboard', destination: '/dashboard' },
                  { text: 'Raports', destination: '/raports' }
                ]
              },
              { icon: 'bugs', text: 'Bugs', destination: '/bugs' },
              { icon: 'profile', text: 'Profile', destination: '/profile' },
              { icon: 'logout', text: 'Logout', destination: '/logout' }
            ]}
            profile={{ name: 'John Snow' }}
          />
          <Outlet />
        </Box>
      );
    default:
      return (
        <Box sx={{ width: '100%', height: '100vh' }}>
          <Outlet />
        </Box>
      );
  }
};

export default Layout;
