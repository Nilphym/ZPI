import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/system';

const App = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100vh', backgroundColor: theme.palette.primary.main }} />
  );
};

export default App;
