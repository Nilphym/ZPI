import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@mui/material';

import EnhancedTableCell from './TableCell';

const EnhancedTableRow = ({ rowCells, row }) => (
  <TableRow hover tabIndex={-1} key={row.id}>
    {rowCells.map((rowCell) => (
      <EnhancedTableCell key={rowCell.id} content={row[rowCell.id]} rowCell={rowCell} />
    ))}
  </TableRow>
);

export default EnhancedTableRow;

EnhancedTableRow.propTypes = {
  rowCells: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired
};
