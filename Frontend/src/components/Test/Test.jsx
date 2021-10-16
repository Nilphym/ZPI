import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TestCase from '../TestCase/TestCase';
import TestProcedure from '../TestProcedure/TestProcedure';
import PropTypes from 'prop-types';

const Test = ({ testId, isEditable }) => {
  const {
    control: mainControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [selectedTestProcedure, setSelectedTestProcedure] = useState('Test Procedure 1');
  const [selectedTestCase, setSelectedTestCase] = useState('Test Case 1');
  const [isEditing, setIsEditing] = useState(false);

  const testName = 'Test-demo';

  const [testProcedures, setTestProcedures] = useState([
    'Test Procedure 1',
    'Test Procedure 2',
    'Test Procedure 3'
  ]);

  const [testCases, setTestCases] = useState(['Test Case 1', 'Test Case 2', 'Test Case 3']);

  const [testCategories, setTestCategories] = useState(['Category 1', 'Category 2', 'Category 3']);

  return (
    <Box>
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
        render={({ field }) => (
          <TextField
            id="testName"
            label="Test Name"
            type="text"
            {...field}
            sx={{
              marginTop: '0.625rem',
              width: '15rem'
            }}
          />
        )}
      />
      <Box sx={{ marginTop: '1rem' }}>
        <Controller
          name="categorySelect"
          control={mainControl}
          render={({ field }) => (
            <Box>
              <InputLabel id="categorySelect">Test Category:</InputLabel>
              <Select
                labelId="categorySelect-label"
                id="categorySelect"
                sx={{ width: '10rem' }}
                {...field}
              >
                {testCategories.map((testCategory) => (
                  <MenuItem value={testCategory}>{testCategory}</MenuItem>
                ))}
              </Select>
            </Box>
          )}
        />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <Controller
          name="caseSelect"
          control={mainControl}
          render={({ field }) => (
            <Box>
              <InputLabel id="caseSelect-label">Test Case:</InputLabel>
              <Select labelId="caseSelect-label" id="caseSelect" sx={{ width: '10rem' }} {...field}>
                {testCases.map((testCase) => (
                  <MenuItem value={testCase}>{testCase}</MenuItem>
                ))}
              </Select>
            </Box>
          )}
        />
        {selectedTestCase && (
          <TestCase
            testName="Test-demo"
            testPlanName={selectedTestProcedure}
            testCaseName="Test-Case-1"
            isEditable={isEditing}
          />
        )}
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <Controller
          name="procedureSelect"
          control={mainControl}
          render={({ field }) => (
            <Box>
              <InputLabel id="procedureSelect-label">Test Procedure</InputLabel>
              <Select
                labelId="procedureSelect-label"
                id="procedureSelect"
                sx={{ width: '10rem' }}
                {...field}
              >
                {testProcedures.map((testProcedure) => (
                  <MenuItem value={testProcedure}>{testProcedure}</MenuItem>
                ))}
              </Select>
            </Box>
          )}
        />
        {selectedTestProcedure && <TestProcedure isEditable={isEditing} />}
      </Box>
      {isEditing && (
        <Button
          variant="outlined"
          sx={{ marginTop: '1.5rem' }}
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Save Test
        </Button>
      )}
    </Box>
  );
};

Test.defaultProps = {
  testId: 'test-0645n6gj4356d4fb$%'
};

Test.propTypes = {
  testId: PropTypes.string,
  isEditable: PropTypes.bool.isRequired
};

export default Test;
