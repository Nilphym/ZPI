import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { Settings, Repeat, Done, Add, NotInterested, CallMissed } from '@mui/icons-material';

export const icons = {
  resolve: <Done />,
  reject: <NotInterested />,
  resign: <CallMissed />,
  take: <Add />,
  retest: <Repeat />,
  settings: <Settings />
};

const EnhancedIconButton = ({ icon, onClick }) => (
  <IconButton
    sx={{ display: 'flex', alignItems: 'center' }}
    onClick={onClick}
    component="span"
    color="primary"
    size="small"
  >
    {icon}
  </IconButton>
);

export default EnhancedIconButton;

EnhancedIconButton.propTypes = {
  icon: PropTypes.oneOf(Object.values(icons)).isRequired,
  onClick: PropTypes.func.isRequired
};
