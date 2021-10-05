import React from 'react';

import BugTableComponent, { types } from '../containers/BugTable';

export default {
  title: 'Components',
  component: BugTableComponent
};

const Template = (args) => <BugTableComponent {...args} />;


function createData(id, name, date, description, execs) {
  return { id, name, date, description, execs };
}

const rows = [
  createData(1, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(2, 'abc', '2021-09-01', 'Lorem ipsum dolor sit amet.', '1 / 1 / 1'),
  createData(3, 'abc', '2021-09-01', 'Lorem ipsum dolor sit amet consectetur adipisicing.', '2 / 0 / 0'),
  createData(4, 'abc', '2021-09-01', 'Lorem, ipsum dolor.', '2 / 1 / 0'),
  createData(5, 'abc', '2021-09-01', 'it\'s not working', '1 / 1 / 0'),
  createData(6, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(7, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(8, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(9, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(10, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(11, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(12, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0'),
  createData(13, 'abc', '2021-09-01', 'it\'s not working', '3 / 1 / 0')
];

export const BugsToReviewTable = Template.bind({});
BugsToReviewTable.args = {
  type: types.toReview,
  rows
};

export const BugsToFixTable = Template.bind({});
BugsToFixTable.args = {
  type: types.toFix,
  rows
};

export const MyBugsTable = Template.bind({});
MyBugsTable.args = {
  type: types.myBugs,
  rows
};
