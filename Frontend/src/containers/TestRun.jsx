import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import TestRunTable from '../components/TestRunTable';

const Preconditions = ({ preconditions }) => {
  return (
    <Paper sx={{ padding: '0 .8rem .5rem .8rem' }}>
      <Typography variant="overline">Preconditions</Typography>
      <Typography variant="body1">{preconditions}</Typography>
    </Paper>
  );
};

const ExpectedResult = ({ result }) => {
  return (
    <Paper sx={{ padding: '0 .8rem .5rem .8rem' }}>
      <Typography variant="overline">Expected Result</Typography>
      <Typography variant="body1">{result}</Typography>
    </Paper>
  );
};

const TestRun = ({ preconditions, expectedResult, rows }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <Preconditions preconditions={preconditions} />
      <ExpectedResult result={expectedResult} />
      <TestRunTable rows={rows} />
    </Box>
  );
};

export default TestRun;
