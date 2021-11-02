import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Button, Box } from '@mui/material';

export const DataCell = ({ data, color }) => {
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

DataCell.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string
};

DataCell.defaultProps = {
  color: 'green'
};

export default DataCell;
