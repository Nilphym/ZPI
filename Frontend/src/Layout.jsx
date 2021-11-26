/* eslint-disable no-unreachable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar } from './containers';

const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!token && pathname === '/') {
    return <Navigate to="login" />;
  }

  switch (token?.role) {
    case 'Tester':
      return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'min-content 1fr' }}>
          <Navbar
            links={[
              { icon: 'dashboard', text: 'Dashboard', destination: '/dashboard' },
              { icon: 'tests', text: 'Test Plans', destination: '/testPlans' },
              {
                icon: 'bugs',
                name: 'Bugs',
                links: [
                  { text: 'All bugs', destination: '/bugs' },
                  { text: 'Bugs to review', destination: '/bugs/retest' }
                ]
              },
              { icon: 'logout', text: 'Logout', destination: '/logout' }
            ]}
          />
          <Outlet />
        </Box>
      );
    case 'Developer':
      return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'min-content 1fr' }}>
          <Navbar
            links={[
              { icon: 'dashboard', text: 'Dashboard', destination: '/dashboard' },
              { icon: 'tests', text: 'Test Plans', destination: '/testPlans' },
              {
                icon: 'bugs',
                name: 'Bugs',
                links: [
                  { text: 'All bugs', destination: '/bugs' },
                  { text: 'Active bugs', destination: '/bugs/active' },
                  { text: 'My bugs', destination: '/bugs/assigned' }
                ]
              },
              { icon: 'logout', text: 'Logout', destination: '/logout' }
            ]}
          />
          <Outlet />
        </Box>
      );
    case 'ProjectManager':
      return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'min-content 1fr' }}>
          <Navbar
            links={[
              { icon: 'dashboard', text: 'Dashboard', destination: '/dashboard' },
              { icon: 'tests', text: 'Test Plans', destination: '/testPlans' },
              { icon: 'bugs', text: 'Bugs', destination: '/bugs' },
              { icon: 'logout', text: 'Logout', destination: '/logout' }
            ]}
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
