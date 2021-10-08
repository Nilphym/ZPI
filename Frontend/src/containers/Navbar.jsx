import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { HomeOutlined } from '@mui/icons-material';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import logo from '../assets/logo/logo2.png';

const icons = {
  home: <HomeOutlined />
};

const Scrollbar = styled(SimpleBar)({
  maxHeight: '100%'
});

const Logo = styled('img')({
  width: '50%'
});

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '.5rem',
  color: theme.palette.primary.main
}));

const NavbarItem = ({ link: { icon, text, destination } }) => {
  return (
    <StyledLink to={destination}>
      {icons[icon]}
      <Typography sx={{ width: '100%' }}>{text}</Typography>
    </StyledLink>
  );
};

NavbarItem.propTypes = {
  link: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired
  }).isRequired
};

// 1200px min width
// eslint-disable-next-line no-unused-vars
const Navbar = ({ links }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Scrollbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '2rem'
          }}
        >
          <Logo src={logo} alt="logo" />
          {links.map((link) => (
            <NavbarItem link={link} />
          ))}
          <Box>Person</Box>
        </Box>
      </Scrollbar>
    </Box>
  );
};

export default Navbar;

Navbar.propTypes = {
  links: PropTypes.array.isRequired
};
