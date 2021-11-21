import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';
import { BugReport } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const statisticIcons = {
  bug: BugReport
};

export const Statistic = ({ name, number, icon }) => {
  const Icon = statisticIcons[icon];

  return (
    <Box
      component={Paper}
      sx={{
        height: '6rem',
        width: '20rem',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <Box
        sx={{
          backgroundColor: green[100],
          borderRadius: '50%',
          width: '3.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon sx={{ color: green[900] }} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>{number}</Typography>
        <Typography sx={{ color: 'text.disabled' }}>{name}</Typography>
      </Box>
    </Box>
  );
};

export default Statistic;

Statistic.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  icon: PropTypes.oneOf(Object.keys(statisticIcons)).isRequired
};
