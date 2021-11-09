/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  getTestPlanById,
  putTestPlanById,
  editTestPlanName,
  setTestPlanId,
  postTestSuite,
  setLoading
} from '../../redux/store';
import TestSuiteItem from './TestSuiteItem';

export const TestPlan = ({ isEditable }) => {
  const {
    selectedTestPlan: { name: testPlanName, testSuites },
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
    dispatch(setLoading({ isLoading: true }));
    async function getTestPlanData() {
      await dispatch(getTestPlanById());
    }
    getTestPlanData();
  }, []);

  async function saveTestPlan() {
    setIsEditing(false);
    setIsAddingTestSuite(false);
    dispatch(setLoading({ isLoading: true }));
    await dispatch(putTestPlanById());
    await dispatch(getTestPlanById());
  }

  async function addTestSuite({ newTestSuite }) {
    setIsAddingTestSuite(false);
    dispatch(postTestSuite(newTestSuite));
    dispatch(setLoading({ isLoading: true }));
    await dispatch(getTestPlanById());
  }

  return (
    <Box
      sx={{
        position: 'relative',
        margin: '1.5rem',
        minWidth: '70rem'
      }}
    >
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
              variant="contained"
              onClick={() => setIsEditing(true)}
              startIcon={<CreateIcon />}
            >
              Edit Test Plan
            </Button>
          )}
          <Box>
            <Typography variant="h2" sx={{ userSelect: 'none' }}>
              Test Plan:
            </Typography>
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
                    width: '15rem',
                    userSelect: 'none'
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '3rem' }}>
            {testSuites.map(({ id, category }) => (
              <TestSuiteItem isEditable={isEditing} testSuite={category} testSuiteId={id} />
            ))}
            {!isAddingTestSuite && isEditing && (
              <Button
                variant="contained"
                onClick={() => setIsAddingTestSuite(true)}
                sx={{ marginTop: '1rem', marginBottom: '0.625rem' }}
                startIcon={<AddIcon />}
              >
                Add a new Suite
              </Button>
            )}
          </Box>
          {isAddingTestSuite && (
            <Box
              sx={{
                position: 'relative',
                height: '5rem'
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
                      position: 'absolute',
                      top: '50%',
                      left: '2%',
                      transform: 'translateY(-50%)',
                      width: '10rem'
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '17%'
                }}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
              <Button
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '26%'
                }}
                startIcon={<CloseIcon />}
                onClick={() => setIsAddingTestSuite(false)}
                variant="contained"
              >
                Close
              </Button>
            </Box>
          )}
          {isEditing && (
            <Button variant="contained"
              onClick={() => saveTestPlan()}
              sx={{
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                bgcolor: '#0077c2',
                fontWeight: '700',
                color: 'white'
              }}>
              Save Test Plan
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestPlan.propTypes = {
  isEditable: PropTypes.bool
};

TestPlan.defaultProps = {
  isEditable: false
};

export default TestPlan;
