import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import TestStep from '../TestStep/TestStep';

const formFields = {
  newTestStepName: 'newTestStepName'
};

const defaultValues = {
  [formFields.newTestStepName]: ''
};

const schema = yup.object().shape({
  [formFields.newTestStepName]: yup.string().required()
});

const TestProcedure = ({ testPlanName, testName, testProcedureName, isEditable }) => {
  const [testSteps, setTestSteps] = useState(['Test Step 1', 'Test Step 2', 'Test Step 3']);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTestStep, setIsAddingTestStep] = useState(false);

  const {
    control: innerControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const addTestStep = ({ newTestStepName }) => {
    setTestSteps((state) => [...state, newTestStepName]);
    reset(defaultValues, {
      keepIsValid: true
    });
    setIsAddingTestStep(false);
  };

  return (
    <Box>
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
      <Typography variant="h4">Test Procedure:</Typography>
      <Typography
        variant="h5"
        sx={{ textDecoration: 'underline', marginTop: '0.625rem', marginBottom: '0.625rem' }}
      >
        Test Steps:
      </Typography>
      {testSteps.map((testStep) => (
        <TestStep
          testName={testName}
          testProcedureName="TestProcedure1"
          testStepName={testStep}
          isEditable={isEditing}
        />
        // TODO: and control from outer form Controller
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
            <Box component="form" onSubmit={handleSubmit(addTestStep)}>
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
          name={`${testPlanName}-${testName}-${testProcedureName}-result`}
          control={innerControl}
          render={({ field }) => (
            <TextField
              id={`${testPlanName}-${testName}-${testProcedureName}-result`}
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
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

TestProcedure.propTypes = {
  testPlanName: PropTypes.string.isRequired,
  testName: PropTypes.string.isRequired,
  testProcedureName: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired
};

export default TestProcedure;
