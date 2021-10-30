import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const TestPlanItem = ({ testPlanName, version }) => {
  
 const navigate = useNavigate();
 const { pathname } = useLocation();

 const editTestPlanNavigate = () => {
   navigate(`${pathname}/test-e-${testId}`);
 };

 const viewTestPlanNavigate = () => {
   navigate(`${pathname}/test-${testId}`);
 };

  return (
    <Box>
      <Typography>{testPlanName}</Typography>
      <Typography>{version}</Typography>
      <Button>Edit</Button>
      <Button>View</Button>
    </Box>
  );
};

TestPlanItem.propTypes = {
  testPlanName: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
};


export default TestPlanItem;
