import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';

export const DefaultFilter = ({ column: { filterValue, setFilter } }) => (
  <TextField
    size="small"
    value={filterValue || ''}
    onClick={(e) => e.stopPropagation()}
    onChange={(e) => {
      setFilter(e.target.value || undefined);
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search color="disabled" sx={{ height: '25px' }} />
        </InputAdornment>
      )
    }}
    sx={{
      '.MuiInputBase-root': {
        height: '2.2rem',
        paddingLeft: '0.5rem'
      }
    }}
  />
);

DefaultFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired
  }).isRequired
};

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      value={filterValue}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      sx={{
        height: '2.2rem',
        width: '7rem'
      }}
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

SelectColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    preFilteredRows: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};
