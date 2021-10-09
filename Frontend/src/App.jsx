import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LoginPanel from './components/LoginPanel/LoginPanel';
import RegisterPanel from './components/RegisterPanel/RegisterPanel';
import RegisterToProjectPanel from './components/RegisterToProjectPanel/RegisterToProjectPanel';
import Navbar from './containers/Navbar';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
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
        }
      />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/register-user" element={<RegisterToProjectPanel projectName='Project-X'/>} />
    </Routes>
  );
};

export default App;
