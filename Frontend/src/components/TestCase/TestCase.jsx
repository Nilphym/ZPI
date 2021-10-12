import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import TestStep from '../TestStep/TestStep';
import EditableTable from '../EditableTable/EditableTable';

const formFields = {
  newTestStepName: 'newTestStepName'
};

const defaultValues = {
  [formFields.newTestStepName]: ''
};

const schema = yup.object().shape({
  [formFields.newTestStepName]: yup.string().required()
});

const TestCase = ({ testPlanName, testName, testCaseName, isEditable }) => {
  const [entryData, setEntryData] = useState([
    {
      entryType: 'textField',
      textFieldName: 'textField-demo'
    },
    {
      entryType: 'table',
      tableName: 'table-demo',
      rowsNumber: 5,
      columnsNumber: 8
    }
  ]);

  const [tablesCount, setTablesCount] = useState(0);
  const [textFieldsCount, setTextFieldsCount] = useState(0);
  const [isAddingTextField, setIsAddingTextField] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);

  const {
    control: innerControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const addField = ({ newTestStepName }) => {
    setTestSteps((state) => [...state, newTestStepName]);
    reset(defaultValues, {
      keepIsValid: true
    });
    setIsAddingTestStep(false);
  };

  return (
    <Box>
      <Typography variant="h4">Test Case:</Typography>
      <Box>
        <Typography
          variant="h5"
          sx={{
            textDecoration: 'underline',
            marginTop: '1.25rem',
            marginBottom: '0.625rem'
          }}
        >
          Preconditions:
        </Typography>
        <Controller
          name={`${testPlanName}-${testName}-${testCaseName}-preconditions`}
          control={innerControl} // TODO: Change controller to outer controller
          render={({ field }) => (
            <TextField
              id={`${testPlanName}-${testName}-${testCaseName}-preconditions`}
              label="Preconditions"
              type="text"
              error=""
              helperText=""
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
      <Box>
        <Typography
          variant="h5"
          sx={{
            textDecoration: 'underline',
            marginTop: '1.25rem',
            marginBottom: '0.625rem'
          }}
        >
          Entry Data:
        </Typography>
        {entryData.length > 0 ? (
          <Box>
            {entryData.map((entryData) => (
              <Box>
                {entryData.entryType === 'textField' ? (
                  <Controller
                    shouldUnregister
                    name={`${testPlanName}-${testName}-${testCaseName}-textField-${entryData.textFieldName}`}
                    control={innerControl} // TODO: Change controller to outer controller
                    render={({ field }) => (
                      <TextField
                        id={`${testPlanName}-${testName}-${testCaseName}-textField-${entryData.textFieldName}`}
                        label="Rows Number"
                        type="text"
                        {...field}
                        sx={{
                          marginTop: '0.625rem',
                          width: '10rem'
                        }}
                      />
                    )}
                  />
                ) : (
                  <EditableTable
                    name={entryData.tableName}
                    rowsNumber={entryData.rowsNumber}
                    columnsNumber={entryData.columnsNumber}
                    disabled={false}
                    deleteTable={() => console.log()}
                  />
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Button
            sx={{
              '&.Mui-disabled': {
                color: 'black'
              }
            }}
            variant="body1"
            startIcon={<WarningIcon />}
            disabled
          >
            No Data
          </Button>
        )}
        <Box>
          {!isAddingTable && !isAddingTextField ? (
            <Button>Add TextField</Button> && <Button>Add Table</Button>
          ) : (
            <Box>{isAddingTable ? <></> : <></>}</Box> // TODO: Modal for Table and TextField
          )}
        </Box>
      </Box>
    </Box>
  );
};

TestCase.propTypes = {
  testPlanName: PropTypes.string.isRequired,
  testName: PropTypes.string.isRequired,
  testProcedureName: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired
};

export default TestCase;
