import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

const EnhancedTableHead = ({ order, orderBy, onRequestSort, headCells }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const createTableLabel = (headCell) => {
    if (headCell.isSortable) {
      return (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : 'asc'}
          onClick={createSortHandler(headCell.id)}
        >
          {headCell.label}
        </TableSortLabel>
      );
    }

    if (Array.isArray(headCell.label)) {
      return (
        <>
          {headCell.label.map((labelLine) => (
            <div key={labelLine}>{labelLine}</div>
          ))}
        </>
      );
    }

    return headCell.label;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignCenter ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            {createTableLabel(headCell)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'dsc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  headCells: PropTypes.array.isRequired
};
