import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Slide,
  Fade,
  useMediaQuery,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Login,
  FormatListBulleted,
  BugReport,
  BarChart,
  MenuOpen,
  Menu as MenuIcon,
  Person
} from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/system';

import logo from '../../assets/logo/logo2.png';

const icons = {
  dashboard: <BarChart />,
  bugs: <BugReport />,
  tests: <FormatListBulleted />,
  logout: <Login />,
  profile: <Person />
};

const Logo = styled('img')({
  width: '8rem'
});

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ active, theme }) => ({
  width: '100%',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.dark,
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

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ active, theme }) => ({
  width: '100%',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.dark,
  textDecoration: 'none',
  ...(!active && {
    '&:hover': {
      backgroundColor: grey[50]
    }
  }),
  ...(active && {
    backgroundColor: blue[50]
  }),
  textAlign: 'left',
  textTransform: 'none'
}));

const NavbarItem = ({ pathname, link: { icon, text, destination } }) => {
  const regex = new RegExp(destination);

  return (
    <StyledLink active={regex.test(pathname)} to={destination}>
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

const NavbarMenu = ({ name, icon, links }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = (destination) => {
    setAnchorEl(null);
    navigate(destination);
  };

  return (
    <>
      <StyledButton onClick={handleClick}>
        {icons[icon]}
        <Typography sx={{ width: '100%', paddingLeft: '1rem' }}>{name}</Typography>
      </StyledButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {links.map((link) => (
          <MenuItem key={link.text} onClick={() => handleMenuItem(link.destination)}>
            {link.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

NavbarMenu.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
};

const Profile = ({ avatar, name }) => {
  return (
    <Box
      sx={{
        alignSelf: 'center',
        justifySelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ backgroundColor: 'primary.dark', marginBottom: '0.5rem' }} src={avatar}>
        {name.at(0)}
      </Avatar>
      <Typography sx={{ color: 'primary.dark' }}>{name}</Typography>
    </Box>
  );
};

Profile.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired
};

Profile.defaultProps = {
  avatar: null
};

const Navbar = ({ links }) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const name = useSelector((state) => state.auth.token.name);
  const largeMedia = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    if ((largeMedia && !open) || (!largeMedia && open)) toggleOpen();
  }, [largeMedia]);

  return (
    <>
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            height: '100vh',
            width: '18.8rem',
            display: 'grid',
            gridTemplateRows: '7rem 1fr 7rem',
            borderRight: `2px solid ${grey[100]}`,
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 1
          }}
        >
          <Box
            sx={{
              margin: '0 1rem 0 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Logo src={logo} alt="logo" />
            <IconButton onClick={toggleOpen}>
              <MenuOpen sx={{ color: 'primary.dark' }} />
            </IconButton>
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            {links.map((link) =>
              link.name ? (
                <NavbarMenu key={link.name} name={link.name} icon={link.icon} links={link.links} />
              ) : (
                <NavbarItem key={link.destination} pathname={pathname} link={link} />
              )
            )}
          </Box>
          <Profile name={name} />
        </Box>
      </Slide>
      <Slide direction="right" in={!open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: '2.3rem',
            left: '1rem'
          }}
        >
          <IconButton onClick={toggleOpen}>
            <MenuIcon sx={{ color: 'primary.dark' }} />
          </IconButton>
        </Box>
      </Slide>
      <Fade in={!largeMedia && open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: 0,
            zIndex: 0
          }}
          onClick={toggleOpen}
        />
      </Fade>
    </>
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
