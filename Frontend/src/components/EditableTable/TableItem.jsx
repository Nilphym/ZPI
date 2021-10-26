import React from 'react';
import { Box, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  textField: {
    '& input': {
      color: '#000000',
      outline: 'none'
    },
    '& input:disabled': {
      '-webkit-text-fill-color': 'rgba(0,0,0,0.7)'
    }
  }
}));

const TableItem = ({ name, row, column, control, disabled, defaultValue }) => {
  const classes = useStyles();
  return (
    <Box
    // sx={{
    //   border: '0.0625rem solid #b0bec5',
    //   width: '9.2rem',
    //   height: '3.5rem'
    // }}
    >
      <Controller
        shouldUnregister
        name={`${name}-${row}-${column}`}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) =>
          row === 0 && column === 0 ? (
            <TextField
              id={`${name}-${row}-${column}`}
              type="text"
              disabled
              placeholder=""
              required
              {...field}
              variant="standard"
            />
          ) : (
            <TextField
              id={`${name}-${row}-${column}`}
              type="text"
              disabled={disabled}
              placeholder={(row === 0 && 'Column Name') || (column === 0 && 'Row Name')}
              required
              {...field}
              className={classes.textField}
              variant="standard"
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
  disabled: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string.isRequired
};

export default TableItem;
