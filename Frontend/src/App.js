import React from 'react';
import { Box } from '@mui/material';
import Navbar from './containers/Navbar';

const App = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Navbar
        links={[
          { icon: 'home', text: 'Home', destination: 'home' },
          { icon: 'home', text: 'Projects', destination: 'projects' },
          { icon: 'home', text: 'Bilings', destination: 'bilings' },
          { icon: 'home', text: 'Team', destination: 'team' },
          { icon: 'home', text: 'Settings', destination: 'settings' }
        ]}
        profile={{ name: 'John Snow' }}
      />
    </Box>
  );
};

export default App;
