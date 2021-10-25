import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { Done, Error } from '@mui/icons-material';

import useTableSteps from '../../hooks/useTableSteps';

const StepButtonTableCell = ({ row, useTableStepsRef }) => {
  const [currentState, stepStates, doneAction, errorAction, clearAction] = useTableStepsRef;

  const handleClear = () => {
    if (Object.values(currentState).some((stepState) => stepState === stepStates.error)) {
      // TODO: add modal with info that you cannot clear after error has been reported
    } else {
      // TODO: add modal asking if you sure want to clear
      clearAction(row.id);
    }
  };

  switch (currentState[row.id]) {
    case stepStates.choose:
      return (
        <TableCell sx={{ width: '5rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => doneAction(row.id)}
            >
              <Done />
            </IconButton>
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => errorAction(row.id)}
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

StepButtonTableCell.propTypes = {
  row: PropTypes.object.isRequired,
  useTableStepsRef: PropTypes.func.isRequired
};

const DataTableCell = ({ data, color }) => {
  return (
    <TableCell sx={{ width: '7rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data?.map((dataItem) => (
          <Button key={dataItem} color={color}>
            {dataItem}
          </Button>
        ))}
      </Box>
    </TableCell>
  );
};

DataTableCell.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired
};

// rows should be taken from redux
export const TestRunTable = ({ rows }) => {
  const useTableStepsRef = useTableSteps(rows.length);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Steps</TableCell>
            <TableCell align="center">Associated bugs</TableCell>
            <TableCell align="center">Test data</TableCell>
            <TableCell>Control points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
              <StepButtonTableCell row={row} useTableStepsRef={useTableStepsRef} />
              <TableCell>{row.step}</TableCell>
              <DataTableCell data={row.associatedBugs} color="error" />
              <DataTableCell data={row.testData} />
              <TableCell>{row.controlPoint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestRunTable;

TestRunTable.propTypes = {
  rows: PropTypes.array.isRequired
};
