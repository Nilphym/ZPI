import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

const EnhancedTableHead = ({ order, orderBy, onRequestSort, headCells }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignCenter ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            {headCell.isSortable ?
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel> : 
              Array.isArray(headCell.label) ? <>{headCell.label.map((labelLine) => <div key={labelLine}>{labelLine}</div>)}</> : headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
