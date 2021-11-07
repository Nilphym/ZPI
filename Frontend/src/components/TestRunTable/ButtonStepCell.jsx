import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Box } from '@mui/material';
import { Done, Error } from '@mui/icons-material';

// eslint-disable-next-line no-unused-vars
export const ButtonStepCell = ({ index, id, useTableStepsRef }) => {
  const { currentState, stepStates, doneAction, errorAction, clearAction } = useTableStepsRef;

  const handleErrorReport = async () => {
    // TODO modal with error report
    errorAction(index);
  };

  switch (currentState[index]) {
    case stepStates.choose:
      return (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => doneAction(index)}
            >
              <Done />
            </IconButton>
            <IconButton component="span" color="primary" size="small" onClick={handleErrorReport}>
              <Error />
            </IconButton>
          </Box>
        </>
      );

    case stepStates.done:
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton
            disabled={Object.values(currentState).some((state) => state === 'error')}
            component="span"
            color="primary"
            size="small"
            onClick={() => clearAction(index)}
          >
            <Done />
          </IconButton>
        </Box>
      );

    case stepStates.error:
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton disabled component="span" color="primary" size="small">
            <Error />
          </IconButton>
        </Box>
      );

    default:
      return null;
  }
};

ButtonStepCell.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  useTableStepsRef: PropTypes.object.isRequired
};
