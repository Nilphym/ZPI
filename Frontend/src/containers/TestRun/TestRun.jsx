import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@mui/material';

import { TestRunTable, ButtonStepCell, DataCell } from '../../components';
import useTableSteps from '../../hooks/useTableSteps';

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

// export const TestRun = ({ preconditions, expectedResult, rows }) => {
//   return (
//     <Box
//       sx={{ width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1em' }}
//     >
//       <Preconditions preconditions={preconditions} />
//       <ExpectedResult result={expectedResult} />
//       <TestRunTable rows={rows} />
//     </Box>
//   );
// };
export const TestRun = () => {
  const data = React.useMemo(
    () => [
      {
        checker: 'heheh',
        steps: '',
        associatedBugs: [''],
        testData: '',
        controlPoint: ['']
      }
    ],
    []
  );

  const useTableStepsRef = useTableSteps(data.length);

  /* eslint-disable react/prop-types */
  const columns = React.useMemo(
    () => [
      {
        id: 'checker',
        minWidth: 35,
        maxWidth: 35,
        Cell: ({ row }) => <ButtonStepCell row={row} useTableStepsRef={useTableStepsRef} />
      },
      {
        Header: 'Steps',
        accessor: 'steps'
      },
      {
        Header: 'Associated bugs',
        accessor: 'associatedBugs',
        Cell: ({ row }) => <DataCell data={row.values.associatedBugs} />
      },
      {
        Header: 'Test data',
        accessor: 'testData',
        Cell: ({ row }) => <DataCell data={row.values.associatedBugs} />
      },
      {
        Header: 'Control points',
        accessor: 'controlPoint'
      }
    ],
    []
  );
  /* eslint-enable react/prop-types */

  return <TestRunTable columns={columns} data={data} />;
};

export default TestRun;
