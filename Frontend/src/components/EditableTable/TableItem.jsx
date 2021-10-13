import React from 'react';
import { Box, TextField} from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';


const TableItem = ({ name, row, column, control, disabled }) => {
  return (
    <Box
      sx={{
        border: '1px solid #0077c2',
        width: '9.2rem',
        height: '3.5rem'
      }}
    >
      <Controller
        shouldUnregister
        name={`${name}-${row}-${column}`}
        control={control}
        render={({ field }) =>
          row === 0 && column === 0 ? (
            <TextField
              id={`${name}-${row}-${column}`}
              type="text"
              disabled
              placeholder=""
              required
              {...field}
            />
          ) : (
            <TextField
              id={`${name}-${row}-${column}`}
              type="text"
              defaultValue=""
              disabled={disabled}
              placeholder={(row === 0 && 'Column Name') || (column === 0 && 'Row Name')}
              required
              {...field}
            />
          )
        }
      />
    </Box>
  );
};

TableItem.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default TableItem;
