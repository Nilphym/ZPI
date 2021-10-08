import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Avatar } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/system';

import logo from '../assets/logo/logo2.png';

const icons = {
  home: <HomeOutlined />
};

const Logo = styled('img')({
  width: '47%',
  padding: '2rem 0 0 2rem'
});

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ active, theme }) => ({
  width: '100%',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  ...(!active && {
    '&:hover': {
      backgroundColor: grey[50]
    }
  }),
  ...(active && {
    backgroundColor: blue[50]
  })
}));

// TODO: change active checking to match every subroute, eq. /home/dashboard
const NavbarItem = ({ pathname, link: { icon, text, destination } }) => {
  return (
    <StyledLink active={pathname === `/${destination}`} to={destination}>
      {icons[icon]}
      <Typography sx={{ width: '100%', paddingLeft: '1rem' }}>{text}</Typography>
    </StyledLink>
  );
};

NavbarItem.propTypes = {
  pathname: PropTypes.string.isRequired,
  link: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired
  }).isRequired
};

const Profile = ({ profile: { avatar, name } }) => {
  return (
    <Box
      sx={{
        paddingBottom: '2rem',
        alignSelf: 'end',
        justifySelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ marginBottom: '.5rem' }} src={avatar}>
        {name.at(0)}
      </Avatar>
      <Typography>{name}</Typography>
    </Box>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
};

// TODO: 1200px min width for desktop else mobile menu
const Navbar = ({ links, profile }) => {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '300px',
        display: 'grid',
        alignItems: 'start',
        borderRight: `2px solid ${grey[100]}`
      }}
    >
      <Logo src={logo} alt="logo" />
      <Box>
        {links.map((link) => (
          <NavbarItem pathname={pathname} link={link} />
        ))}
      </Box>
      <Profile profile={profile} />
    </Box>
  );
};

export default Navbar;

Navbar.propTypes = {
  links: PropTypes.array.isRequired,
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
};
