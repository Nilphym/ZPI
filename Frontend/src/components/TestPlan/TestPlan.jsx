import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postTest, setTestId } from '../../redux/reducers/test/testSlice';

const TestPlan = ({ isEditable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();


  async function addTest() {
    const newTestId = await dispatch(postTest());
    dispatch(setTestId(newTestId.payload));
    navigate(`${pathname}/test-${newTestId.payload}`);
  }

  return (
    <Box>
      <Typography variant="h2">Test Plan:</Typography>
      <Button onClick={() => addTest()}>Add a new Test</Button>
    </Box>
  );
};

TestPlan.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default TestPlan;
