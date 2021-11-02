import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, IconButton, Box } from '@mui/material';
import { Done, Error } from '@mui/icons-material';

export const ButtonStepCell = ({ row, useTableStepsRef }) => {
  const [currentState, stepStates, doneAction, errorAction, clearAction] = useTableStepsRef;

  const handleClear = () => {
    if (Object.values(currentState).some((stepState) => stepState === stepStates.error)) {
      // TODO: add modal with info that you cannot clear after error has been reported
    } else {
      // TODO: add modal asking if you sure want to clear
      clearAction(row.index);
    }
  };

  switch (currentState[row.index]) {
    case stepStates.choose:
      return (
        <TableCell sx={{ width: '5rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => doneAction(row.index)}
            >
              <Done />
            </IconButton>
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => errorAction(row.index)}
            >
              <Error />
            </IconButton>
          </Box>
        </TableCell>
      );

    case stepStates.done:
      return (
        <TableCell sx={{ width: '5rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton component="span" color="primary" size="small" onClick={handleClear}>
              <Done />
            </IconButton>
          </Box>
        </TableCell>
      );

    case stepStates.error:
      return (
        <TableCell sx={{ width: '5rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton component="span" color="primary" size="small">
              <Error />
            </IconButton>
          </Box>
        </TableCell>
      );

    default:
      return <TableCell sx={{ width: '5rem' }} />;
  }
};

ButtonStepCell.propTypes = {
  row: PropTypes.object.isRequired,
  useTableStepsRef: PropTypes.func.isRequired
};
