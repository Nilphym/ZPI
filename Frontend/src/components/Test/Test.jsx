import React, { useState, useEffect } from 'react';
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
import PropTypes from 'prop-types';
import TestCase from '../TestCase/TestCase';
import TestProcedure from '../TestProcedure/TestProcedure';
import {
  getTestById,
  setTestId,
  setTestTestCase,
  setTestTestProcedure,
  getTestCaseById,
  getTestProcedureById,
  setTestCaseLoading,
  setTestProcedureLoading,
  setTestName,
  setTestSuite,
  putTestById,
  setTestLoading
} from '../../redux/reducers/test/testSlice';

const Test = ({ isEditable }) => {
  const {
    control: mainControl,
    handleSubmit,
    getValues
  } = useForm();

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

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(setTestId('t1')); // TODO: DELETE this line, delete export

    async function getTestData() {
      await dispatch(getTestById());
    }

    getTestData();
  }, []);

  async function saveTest({testName}){
    setIsEditing(false);
    dispatch(setTestName({ newName: testName }));
    dispatch(setTestSuite({ newTestSuiteId: getValues('suiteSelect') }));
    await dispatch(putTestById());
    dispatch(setTestLoading({isLoading: true}));
    await dispatch(getTestById());
  };

  async function handleTestCaseChange({ target: { value } }) {
    dispatch(setTestTestCase({ id: value }));
    dispatch(setTestCaseLoading(true));
    await dispatch(getTestCaseById());
  }

  async function handleTestProcedureChange({ target: { value } }) {
    dispatch(setTestTestProcedure({ id: value }));
    dispatch(setTestProcedureLoading(true));
    await dispatch(getTestProcedureById(getValues('suiteSelect')));
  }

  return (
    <Box
      sx={{
        position: 're'
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h2">Test:</Typography>
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
          {isEditable && !isEditing && (
            <Button
              sx={{
                position: 'absolute',
                top: '3rem',
                right: '3rem'
              }}
              variant="outlined"
              onClick={() => setIsEditing(true)}
            >
              Edit Test
            </Button>
          )}
          <Box component="form" onSubmit={handleSubmit(saveTest)}>
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
            <Box sx={{ marginTop: '1rem' }}>
              <Controller
                name="suiteSelect"
                control={mainControl}
                defaultValue={selectedTestSuiteId}
                render={({ field }) => (
                  <Box>
                    <InputLabel id="suiteSelect">Test Suite:</InputLabel>
                    <Select
                      labelId="suiteSelect-label"
                      id="suiteSelect"
                      sx={{ width: '10rem' }}
                      disabled={!isEditing}
                      {...field}
                    >
                      {testSuites
                        .filter((testSuite) => testSuite.testSuiteId !== selectedTestSuiteId)
                        .map(({ testSuiteId, testSuite }) => (
                          <MenuItem key={`TestSuite-${testSuiteId}`} value={testSuiteId}>
                            {testSuite}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                )}
              />
            </Box>
          </Box>

          <Box sx={{ marginTop: '1rem' }}>
            <InputLabel id="caseSelect-label">Test Case:</InputLabel>
            <Select
              labelId="caseSelect-label"
              id="caseSelect"
              sx={{ width: '10rem' }}
              disabled={!isEditing}
              onChange={(e) => handleTestCaseChange(e)}
              value={selectedTestCaseId}
            >
              {testCasesCodes
                .filter((testCase) => testCase.testCaseId !== selectedTestCaseId)
                .map(({ testCaseId, testCaseCode }) => (
                  <MenuItem key={`TestCase-${testCaseId}`} value={testCaseId}>
                    {testCaseCode}
                  </MenuItem>
                ))}
            </Select>

            {selectedTestCaseId && <TestCase isEditable={isEditing} />}
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
              {testProceduresCodes
                .filter(
                  (testProcedure) => testProcedure.testProcedureId !== selectedTestProcedureId
                )
                .map(({ testProcedureId, testProcedureCode }) => (
                  <MenuItem key={`TestProcedure-${testProcedureId}`} value={testProcedureId}>
                    {testProcedureCode}
                  </MenuItem>
                ))}
            </Select>

            {selectedTestProcedureId && <TestProcedure isEditable={isEditing} />}
          </Box>
          {isEditing && (
            <Button variant="outlined" sx={{ marginTop: '1.5rem' }} type="submit">
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
