import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import WarningIcon from '@mui/icons-material/Warning';

const Error = ({ message }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <WarningIcon />
      <Typography>{message}</Typography>
    </Box>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
