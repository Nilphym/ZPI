/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  postTest,
  setTestId,
  getTestPlanById,
  putTestPlanById,
  editTestPlanName,
  setTestPlanId,
  postTestSuite
} from '../../redux/store';
import TestSuiteItem from './TestSuiteItem';

export const TestPlan = ({ isEditable }) => {
  const {
    selectedTestPlan: { id, name: testPlanName, testSuites, tests },
    isLoading
  } = useSelector((state) => state.testPlan);

  const { control, getValues } = useForm();
  const {
    control: testSuiteControl,
    handleSubmit: handleTestSuite,
    getValues: getTestSuiteFormValues
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTestSuite, setIsAddingTestSuite] = useState(false);

  useEffect(() => {
    dispatch(setTestPlanId({ id: 'tplan1' }));

    async function getTestPlanData() {
      await dispatch(getTestPlanById());
    }
    getTestPlanData();
  }, []);

  async function addTest() {
    const newTestId = await dispatch(postTest());
    dispatch(setTestId(newTestId.payload));
    navigate(`${pathname}/test-e-${newTestId.payload}`);
  }

  async function saveTestPlan() {
    setIsEditing(false);
    setIsAddingTestSuite(false);
    await dispatch(putTestPlanById());
    await dispatch(getTestPlanById());
  }

  async function addTestSuite({ newTestSuite }) {
    setIsAddingTestSuite(false);
    dispatch(postTestSuite(newTestSuite));
    await dispatch(getTestPlanById());
  }

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
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
              Edit Test Plan
            </Button>
          )}
          <Box>
            <Typography variant="h2">Test Plan:</Typography>
            <Controller
              shouldUnregister
              name="testPlanName"
              control={control}
              render={({ field }) => (
                <TextField
                  id="testPlanName"
                  label="Test Plan Name"
                  type="text"
                  {...field}
                  disabled={!isEditing}
                  value={testPlanName}
                  onChange={(e) => dispatch(editTestPlanName({ newTestName: e.target.value }))}
                  sx={{
                    marginTop: '1.25rem',
                    width: '15rem'
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '3rem' }}>
            {testSuites.map(({ testSuite, testSuiteId }) => (
              <TestSuiteItem
                isEditable={isEditing}
                testSuite={testSuite}
                testSuiteId={testSuiteId}
                tests={tests}
              />
            ))}
            {!isAddingTestSuite && isEditing && (
              <Button
                variant="outlined"
                onClick={() => setIsAddingTestSuite(true)}
                sx={{ marginTop: '0.625rem', marginBottom: '0.625rem' }}
                startIcon={<AddIcon />}
              >
                Add a new Suite
              </Button>
            )}
          </Box>
          {isAddingTestSuite && (
            <Box
              sx={{
                position: 'relative'
              }}
              component="form"
              onSubmit={handleTestSuite(addTestSuite)}
            >
              <Controller
                shouldUnregister
                name="newTestSuite"
                control={testSuiteControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="newTestSuite"
                    label="Test Suite"
                    type="text"
                    {...field}
                    sx={{
                      marginTop: '0.625rem',
                      width: '10rem'
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  height: '3.125rem',
                  width: '3rem',
                  margin: '0.8rem 0.625rem 1.25rem 0.625rem'
                }}
              >
                Add
              </Button>
              <HighlightOffIcon
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  color: 'black',
                  top: '0.5rem',
                  left: '8.6rem',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}
                onClick={() => setIsAddingTestSuite(false)}
              />
            </Box>
          )}
        </Box>
      )}
      <Button
        sx={{ position: 'absolute', top: '5vh', left: '30vw', backgroundColor: 'yellow' }}
        variant="outlined"
        onClick={() => addTest()}
      >
        Add a new Test (TO DELETE)
      </Button>
      {isEditing && (
        <Button variant="outlined" onClick={() => saveTestPlan()} sx={{ marginTop: '1.25rem' }}>
          Save Test Plan
        </Button>
      )}
    </Box>
  );
};

TestPlan.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default TestPlan;
