import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import Table from '../../components/Table';
import {
  getRows,
  putRows,
  resolveBug,
  rejectBug,
  takeBug,
  resignFromBug
} from '../../redux/reducers/bugs/bugsSlice';

export const types = {
  myBugs: 'my-bugs',
  toFix: 'to-fix',
  toReview: 'to-review'
};

const BugTable = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, setValue, control } = useForm();
  const [dialog, setDialog] = useState({ open: false, content: null, action: null });
  const { id: personId } = useSelector((state) => state.auth.token);
  const { rows, loading } = useSelector((state) => state.bugs);

  useEffect(() => {
    dispatch(getRows());
  }, []);

  const closeDialog = () => {
    setDialog((dialog) => ({ ...dialog, open: false }));
  };

  const onRetest = (id) => {
    navigate(`/testing/${id}`);
  };

  const onResign = (id) => {
    setValue('id', id);
    setValue('personId', personId);
    setDialog({
      open: true,
      content: <DialogContentText>You will be unassigned from the bug.</DialogContentText>,
      action: resignFromBug
    });
  };

  const onReject = (id) => {
    setValue('id', id);
    setDialog({
      open: true,
      content: <DialogContentText>This bug will be marked as rejected.</DialogContentText>,
      action: rejectBug
    });
  };

  const onTake = (id) => {
    setValue('id', id);
    setValue('personId', personId);
    setDialog({
      open: true,
      content: <DialogContentText>You will be assigned to the bug.</DialogContentText>,
      action: takeBug
    });
  };

  const onResolve = (id) => {
    setValue('id', id);
    setDialog({
      open: true,
      content: (
        <>
          <DialogContentText>This bug will be marked as resolved.</DialogContentText>
          <Controller
            defaultValue={1}
            control={control}
            name="retestsRequired"
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="retestsRequired"
                label="* Number of required reviews"
                type="number"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </>
      ),
      action: resolveBug
    });
  };

  const headCells = [
    { id: 'code', label: 'Code', width: '6rem', isHeading: true },
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'state', label: 'State', width: 0 },
    { id: 'functionality', label: 'Functionality', width: '15rem' },
    {
      id: 'type',
      label: 'Type',
      width: 0,
      type: 'select',
      values: ['Functional', 'Logical', 'Wrong datatype']
    },
    {
      id: 'impact',
      label: 'Impact',
      width: 0,
      type: 'select',
      values: ['High', 'Medium', 'Low']
    },
    {
      id: 'priority',
      label: 'Priority',
      width: 0,
      type: 'select',
      values: ['High', 'Medium', 'Low']
    },
    {
      id: 'retests',
      alignCenter: true,
      label: 'Retests',
      sublabel: 'Req/Done/Failed',
      unsortable: true,
      hidden: type !== types.toReview,
      width: '5.5rem'
    },
    {
      id: 'resign',
      label: 'Resign',
      hidden: type !== types.myBugs,
      button: 'cancel',
      onClick: onResign
    },
    {
      id: 'reject',
      label: 'Reject',
      hidden: type !== types.myBugs,
      button: 'clear',
      onClick: onReject
    },
    {
      id: 'resolve',
      label: 'Resolve',
      hidden: type !== types.myBugs,
      button: 'done',
      onClick: onResolve
    },
    {
      id: 'take',
      label: 'Take',
      hidden: type !== types.toFix,
      button: 'add',
      onClick: onTake
    },
    {
      id: 'retest',
      label: 'Retest',
      hidden: type !== types.toReview,
      button: 'repeat',
      onClick: onRetest
    }
  ];

  const rowCells = [
    { id: 'deadline', label: 'Deadline', type: 'date' },
    { id: 'reportDate', label: 'Report date', type: 'date' },
    { id: 'endDate', label: 'End date', type: 'date' },
    { id: 'description', label: 'Description', type: 'textLarge' },
    { id: 'attachments', label: 'Attachments', type: 'text' }
  ];

  const onSubmitBugStatus = async (arg) => {
    closeDialog();
    await dispatch(dialog.action(arg));
    await dispatch(getRows());
  };

  const onSubmitBugDetails = async (json) => {
    await dispatch(putRows({ id: json.id, json }));
    await dispatch(getRows());
  };

  return loading ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Table
        headCells={headCells.filter((headCell) => !headCell.hidden)}
        rowCells={rowCells}
        rowsPerPageOptions={[5, 10, 15]}
        rows={[...rows]}
        onSubmit={onSubmitBugDetails}
      />
      <Dialog open={dialog.open} onClose={closeDialog}>
        <form onSubmit={handleSubmit(onSubmitBugStatus)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>{dialog.content}</DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default BugTable;

BugTable.propTypes = {
  type: PropTypes.oneOf(Object.values(types)).isRequired
};
