import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import TestStep from '../TestStep/TestStep';
import {
  getTestProcedureById,
  postTestStep,
  editTestProcedureResult,
  setTestProcedureLoading,
  putTestProcedureById
} from '../../redux/reducers/test/testSlice';

const formFields = {
  newTestStepName: 'newTestStepName'
};

const defaultValues = {
  [formFields.newTestStepName]: ''
};

const schema = yup.object().shape({
  [formFields.newTestStepName]: yup.string().required()
});

const TestProcedure = ({ isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTestStep, setIsAddingTestStep] = useState(false);

  const {
    control: innerControl,
    handleSubmit: innerHandleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { control: testProcedureControl, getValues } = useForm();

  const dispatch = useDispatch();
  const {
    selectedTestProcedure: { result, testStepsIds },
    isLoadingTestProcedure: isLoading
  } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(setTestProcedureLoading({ isLoading: true }));
    async function getTestProcedureData() {
      await dispatch(getTestProcedureById());
    }
    getTestProcedureData();
  }, []);

  async function addTestStep({ newTestStepName }) {
    await dispatch(postTestStep(newTestStepName));
    reset(defaultValues, {
      keepIsValid: true
    });
    setIsAddingTestStep(false);
    setIsEditing(false);
    dispatch(setTestProcedureLoading({ isLoading: true }));
    await dispatch(getTestProcedureById());
  }

  async function saveTestProcedure() {
    setIsAddingTestStep(false);
    setIsEditing(false);
    dispatch(editTestProcedureResult(getValues('result')));
    await dispatch(putTestProcedureById());
    dispatch(setTestProcedureLoading({ isLoading: true }));
    await dispatch(getTestProcedureById());
  }

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ position: 'relative', marginTop: '1.5rem' }}>
          {isEditable && !isEditing && (
            <CreateIcon
              sx={{
                position: 'absolute',
                top: '6vh',
                right: '2vw',
                border: '1px solid black',
                borderRadius: '50%',
                padding: '2px',
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
              onClick={() => setIsEditing(true)}
            />
          )}
          <Typography variant="h4" sx={{ fontSize: '1.9rem' }}>
            Test Procedure:
          </Typography>
          <Typography
            variant="h5"
            sx={{ textDecoration: 'underline', marginTop: '0.625rem', marginBottom: '0.625rem' }}
          >
            Test Steps:
          </Typography>
          {testStepsIds.map((testStepId) => (
            <TestStep testStepId={testStepId} isEditable={isEditing} />
          ))}
          {isEditable && isEditing && (
            <Box>
              {!isAddingTestStep ? (
                <Button
                  onClick={() => setIsAddingTestStep(true)}
                  variant="outlined"
                  sx={{
                    marginTop: '0.625rem'
                  }}
                >
                  Add Test Step
                </Button>
              ) : (
                <Box component="form" onSubmit={innerHandleSubmit(addTestStep)}>
                  <Controller
                    shouldUnregister
                    name={formFields.newTestStepName}
                    control={innerControl}
                    render={({ field }) => (
                      <TextField
                        id={formFields.newTestStepName}
                        label="New test step name"
                        type="text"
                        error={!!errors.newTestStepName}
                        helperText={!!errors.newTestStepName && 'Test Step field cannot be empty!'}
                        {...field}
                        sx={{
                          marginTop: '0.625rem'
                        }}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      height: '3.125rem',
                      width: '7rem',
                      margin: '0.625rem 0.625rem 1.25rem 0.625rem'
                    }}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      height: '3.125rem',
                      width: '7rem',
                      marginTop: '0.625rem',
                      marginBottom: '1.25rem'
                    }}
                    onClick={() => {
                      setIsAddingTestStep(false);
                      reset(defaultValues);
                    }}
                    startIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Box>
          )}
          <Box>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline',
                marginTop: '1.25rem',
                marginBottom: '0.625rem'
              }}
            >
              Result:
            </Typography>
            <Controller
              name="result"
              control={testProcedureControl}
              defaultValue={result}
              render={({ field }) => (
                <TextField
                  id="result"
                  label="Result"
                  type="text"
                  error=""
                  helperText=""
                  disabled={!isEditing}
                  multiline
                  rows={3}
                  {...field}
                  sx={{
                    marginTop: '0.625rem',
                    width: '100%'
                  }}
                />
              )}
            />
          </Box>
          {isEditing && (
            <Button
              variant="outlined"
              sx={{ marginTop: '0.625rem' }}
              onClick={() => saveTestProcedure()}
            >
              Save Test Procedure
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};;

TestProcedure.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default TestProcedure;
