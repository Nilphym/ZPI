import React, {useState, useEffect} from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
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

// TODO: connect with outer control form
// TODO: usable API
// TODO: styles
// part of test creation form
const TestStep = ({ testName, testProcedureName, testStepName }) => {
  const {
    control: innerControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const [isOpened, setIsOpened] = useState(false);
  const [tablesCount, setTablesCount] = useState(0);
  const [editableTables, setEditableTables] = useState([
    {
      tableName: 'table-demo',
      rowsNumber: 5,
      columnsNumber: 8
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);

  useEffect(() => {}, []);

  const addTable = ({ rowsNumber, columnsNumber }) => {
    setTablesCount((state) => state + 1);
    setEditableTables((state) => [
      ...state,
      {
        tableName: `table-${tablesCount}`,
        rowsNumber,
        columnsNumber
      }
    ]);
    setIsAddingTable(false);
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  const deleteTable = tableName => {
    setEditableTables((state => [...state.filter(table => table.tableName !== tableName)]));
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative'
      }}
    >
      <Button
        onClick={
          !isEditing
            ? () => setIsOpened((state) => !state)
            : () => alert('Cannot close the view in an editing mode!')
        }
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: '#0077c2',
          color: 'white'
        }}
      >
        {testStepName}
      </Button>
      {!isOpened && (
        <Box>
          {!isEditing && (
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
          <Box>
            <Typography variant="h5">Test Data:</Typography>
            {editableTables.length > 0 ? (
              <Box>
                {editableTables.map(({ tableName, rowsNumber, columnsNumber }) => (
                  <EditableTable
                    key={`${tableName}`}
                    name={`${testName}-${testProcedureName}-${testStepName}-${tableName}`}
                    rowsNumber={rowsNumber}
                    columnsNumber={columnsNumber}
                    disabled={!isEditing}
                    deleteTable={() => deleteTable(tableName)}
                    // TODO: Add control props from outer form !!!
                  />
                ))}
              </Box>
            ) : (
                <Button sx={{
                  '&.Mui-disabled': {
                    color: ''
                  }
                }} variant="body1" startIcon={<WarningIcon />} disabled>
                No Data
              </Button>
            )}
            {isEditing &&
              (!isAddingTable ? (
                <Button
                  variant="outlined"
                  sx={{ marginTop: '0.625rem' }}
                  onClick={() => setIsAddingTable(true)}
                  startIcon={<AddIcon />}
                >
                  Add table
                </Button>
              ) : (
                <Box component="form" onSubmit={handleSubmit(addTable)}>
                  <Controller
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
                      setIsAddingTable(false);
                      reset(defaultValues);
                    }}
                    startIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              ))}
          </Box>
          <Box>
            <Typography sx={{ marginTop: '1.25rem' }} variant="h5">
              Control Point:
            </Typography>
            <Controller
              name={`${testName}-${testProcedureName}-${testStepName}-result`}
              control={innerControl}
              render={({ field }) => (
                <TextField
                  id={`${testName}-${testProcedureName}-${testStepName}-result`}
                  label="Control Point"
                  type="text"
                  disabled={!isEditing}
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
          {isEditing && (
            <Button
              variant="outlined"
              sx={{ marginTop: '0.625rem' }}
              onClick={() => setIsEditing(false)}
            >
              Save
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestStep.propTypes = {
  testName: PropTypes.string.isRequired,
  testProcedureName: PropTypes.string.isRequired,
  testStepName: PropTypes.string.isRequired
  // control: PropTypes.object.isRequired
};

export default TestStep;
