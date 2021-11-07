import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

import { TestRunTable, ButtonStepCell, ErrorDataCell, TestDataCell } from '../../components';
import useTableSteps from '../../hooks/useTableSteps';
import { getExecutionTest } from '../../redux/store';

const TestRunOrigin = ({ test }) => {
  const { steps } = test;
  const useTableStepsRef = useTableSteps(steps.length);

  /* eslint-disable react/prop-types */
  const columns = React.useMemo(
    () => [
      {
        id: 'action',
        minWidth: 45,
        maxWidth: 45,
        align: 'center',
        Cell: ({ row }) => (
          <ButtonStepCell
            index={row.index}
            id={row.original.stepId}
            useTableStepsRef={useTableStepsRef}
          />
        )
      },
      {
        Header: 'Step',
        accessor: 'name',
        minWidth: 100,
        maxWidth: 100
      },
      {
        Header: 'Associated errors',
        accessor: 'errors',
        minWidth: 65,
        maxWidth: 65,
        align: 'center',
        Cell: ({ row }) => <ErrorDataCell errors={row.values.errors} />
      },
      {
        Header: 'Test data',
        accessor: 'testData',
        minWidth: 65,
        maxWidth: 65,
        align: 'center',
        Cell: ({ row }) => <TestDataCell data={row.values.testData} />
      },
      {
        Header: 'Control point',
        accessor: 'controlPoint',
        minWidth: 100,
        maxWidth: 100
      }
    ],
    [useTableStepsRef.currentState]
  );
  /* eslint-enable react/prop-types */

  return <TestRunTable columns={columns} data={steps} />;
};

TestRunOrigin.propTypes = {
  test: PropTypes.object.isRequired
};

export const TestRun = () => {
  const dispatch = useDispatch();
  const { test, loading } = useSelector((state) => state.testExecution);

  useEffect(() => {
    dispatch(getExecutionTest({ errorId: '91563764-7B2B-4FE9-AB0E-B40D5E62E9D6' }));
  }, []);

  return loading ? (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <TestRunOrigin test={test} />
  );
};

export default TestRun;
