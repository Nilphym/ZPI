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
  getTestStepById
} from '../../redux/reducers/test/testSlice';

const Test = ({ isEditable }) => {
  const {
    control: mainControl,
    handleSubmit,
    getValues
    // formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const {
    testName,
    testSuites,
    testCasesCodes,
    testProceduresCodes,
    selectedTestSuiteId,
    selectedTestCaseId,
    selectedTestProcedureId,
    selectedTestProcedure : {testStepsIds},
    isLoadingTest: isLoading
  } = useSelector((state) => state.test);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(setTestId('test-0')); // TODO: DELETE this line, delete export

    async function getTestData() {
      await dispatch(getTestById());
    }

    getTestData();
  }, []);

  const updateData = (data) => {
    console.log(data);
    setIsEditing(false);
  };

  async function handleTestCaseChange({ target: { value } }) {
    dispatch(setTestTestCase({ id: value }));
    dispatch(setTestCaseLoading(true));
    await dispatch(getTestCaseById());
  }

  async function handleTestProcedureChange({ target: { value } }) {
    dispatch(setTestTestProcedure({ id: value }));
    dispatch(setTestProcedureLoading(true));
    await dispatch(getTestProcedureById());
    for (let i = 0; i < testStepsIds.length; i += 1){
      // eslint-disable-next-line no-await-in-loop
      console.log(testStepsIds[i]);
      await dispatch(getTestStepById(testStepsIds[i]));
    }
  }

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box component="form" onSubmit={handleSubmit(updateData)}>
          <Button onClick={() => console.log(getValues())}>XXXX</Button>
          <Typography variant="h2">Test:</Typography>
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
              Edit
            </Button>
          )}
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
                    {testSuites.map(({ testSuiteId, testSuite }) => (
                      <MenuItem value={testSuiteId}>{testSuite}</MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            />
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
              {testCasesCodes.map(({ testCaseId, testCaseCode }) => (
                <MenuItem value={testCaseId}>{testCaseCode}</MenuItem>
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
              {testProceduresCodes.map(({ testProcedureId, testProcedureCode }) => (
                <MenuItem value={testProcedureId}>{testProcedureCode}</MenuItem>
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
};;

Test.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default Test;
