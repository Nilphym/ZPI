import React, { useEffect, useState, useMemo } from 'react';
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
  TextField,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import Table from '../../components/Table';
import { SelectColumnFilter } from '../../components/Table/CustomFilter';
import {
  getRows,
  putRows,
  resolveBug,
  rejectBug,
  takeBug,
  resignFromBug,
  getPossibleValues
} from '../../redux/reducers/bugs/bugsSlice';

export const tableTypes = {
  all: 'all',
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
  const { types, impacts, priorities } = useSelector((state) => state.bugs.possibleValues);

  useEffect(() => {
    dispatch(getRows());
    dispatch(getPossibleValues());
  }, []);

  const prepareRows = (rows) =>
    rows.map((row) => ({
      ...row,
      subRows: [
        {
          id: row.id,
          fields: [
            { id: 'name', label: 'Name', type: 'text', value: row.name },
            { id: 'type', label: 'Type', type: 'select', value: row.type, possibleValues: types },
            {
              id: 'impact',
              label: 'Impact',
              type: 'select',
              value: row.impact,
              possibleValues: impacts
            },
            {
              id: 'priority',
              label: 'Priority',
              type: 'select',
              value: row.priority,
              possibleValues: priorities
            },
            { id: 'deadline', label: 'Deadline', type: 'date', value: row.deadline },
            {
              id: 'reportDate',
              label: 'Report date',
              type: 'disabled',
              value: row.reportDate
            },
            { id: 'endDate', label: 'End date', type: 'disabled', value: row.endDate },
            { id: 'description', label: 'Description', type: 'textLarge', value: row.description }
            // { id: 'attachments', label: 'Attachments', Component: null } // TODO handle attachments by custom component
          ]
        }
      ]
    }));

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

  const columns = useMemo(
    () => [
      {
        id: 'expander',
        disableFilters: true,
        // eslint-disable-next-line react/prop-types
        Cell: ({ row: { isExpanded, getToggleRowExpandedProps } }) => (
          <IconButton {...getToggleRowExpandedProps()} size="small">
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        )
      },
      {
        Header: 'Code',
        accessor: 'code'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'State',
        accessor: 'state',
        Filter: SelectColumnFilter
      },
      {
        Header: 'Functionality',
        accessor: 'functionality'
      },
      {
        Header: 'Type',
        accessor: 'type',
        Filter: SelectColumnFilter
      },
      {
        Header: 'Impact',
        accessor: 'impact',
        Filter: SelectColumnFilter
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        Filter: SelectColumnFilter
      },
      {
        Header: 'Retests',
        accessor: 'retests'
      },
      {
        Header: 'Resign',
        accessor: 'resign',
        disableFilters: true
      },
      {
        Header: 'Reject',
        accessor: 'reject',
        disableFilters: true
      },
      {
        Header: 'Resolve',
        accessor: 'resolve',
        disableFilters: true
      },
      {
        Header: 'Take',
        accessor: 'take',
        disableFilters: true
      },
      {
        Header: 'Retest',
        accessor: 'retest',
        disableFilters: true
      }
    ],
    []
  );

  const headCells = [
    {
      id: 'retests',
      label: 'Retests',
      sublabel: 'Req/Done/Failed',
      hidden: type !== tableTypes.toReview && type !== tableTypes.all
    },
    {
      id: 'resign',
      label: 'Resign',
      hidden: type !== tableTypes.myBugs,
      button: 'cancel',
      onClick: onResign
    },
    {
      id: 'reject',
      label: 'Reject',
      hidden: type !== tableTypes.myBugs,
      button: 'clear',
      onClick: onReject
    },
    {
      id: 'resolve',
      label: 'Resolve',
      hidden: type !== tableTypes.myBugs,
      button: 'done',
      onClick: onResolve
    },
    {
      id: 'take',
      label: 'Take',
      hidden: type !== tableTypes.toFix,
      button: 'add',
      onClick: onTake
    },
    {
      id: 'retest',
      label: 'Retest',
      hidden: type !== tableTypes.toReview,
      button: 'repeat',
      onClick: onRetest
    }
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
      <Table title="Bugs" initialPageSize={5} data={prepareRows(rows)} columns={columns} />
      {/* <Table
        headCells={headCells.filter((headCell) => !headCell.hidden)}
        rowCells={rowCells}
        rowsPerPageOptions={[5, 10, 15]}
        rows={[...rows]}
        onSubmit={onSubmitBugDetails}
      /> */}
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
  type: PropTypes.oneOf(Object.values(tableTypes)).isRequired
};
