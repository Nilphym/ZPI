/* eslint-disable no-console */
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
// import axios from 'axios';
import React, { useEffect } from 'react';

const StyledLink = styled(Link)({
  color: 'blue',
  textDecoration: 'none',
  position: 'absolute',
  right: '12rem',
  top: '60%',
  '&:visited, &:focus, &:hover, &:active': {
    color: 'blue'
  }
});

export const WelcomeUserToProjectPanel = ({ user, projectName }) => {
  useEffect(() => {
    console.log("Loading user's data");
    // TODO: Linking with Reducer
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '23%',
        left: '50%',
        width: '60rem',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        sx={{
          marginBottom: '2.5rem'
        }}
        align="center"
        variant="h4"
        gutterBottom
        component="div"
      >
        {`Welcome, to the ${projectName}, ${user.name}!`}
      </Typography>
      <Typography align="center" variant="body1" gutterBottom component="div">
        {`Your login: ${user.login}`}
      </Typography>
      <Typography
        align="center"
        sx={{
          color: 'red'
        }}
      >
        Please, remember your data!
      </Typography>
      <Box
        sx={{
          position: 'relative',
          height: '6.25rem'
        }}
      >
        <StyledLink to="#!">
          <Button
            variant="contained"
            sx={{
              height: '3.125rem',
              marginTop: '0.625rem'
            }}
          >
            Close
          </Button>
        </StyledLink>
      </Box>
    </Box>
  );
};

WelcomeUserToProjectPanel.propTypes = {
  user: PropTypes.object.isRequired,
  projectName: PropTypes.string.isRequired
};

export default WelcomeUserToProjectPanel;
