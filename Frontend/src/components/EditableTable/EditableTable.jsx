import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import TableItem from './TableItem';

const MAX_ROWS_NUMBER = 11;
const MAX_COLUMNS_NUMBER = 11;

// TODO: Add control from outer form !!!
const EditableTable = ({
  rowsNumber: defaultRowsNumber,
  columnsNumber: defaultColumnsNumber,
  name,
  disabled,
  deleteTable
}) => {
  const { control } = useForm();
  const [rowsNumber, setRowsNumber] = useState(defaultRowsNumber + 1);
  const [columnsNumber, setColumnsNumber] = useState(defaultColumnsNumber + 1);

  return (
    <Box
      sx={{
        border: '1px solid black',
        position: 'relative',
        marginTop: '1.25rem'
      }}
    >
      {!disabled && rowsNumber < MAX_ROWS_NUMBER && (
        <Button onClick={() => setRowsNumber((number) => number + 1)}>Add row</Button>
      )}
      {!disabled && columnsNumber < MAX_COLUMNS_NUMBER && (
        <Button onClick={() => setColumnsNumber((number) => number + 1)}>Add column</Button>
      )}
      {!disabled && rowsNumber > 1 && (
        <Button onClick={() => setRowsNumber((number) => number - 1)}>Delete row</Button>
      )}
      {!disabled && columnsNumber > 1 && (
        <Button onClick={() => setColumnsNumber((number) => number - 1)}>Delete column</Button>
      )}
      {!disabled && (
        <DeleteIcon
          sx={{
            position: 'absolute',
            top: '1vh',
            right: '2vw',
            border: '1px solid black',
            borderRadius: '50%',
            padding: '2px',
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          onClick={() => deleteTable()}
        />
      )}
      <Box sx={{
        width: '100%'
      }}>
        {[...Array.from(Array(rowsNumber).keys())].map((rowNumber) => (
          <Box
            key={`row-${rowNumber}`}
            sx={{
              display: 'flex'
            }}
          >
            {[...Array.from(Array(columnsNumber).keys())].map((columnNumber) => (
              <TableItem
                key={`${rowNumber}-${columnNumber}`}
                name={name}
                row={rowNumber}
                column={columnNumber}
                control={control}
                disabled={disabled}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

EditableTable.propTypes = {
  name: PropTypes.string.isRequired,
  rowsNumber: PropTypes.number.isRequired,
  columnsNumber: PropTypes.number.isRequired,
  // control: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  deleteTable: PropTypes.func.isRequired
};

export default EditableTable;
