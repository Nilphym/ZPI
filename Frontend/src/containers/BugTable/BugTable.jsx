import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const { rows, loading } = useSelector((state) => state.bugs);
  const { id: personId } = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getRows());
  }, []);

  const onRetest = (id) => {
    navigate(`/testing/${id}`);
  };

  const onTake = async (id) => {
    await dispatch(takeBug({ id, personId }));
    await dispatch(getRows());
  };

  const onResign = async (id) => {
    await dispatch(resignFromBug({ id, personId }));
    await dispatch(getRows());
  };

  const onReject = async (id) => {
    await dispatch(rejectBug({ id }));
    await dispatch(getRows());
  };

  const onResolve = async (id) => {
    await dispatch(resolveBug({ id }));
    await dispatch(getRows());
  };

  const headCells = [
    { id: 'code', label: 'Code', width: 0, isHeading: true },
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

  const onSubmit = async (json) => {
    await dispatch(putRows({ code: json.code, json }));
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
    <Table
      headCells={headCells.filter((headCell) => !headCell.hidden)}
      rowCells={rowCells}
      rowsPerPageOptions={[5, 10, 15]}
      rows={[...rows]}
      onSubmit={onSubmit}
    />
  );
};

export default BugTable;

BugTable.propTypes = {
  type: PropTypes.oneOf(Object.values(types)).isRequired
};
