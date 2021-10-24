import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import BugTable, { types as bugTableTypes } from '../containers/BugTable';

const BugPage = ({ type }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '2rem 1rem',
        alignSelf: 'center'
      }}
    >
      <BugTable type={type} />
    </Box>
  );
};

export default BugPage;
export const types = bugTableTypes;

BugPage.propTypes = {
  type: PropTypes.oneOf(types).isRequired
};
