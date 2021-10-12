import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Collapse, Table, TableBody, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

import EnhancedTableCell from './TableCell';

const EnhancedTableRow = ({ rowCells, row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {rowCells.map((rowCell) => (
          <EnhancedTableCell key={rowCell.id} content={row[rowCell.id]} rowCell={rowCell} />
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" sx={{ backgroundColor: blue[50] }}>
              <TableBody>
                {rowCells.map(() => (
                  <TableRow colSpan={8} hover sx={{ height: '2.7rem' }} key={null}>
                    <TableCell padding="checkbox" />
                    <TableCell component="th" scope="row">
                      test
                    </TableCell>
                    <TableCell align="center" sx={{ width: '5rem' }}>
                      1
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

export default EnhancedTableRow;

EnhancedTableRow.propTypes = {
  rowCells: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired
};
