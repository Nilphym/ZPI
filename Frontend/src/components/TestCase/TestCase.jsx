import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import EditableTable from '../EditableTable/EditableTable';
import { getTestCaseById } from '../../redux/reducers/test/testSlice';


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

const TestCase = ({ isEditable }) => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTextField, setIsAddingTextField] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);

  const {
    control: testCaseControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const addField = ({ rowsNumber, columnsNumber, textField }) => {
    if (isAddingTable) {
      setEntryData((state) => [
        ...state,
        {
          entryType: 'table',
          tableName: `table-${tablesCount}`,
          rowsNumber,
          columnsNumber
        }
      ]);
      setTablesCount((state) => state + 1);
      setIsAddingTable(false);
    }
    if (isAddingTextField) {
      setEntryData((state) => [
        ...state,
        {
          entryType: 'textField',
          textFieldName: textField
        }
      ]);
      setIsAddingTextField(false);
      setTextFieldsCount((state) => state + 1);
    }
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  const deleteTextField = (id) => {
    setEntryData((state) => [
      ...state.filter(
        (item) =>
          item.entryType === 'table' ||
          (item.entryType === 'textField' && item.textFieldName !== id)
      )
    ]);
  };

  const deleteTable = (id) => {
    setEntryData((state) => [
      ...state.filter(
        (item) =>
          item.entryType === 'textField' || (item.entryType === 'table' && item.tableName !== id)
      )
    ]);
  };

  const dispatch = useDispatch();
  const {
    selectedTestCase: {preconditions},
    isLoadingTestCase: isLoading
  } = useSelector((state) => state.test);

  useEffect(() => {
    async function getTestCaseData() {
      await dispatch(getTestCaseById());
    }
    getTestCaseData();
  }, []);

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
            Test Case:
          </Typography>
          <Box>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline',
                marginTop: '0.625rem',
                marginBottom: '0.625rem'
              }}
            >
              Preconditions:
            </Typography>
            <Controller
              name='preconditions'
              control={testCaseControl} // TODO: Change controller to outer controller
              defaultValue={preconditions}
                render={({ field }) => (
                <TextField
                  id='preconditions'
                  label="Preconditions"
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
                      <Box
                        sx={{
                          position: 'relative'
                        }}
                      >
                        {isEditing && (
                          <DeleteIcon
                            onClick={() => deleteTextField(entryData.textFieldName)}
                            sx={{
                              position: 'absolute',
                              top: '2.3vh',
                              right: '1vw',
                              border: '1px solid black',
                              borderRadius: '50%',
                              padding: '2px',
                              zIndex: 1,
                              '&:hover': {
                                cursor: 'pointer'
                              }
                            }}
                          />
                        )}
                        <Controller
                          shouldUnregister
                          name={entryData.textFieldName}
                          control={testCaseControl} // TODO: Change controller to outer controller
                          render={({ field }) => (
                            <TextField
                              id={entryData.textFieldName}
                              label="Entry Data"
                              type="text"
                              disabled={!isEditing}
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
                        disabled={!isEditing}
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
              {isEditing ? (
                <Box>
                  {!isAddingTable && !isAddingTextField ? (
                    <Box
                      sx={{
                        marginTop: '0.625rem'
                      }}
                    >
                      <Button variant="outlined" onClick={() => setIsAddingTextField(true)}>
                        Add TextField
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ marginLeft: '0.625rem' }}
                        onClick={() => setIsAddingTable(true)}
                      >
                        Add Table
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {isAddingTable ? (
                        <Box component="form" onSubmit={handleSubmit(addField)}>
                          <Controller
                            shouldUnregister
                            name={formFields.rowsNumber}
                            control={testCaseControl}
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
                            control={testCaseControl}
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
                            onClick={() =>
                              addField({
                                textField: `textField-${textFieldsCount}`
                              })
                            }
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
                      )}
                    </Box>
                  )}
                </Box>
              ) : (
                <Box />
              )}
            </Box>
          </Box>
          {isEditing && (
            <Button
              variant="outlined"
              sx={{ marginTop: '1.5rem' }}
              onClick={() => {
                setIsEditing(false);
                setIsAddingTable(false);
                setIsAddingTextField(false);
              }}
            >
              Save Test Case
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestCase.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default TestCase;