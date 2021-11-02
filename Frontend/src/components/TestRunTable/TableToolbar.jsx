import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Toolbar } from '@mui/material';

const TableToolbar = ({ title }) => {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '2rem 0'
      }}
    >
      <Typography sx={{ paddingBottom: '1.5rem' }} variant="h3" component="h1" color="primary.dark">
        {title}
      </Typography>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default TableToolbar;
