import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from 'react-redux';
import TestItem from './TestItem';
import {
  deleteTestSuite,
  changeTestSuiteName,
  postTest,
  setTestId,
  getTestSuiteTests
} from '../../redux/store';

const TestSuiteItem = ({ isEditable, testSuite, testSuiteId }) => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const [isChangingTestSuiteName, setIsChangingTestSuiteName] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    selectedTestPlan: { tests },
    isLoadingTestSuites
  } = useSelector((state) => state.testPlan);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getTestSuiteTests(testSuiteId));
  }, [testSuiteId]);

  const changeSuiteName = ({ testSuiteName }) => {
    dispatch(changeTestSuiteName({ newTestSuiteName: testSuiteName, testSuiteId }));
    setIsChangingTestSuiteName(false);
  };

  async function addTest() {
    const newTestId = await dispatch(postTest());
    dispatch(setTestId(newTestId.payload));
    navigate(`${pathname}/test-${newTestId.payload}`);
  }

  const removeTestSuite = () => {
    dispatch(deleteTestSuite({ testSuiteId }));
  };

  return (
    <Box>
      {isLoadingTestSuites[testSuiteId] ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box>
            <Box
              onClick={!isChangingTestSuiteName ? () => setIsOpened((state) => !state) : () => {}}
              sx={
                !isChangingTestSuiteName && (isEditable || tests[testSuiteId].length) > 0
                  ? {
                      position: 'relative',
                      backgroundColor: '#42a5f5',
                      border: '0.125rem solid #0077c2',
                      padding: '0.625rem',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }
                  : {
                      position: 'relative',
                      backgroundColor: '#42a5f5',
                      border: '0.125rem solid #0077c2',
                      padding: '0.625rem'
                    }
              }
            >
              <Typography
                sx={{
                  marginLeft: '0.625rem',
                  userSelect: 'none',
                  fontWeight: '700'
                }}
              >
                {testSuite}
              </Typography>
              {isEditable &&
                (!isChangingTestSuiteName ? (
                  <CreateIcon
                    onClick={() => setIsChangingTestSuiteName(true)}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: '3.5vw',
                      transform: 'translateY(-50%)',
                      border: '1px solid black',
                      borderRadius: '50%',
                      padding: '2px',
                      zIndex: 2,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  />
                ) : (
                  <Box
                    sx={{ position: 'relative' }}
                    component="form"
                    onSubmit={handleSubmit(changeSuiteName)}
                  >
                    <Controller
                      shouldUnregister
                      name="testSuiteName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          id="testSuiteName"
                          label="Test Suite Name"
                          type="text"
                          {...field}
                          disabled={!isEditable}
                          error={!!errors.testSuiteName}
                          helperText={!!errors.testSuiteName && 'Field cannot be empty!'}
                          sx={{
                            marginTop: '0.625rem',
                            width: '15rem'
                          }}
                        />
                      )}
                    />
                    <Button
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                        color: 'black',
                        border: '0.0625rem solid black',
                        transform: 'translateY(50%)',
                        left: '16rem'
                      }}
                      variant="outlined"
                      type="submit"
                    >
                      Change
                    </Button>
                    <HighlightOffIcon
                      sx={{
                        position: 'absolute',
                        zIndex: 2,
                        color: 'black',
                        top: '0.5rem',
                        left: '13.6rem',
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                      onClick={() => setIsChangingTestSuiteName(false)}
                    />
                  </Box>
                ))}
              {isEditable && tests[testSuiteId].length === 0 && (
                <DeleteIcon
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '1vw',
                    transform: 'translateY(-50%)',
                    border: '1px solid black',
                    borderRadius: '50%',
                    padding: '2px',
                    zIndex: 3,
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => removeTestSuite()}
                />
              )}
            </Box>

            <Box>
              {isOpened &&
                tests[testSuiteId].map(({ id, name }) => (
                  <TestItem isEditable={isEditable} testName={name} testId={id} />
                ))}
            </Box>
          </Box>
          {isOpened && isEditable && (
            <Button
              sx={{
                margin: '0.625rem 0 0.625rem 1rem'
              }}
              onClick={() => addTest()}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Add a new test
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestSuiteItem.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  testSuite: PropTypes.string.isRequired,
  testSuiteId: PropTypes.string.isRequired
};

export default TestSuiteItem;
