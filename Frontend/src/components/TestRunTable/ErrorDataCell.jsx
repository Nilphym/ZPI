import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import { getBug, evaluateBug } from '../../redux/store';

const Bold = styled('span')({
  fontWeight: 'bold'
});

const BugDetailsModal = ({ handleClose, open }) => {
  const { id, name, description, functionality, type } = useSelector(
    (state) => state.bugs.bugDetails
  );
  const dispatch = useDispatch();

  const handleEvaluate = (result) => {
    dispatch(evaluateBug({ errorId: id, result }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error details</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography>
            <Bold>Name: </Bold>
            {name}
          </Typography>
          <Typography>
            <Bold>Description: </Bold>
            {description}
          </Typography>
          <Typography>
            <Bold>Functionality: </Bold>
            {functionality}
          </Typography>
          <Typography>
            <Bold>Type: </Bold>
            {type}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <Button onClick={handleClose}>Close</Button>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button variant="contained" color="error" onClick={() => handleEvaluate(false)}>
            Mark as unfixed
          </Button>
          <Button variant="contained" onClick={() => handleEvaluate(true)}>
            Mark as fixed
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

BugDetailsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

BugDetailsModal.defaultProps = {
  open: false
};

export const ErrorDataCell = ({ errors }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleErrorShow = async (id) => {
    await dispatch(getBug({ errorId: id }));
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {errors?.map((error) => (
          <Button
            onClick={() => handleErrorShow(error.id)}
            key={error.id}
            color="error"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {error.code}
          </Button>
        ))}
      </Box>
      <BugDetailsModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

ErrorDataCell.propTypes = {
  errors: PropTypes.array
};

ErrorDataCell.defaultProps = {
  errors: []
};

export default ErrorDataCell;
