import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, ExitToApp } from '@mui/icons-material';

const Row = ({ row: { name, tests } }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: '#EEEEEE',
          'td, th': {
            fontWeight: 'bold'
          }
        }}
      >
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="center" sx={{ width: '5rem' }}>
          Finished
        </TableCell>
        <TableCell sx={{ width: '2.2rem' }} />
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableBody>
                {tests.map(({ name }) => (
                  <TableRow colSpan={4} hover sx={{ height: '2.7rem' }} key={name}>
                    <TableCell padding="checkbox" />
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="center" sx={{ width: '5rem' }}>
                      1
                    </TableCell>
                    <TableCell align="center" sx={{ width: 0 }}>
                      <IconButton
                        component="span"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="primary"
                        size="small"
                      >
                        <ExitToApp />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    tests: PropTypes.array
  }).isRequired
};

const TestPlanTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestPlanTable;

TestPlanTable.propTypes = {
  rows: PropTypes.array.isRequired
};
