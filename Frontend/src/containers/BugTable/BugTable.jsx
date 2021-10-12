import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table';

export const types = {
  myBugs: 'my-bugs',
  toFix: 'to-fix',
  toReview: 'to-review'
};

// TODO: rows should be taken from redux
const BugTable = ({ type, rows }) => {
  const headCells = [
    {
      id: 'code',
      label: 'Code',
      isSortable: true,
      isVisible: true,
      width: 0,
      isHeading: true,
      isEditable: false
    },
    {
      id: 'name',
      label: 'Name',
      isSortable: true,
      isVisible: true,
      width: '20rem',
      isEditable: true
    },
    { id: 'state', label: 'State', isSortable: true, isVisible: true, width: 0, isEditable: true },
    {
      id: 'functionality',
      label: 'Functionality',
      isSortable: true,
      isVisible: true,
      isEditable: false
    },
    { id: 'type', label: 'Type', isSortable: true, isVisible: true, width: 0, isEditable: true },
    {
      id: 'impact',
      label: 'Impact',
      isSortable: true,
      isVisible: true,
      width: 0,
      isEditable: true
    },
    {
      id: 'priority',
      label: 'Priority',
      isSortable: true,
      isVisible: true,
      width: 0,
      isEditable: true
    },
    {
      id: 'execs',
      alignCenter: true,
      label: ['Execs', 'Req/Done/Failed'],
      isSortable: false,
      isVisible: type === types.toReview,
      width: '5rem',
      isEditable: false
    },
    {
      id: 'edit',
      alignCenter: true,
      label: 'Edit',
      isSortable: false,
      isVisible: true,
      isButton: true,
      icon: 'settings',
      isEditable: false
    },
    {
      id: 'reject',
      alignCenter: true,
      label: 'Reject',
      isSortable: false,
      isVisible: type === types.myBugs,
      isButton: true,
      icon: 'error',
      isEditable: false
    },
    {
      id: 'resolve',
      alignCenter: true,
      label: 'Resolve',
      isSortable: false,
      isVisible: type === types.myBugs,
      isButton: true,
      icon: 'done',
      isEditable: false
    },
    {
      id: 'take',
      alignCenter: true,
      label: 'Take',
      isSortable: false,
      isVisible: type === types.toFix,
      isButton: true,
      icon: 'add',
      isEditable: false
    },
    {
      id: 'retest',
      alignCenter: true,
      label: 'Retest',
      isSortable: false,
      isVisible: type === types.toReview,
      isButton: true,
      icon: 'repeat',
      isEditable: false
    }
  ];

  const rowCells = [
    { id: 'description', label: 'Description', isVisible: true, isEditable: true },
    { id: 'deadline', label: 'Deadline', isVisible: true, isEditable: true },
    { id: 'reportDate', label: 'Report date', isVisible: true, isEditable: true },
    { id: 'endDate', label: 'End date', isVisible: true, isEditable: true }
  ];

  return (
    <Table
      headCells={headCells.filter((headCell) => headCell.isVisible)}
      rowCells={rowCells.filter((rowCell) => rowCell.isVisible)}
      rowsPerPageOptions={[5, 10, 15]}
      rows={rows}
    />
  );
};

export default BugTable;

BugTable.propTypes = {
  type: PropTypes.oneOf(Object.values(types)).isRequired,
  rows: PropTypes.array.isRequired
};
