import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

const TestItem = ({ isEditable, testName, testId }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

  const editTestNavigate = () => {
     navigate(`${pathname}/test-e-${testId}`);
  };

  const viewTestNavigate = () => {
    navigate(`${pathname}/test-${testId}`);
  };

  return (
    <Box
      sx={{
        height: '3rem',
        width: '100%',
        backgroundColor: '#80d6ff',
        border: '0.0625rem solid #42a5f5',
        position: 'relative'
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '2.5%',
          transform: 'translateY(-50%)'
        }}
      >
        {testName}
      </Typography>
      <Button
        onClick={() => viewTestNavigate()}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '1.5%',
          transform: 'translateY(-50%)',
          border: '0.125rem solid #0077c2'
        }}s
        variant="contained"
      >
        View
      </Button>
      {isEditable && (
        <Button
          onClick={() => editTestNavigate()}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '9.5%',
            transform: 'translateY(-50%)',
            border: '0.125rem solid #0077c2'
          }}
          variant="contained"
        >
          Edit
        </Button>
      )}
    </Box>
  );
};

TestItem.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  testName: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired
};

export default TestItem;
