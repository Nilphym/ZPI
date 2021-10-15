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
    { id: 'code', label: 'Code', width: 0, isHeading: true },
    { id: 'name', label: 'Name', type: 'text' },
    {
      id: 'state',
      label: 'State',
      width: 0,
      type: 'select',
      values: ['New', 'In testing', 'Fixed', 'For retest']
    },
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
      id: 'execs',
      alignCenter: true,
      label: 'Execs',
      sublabel: 'Req/Done/Failed',
      unsortable: true,
      hidden: type !== types.toReview,
      width: '5.5rem'
    },
    { id: 'reject', label: 'Reject', hidden: type !== types.myBugs, button: 'error' },
    { id: 'resolve', label: 'Resolve', hidden: type !== types.myBugs, button: 'done' },
    { id: 'take', label: 'Take', hidden: type !== types.toFix, button: 'add' },
    { id: 'retest', label: 'Retest', hidden: type !== types.toReview, button: 'repeat' }
  ];

  const rowCells = [
    { id: 'deadline', label: 'Deadline', type: 'date' },
    { id: 'reportDate', label: 'Report date', type: 'date' },
    { id: 'endDate', label: 'End date', type: 'date' },
    { id: 'description', label: 'Description', type: 'textLarge' },
    { id: 'attachments', label: 'Attachments', type: 'text' }
  ];

  return (
    <Table
      headCells={headCells.filter((headCell) => !headCell.hidden)}
      rowCells={rowCells}
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
