import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase, Divider, IconButton, Box, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [inputContent, setInputContent] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '25rem' }}
      >
        <InputBase
          value={inputContent}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          onChange={(evt) => {
            setInputContent(evt.target.value);
            onChange(evt.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: '10px' }}>
          <Search />
        </IconButton>
      </Paper>
    </Box>
  );
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired
};

export default GlobalFilter;
