import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableTable from '../EditableTable/EditableTable';

const formFields = {
  rowsNumber: 'rowsNumber',
  columnsNumber: 'columnsNumber'
};

const defaultValues = {
  [formFields.rowsNumber]: '',
  [formFields.columnsNumber]: ''
};

const schema = yup.object().shape({
  [formFields.rowsNumber]: yup.number().required().min(1).max(10),
  [formFields.columnsNumber]: yup.number().required().min(1).max(10)
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

  const addField = ({ rowsNumber, columnsNumber, textField }) => {
    if (isAddingTable) {
      setEntryData(state => [...state, {
        entryType: 'table',
        tableName: `table-${tablesCount}`,
        rowsNumber,
        columnsNumber
      }]);
      setTablesCount(state => state + 1);
      setIsAddingTable(false);
    }
    if (isAddingTextField) {
      setEntryData(state => [...state, {
        entryType: 'textField',
        textFieldName: textField
      }]);
      setIsAddingTextField(false);
      setTextFieldsCount(state => state + 1);
    }
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  const deleteTextField = (id) => {
    setEntryData(state => [...state.filter(item => item.entryType === 'table' ||
      (item.entryType === 'textField' && item.textFieldName !== id))]);
  };

  const deleteTable = (id) => {
    setEntryData(state => [...state.filter(item => item.entryType === 'textField' ||
      (item.entryType === 'table' && item.tableName !== id))]);
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
                  <Box sx={{
                    position: 'relative'
                  }}>
                    <DeleteIcon
                      onClick={() => deleteTextField(entryData.textFieldName)}
                      sx={{
                        position: 'absolute',
                        top: '2.3vh',
                        right: '1vw',
                        border: '1px solid black',
                        borderRadius: '50%',
                        padding: '2px',
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }} />
                    <Controller
                      shouldUnregister
                      name={entryData.textFieldName}
                      control={innerControl} // TODO: Change controller to outer controller
                      render={({ field }) => (
                        <TextField
                          id={entryData.textFieldName}
                          label="TextField"
                          type="text"
                          {...field}
                          sx={{
                            marginTop: '0.625rem',
                            width: '100%'
                          }}
                        />
                      )}
                    />
                  </Box>

                ) : (
                  <EditableTable
                    name={entryData.tableName}
                    rowsNumber={entryData.rowsNumber}
                    columnsNumber={entryData.columnsNumber}
                    disabled={!isEditable}
                    deleteTable={() => deleteTable(entryData.tableName)}
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
          {(!isAddingTable && !isAddingTextField) ? (
            <Box>
              <Button onClick={() => setIsAddingTextField(true)}>Add TextField</Button>
              <Button onClick={() => setIsAddingTable(true)}>Add Table</Button>

            </Box>
          ) : (
            <Box>
              {isAddingTable ? (
                <Box component="form" onSubmit={handleSubmit(addField)}>
                  <Controller
                    shouldUnregister
                    name={formFields.rowsNumber}
                    control={innerControl}
                    render={({ field }) => (
                      <TextField
                        id={formFields.rowsNumber}
                        label="Rows Number"
                        type="text"
                        error={!!errors.rowsNumber}
                        helperText={
                          !!errors.rowsNumber &&
                          'Rows number is required and must belong to [1-10]!'
                        }
                        {...field}
                        sx={{
                          marginTop: '0.625rem',
                          width: '10rem'
                        }}
                      />
                    )}
                  />
                  <Controller
                    shouldUnregister
                    name={formFields.columnsNumber}
                    control={innerControl}
                    render={({ field }) => (
                      <TextField
                        id={formFields.columnsNumber}
                        label="Columns Number"
                        type="text"
                        error={!!errors.columnsNumber}
                        helperText={
                          !!errors.columnsNumber &&
                          'Columns number is required and must belong to [1-10]!'
                        }
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
                      setIsAddingTextField(false);
                      setIsAddingTable(false);
                      reset(defaultValues);
                    }}
                    startIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    onClick={() => addField({ textField: `${testPlanName}-${testName}-${testCaseName}-textField-${textFieldsCount}` })}
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
                      setIsAddingTextField(false);
                      setIsAddingTable(false);
                      reset(defaultValues);
                    }}
                    startIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              )
              }
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

TestCase.propTypes = {
  testPlanName: PropTypes.string.isRequired,
  testName: PropTypes.string.isRequired,
  testCaseName: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired
  // TODO: control: PropTypes.object.isRequired
};

export default TestCase;