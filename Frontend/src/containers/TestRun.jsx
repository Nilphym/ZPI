import React from 'react';
import PropTypes from 'prop-types';
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

Preconditions.propTypes = {
  preconditions: PropTypes.string.isRequired
};

const ExpectedResult = ({ result }) => {
  return (
    <Paper sx={{ padding: '0 .8rem .5rem .8rem' }}>
      <Typography variant="overline">Expected Result</Typography>
      <Typography variant="body1">{result}</Typography>
    </Paper>
  );
};

ExpectedResult.propTypes = {
  result: PropTypes.string.isRequired
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

TestRun.propTypes = {
  preconditions: PropTypes.string.isRequired,
  expectedResult: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired
};
