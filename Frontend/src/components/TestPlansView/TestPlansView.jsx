import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { postTestPlan, setProductId, getProductTestPlansById } from '../../redux/store';
import TestPlanItem from './TestPlanItem';

export const TestPlansView = () => {
  const dispatch = useDispatch();
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [isAddingTestPlan, setIsAddingTestPlan] = useState(false);
  const [searchBarData, setSearchBarData] = useState('');

  const { testPlans, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    async function getProductTestPlanData() {
      dispatch(setProductId({ productId: '43463' })); // TODO: to DELETE
      // await dispatch(getProductById()); // TODO: to DELETE
      await dispatch(getProductTestPlansById());
    }
    getProductTestPlanData();
  }, []);

  async function addTestPlan() {
    const testPlanName = getValues('testPlanName');
    dispatch(postTestPlan(testPlanName));
    await dispatch(getProductTestPlansById());
  }

  return (
    <Box>
      <Typography variant="h2" sx={{ color: 'rgb(46, 115, 171)' }}>
        Test Plans
      </Typography>
      <Box
        sx={{
          marginTop: '0.625rem',
          position: 'relative',
          height: '4rem'
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '3.5%',
            fontWeight: '700',
            fontSize: '1.125rem'
          }}
        >
          Name
        </Typography>
        <TextField
          id="searchBar"
          label="Search by name..."
          type="text"
          value={searchBarData}
          onChange={(e) => setSearchBarData(e.target.value)}
          sx={{ position: 'absolute', left: '15%', height: '3.125rem' }}
          InputProps={{
            startAdornment: <SearchIcon />
          }}
        />
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box>
            {testPlans
              .filter(({ name }) => name.includes(searchBarData))
              .map(({ id, name }) => (
                <TestPlanItem key={id} id={id} name={name} />
              ))}
          </Box>

          {!isAddingTestPlan ? (
            <Button
              sx={{ marginTop: '1.25rem' }}
              onClick={() => setIsAddingTestPlan(true)}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Test Plan
            </Button>
          ) : (
            <Box
              sx={{ height: '4rem', marginTop: '0.625rem', position: 'relative' }}
              component="form"
              onSubmit={handleSubmit(addTestPlan)}
            >
              <Controller
                name="testPlanName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="testPlanName"
                    label="Test Plan Name"
                    type="text"
                    error={!!errors.testPlanName}
                    helperText={!!errors.testPlanName && 'Field cannot be empty!'}
                    {...field}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '3.125rem'
                    }}
                  />
                )}
              />
              <Button
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '22%',
                  transform: 'translateY(-50%)'
                }}
                variant="contained"
                type="submit"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
              <Button
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '31%',
                  transform: 'translateY(-50%)'
                }}
                onClick={() => {
                  setIsAddingTestPlan(false);
                  reset(
                    { testPlanName: '' },
                    {
                      keepIsValid: true
                    }
                  );
                }}
                variant="contained"
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TestPlansView;
