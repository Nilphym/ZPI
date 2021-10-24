import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase, Box, Paper } from '@mui/material';
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
        <Search color="action" sx={{ fontSize: '2.75rem', padding: '0.625rem' }} />
        <InputBase
          value={inputContent}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by any parameter..."
          onChange={(evt) => {
            setInputContent(evt.target.value);
            onChange(evt.target.value);
          }}
        />
      </Paper>
    </Box>
  );
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired
};

GlobalFilter.defaultProps = { globalFilter: undefined };

export default GlobalFilter;
