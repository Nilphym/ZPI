import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import TestCase from '../TestCase/TestCase';
import TestProcedure from '../TestProcedure/TestProcedure';
import {
  getTestById,
  setTestTestCase,
  setTestTestProcedure,
  getTestCaseById,
  getTestProcedureById,
  setTestName,
  setTestSuite,
  putTestById,
  setTestLoading,
  postTestProcedure,
  postTestCase,
  setTestId
} from '../../redux/store';

export const Test = ({ isEditable }) => {
  const { control: mainControl, getValues } = useForm();

  const dispatch = useDispatch();
  const {
    testData: { testName, creationDate, version, executionCounter },
    testSuites,
    testCasesCodes,
    testProceduresCodes,
    selectedTestSuiteId,
    selectedTestCaseId,
    selectedTestProcedureId,
    isLoadingTest: isLoading
  } = useSelector((state) => state.test);

  const {
    token: { productId }
  } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(setTestId('t1'));

    async function getTestData() {
      await dispatch(getTestById());
    }

    getTestData();
  }, []);

  async function saveTest() {
    setIsEditing(false);
    dispatch(setTestName({ newName: getValues('testName') }));
    dispatch(setTestSuite({ newTestSuiteId: getValues('suiteSelect') }));
    await dispatch(putTestById());
    dispatch(setTestLoading({ isLoading: true }));
    await dispatch(getTestById());
  }

  async function handleTestCaseChange({ target: { value } }) {
    if (value) {
      dispatch(setTestTestCase({ id: value }));
      await dispatch(getTestCaseById());
    }
  }

  async function handleTestProcedureChange({ target: { value } }) {
    if (value) {
      dispatch(setTestTestProcedure({ id: value }));
      await dispatch(getTestProcedureById());
    }
  }

  async function addTestCase() {
    await dispatch(putTestById());
    dispatch(postTestCase(productId));
    dispatch(setTestLoading(true));
    await dispatch(getTestById());
  }

  async function addTestProcedure() {
    await dispatch(putTestById());
    dispatch(postTestProcedure());
    dispatch(setTestLoading(true));
    await dispatch(getTestById());
  }

  return (
    <Box
      sx={{
        position: 'relative',
        margin: '1.5rem'
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h2" sx={{ color: 'rgb(46, 115, 171)' }}>
            Test
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: '2.5rem',
              left: '20.5rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: '700'
              }}
            >
              Additional Info:
            </Typography>
            <Typography>{`Creation Date: ${creationDate}`}</Typography>
            <Typography>{`Version: ${version}`}</Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                textDecoration: 'underline'
              }}
            >
              {`Execution Counter: ${executionCounter}`}
            </Typography>
          </Box>
          <Box>
            {/* Information TODO: DELETE */}
            <Controller
              shouldUnregister
              name="testName"
              control={mainControl}
              defaultValue={testName}
              render={({ field }) => (
                <TextField
                  id="testName"
                  label="Test Name"
                  type="text"
                  {...field}
                  disabled={!isEditing}
                  sx={{
                    marginTop: '0.625rem',
                    width: '15rem'
                  }}
                />
              )}
            />
            <Controller
              name="suiteSelect"
              control={mainControl}
              defaultValue={selectedTestSuiteId}
              render={({ field }) => (
                <Box>
                  <InputLabel id="suiteSelect">Test Suite</InputLabel>
                  <Select
                    labelId="suiteSelect-label"
                    id="suiteSelect"
                    sx={{ width: '10rem' }}
                    disabled={!isEditing}
                    {...field}
                  >
                    {testSuites.map(({ testSuiteId, testSuite }) => (
                      <MenuItem key={`TestSuite-${testSuiteId}`} value={testSuiteId}>
                        {testSuite}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            />
            <Box sx={{ marginTop: '1rem' }}>
              <InputLabel id="caseSelect-label">Test Case</InputLabel>
              <Select
                labelId="caseSelect-label"
                id="caseSelect"
                sx={{ width: '10rem' }}
                disabled={!isEditing}
                onChange={(e) => handleTestCaseChange(e)}
                value={selectedTestCaseId}
              >
                {testCasesCodes.length > 0 &&
                  testCasesCodes.map(({ testCaseId, testCaseCode }) => (
                    <MenuItem key={`TestCase-${testCaseId}`} value={testCaseId}>
                      {testCaseCode}
                    </MenuItem>
                  ))}
                <MenuItem value="">
                  <Button onClick={() => addTestCase()}>+ Add Case</Button>
                </MenuItem>
              </Select>
            </Box>
            <Box sx={{ marginTop: '1rem' }}>
              <InputLabel id="procedureSelect-label">Test Procedure</InputLabel>
              <Select
                labelId="procedureSelect-label"
                id="procedureSelect"
                sx={{ width: '10rem' }}
                disabled={!isEditing}
                onChange={(e) => handleTestProcedureChange(e)}
                value={selectedTestProcedureId}
              >
                {testProceduresCodes.length > 0 &&
                  testProceduresCodes.map(({ testProcedureId, testProcedureCode }) => (
                    <MenuItem key={`TestProcedure-${testProcedureId}`} value={testProcedureId}>
                      {testProcedureCode}
                    </MenuItem>
                  ))}
                <MenuItem value="">
                  <Button onClick={() => addTestProcedure()}>+ Add Procedure</Button>
                </MenuItem>
              </Select>
            </Box>
          </Box>
          {isEditable && !isEditing && (
            <Button
              sx={{
                position: 'absolute',
                top: '3rem',
                right: '3rem'
              }}
              variant="contained"
              onClick={() => setIsEditing(true)}
            >
              Edit Test
            </Button>
          )}

          {selectedTestCaseId && <TestCase isEditable={isEditing} />}

          {selectedTestProcedureId && <TestProcedure isEditable={isEditing} />}
          {isEditing && (
            <Button
              variant="contained"
              sx={{
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                bgcolor: '#0077c2',
                fontWeight: '700',
                color: 'white'
              }}
              onClick={() => saveTest()}
            >
              Save Test
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

Test.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default Test;
export { default as TestCreationNav } from './TestCreationNav';
