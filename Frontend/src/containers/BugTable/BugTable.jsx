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
    { id: 'id', label: '#', isSortable: true, isVisible: true },
    { id: 'name', label: 'Name', isSortable: true, isVisible: true },
    { id: 'date', label: 'Date', isSortable: true, isVisible: true },
    { id: 'description', label: 'Description', isSortable: true, isVisible: true },
    {
      id: 'execs',
      alignCenter: true,
      label: ['Execs', 'Req/Done/Failed'],
      isSortable: false,
      isVisible: type === types.toReview
    },
    { id: 'edit', alignCenter: true, label: 'Edit', isSortable: false, isVisible: true },
    {
      id: 'reject',
      alignCenter: true,
      label: 'Reject',
      isSortable: false,
      isVisible: type === types.myBugs
    },
    {
      id: 'resolve',
      alignCenter: true,
      label: 'Resolve',
      isSortable: false,
      isVisible: type === types.myBugs
    },
    {
      id: 'take',
      alignCenter: true,
      label: 'Take',
      isSortable: false,
      isVisible: type === types.toFix
    },
    {
      id: 'retest',
      alignCenter: true,
      label: 'Retest',
      isSortable: false,
      isVisible: type === types.toReview
    }
  ];

  const rowCells = [
    { id: 'id', width: 0, isHeading: true, isVisible: true },
    { id: 'name', width: '20rem', isVisible: true },
    { id: 'date', width: 0, isVisible: true },
    { id: 'description', isVisible: true },
    { id: 'execs', align: 'center', width: '9rem', isVisible: type === types.toReview },
    { id: 'edit', isButton: true, icon: 'settings', isVisible: true },
    { id: 'reject', isButton: true, icon: 'error', isVisible: type === types.myBugs },
    { id: 'resolve', isButton: true, icon: 'done', isVisible: type === types.myBugs },
    { id: 'take', isButton: true, icon: 'add', isVisible: type === types.toFix },
    { id: 'retest', isButton: true, icon: 'repeat', isVisible: type === types.toReview }
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
