import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Scrollbar = styled(SimpleBar)({
  maxHeight: '100%'
})

//1200px min width
const Navbar = ({ links }) => {
  return (
    <Box sx={{
      height: '100vh',
      width: '300px'
    }}>
      <Scrollbar>
        <Box>Logo</Box>
        <Box>Navigation</Box> {/* icon, text, hyperlink */}
        <Box>Person</Box>
      </Scrollbar>
    </Box>
  );
};

export default Navbar;
