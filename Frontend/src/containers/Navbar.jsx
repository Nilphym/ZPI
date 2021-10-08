import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Box, SvgIcon } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const icons = {
  home: <HomeOutlined />
};

const Scrollbar = styled(SimpleBar)({
  maxHeight: '100%'
});

// 1200px min width
// eslint-disable-next-line no-unused-vars
const Navbar = ({ links }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%'
      }}
    >
      <Scrollbar>
        <SvgIcon>add_circle</SvgIcon>
        {/* icon, text, hyperlink */}
        <Box>Navigation</Box>
        <Box>Person</Box>
      </Scrollbar>
    </Box>
  );
};

export default Navbar;

Navbar.propTypes = {
  links: PropTypes.array.isRequired
};
