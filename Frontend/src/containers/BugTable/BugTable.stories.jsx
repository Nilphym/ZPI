import React from 'react';

import BugTable, { tableTypes } from './BugTable';

export default {
  title: 'Nilphym/Bug Table',
  component: BugTable
};

const Template = (args) => <BugTable {...args} />;

export const ToReview = Template.bind({});
ToReview.args = { type: tableTypes.toReview };

export const ToFix = Template.bind({});
ToFix.args = { type: tableTypes.toFix };

export const MyBugs = Template.bind({});
MyBugs.args = { type: tableTypes.myBugs };
