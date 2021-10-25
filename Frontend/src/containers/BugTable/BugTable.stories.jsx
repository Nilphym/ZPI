import React from 'react';

import BugTable, { bugTableTypes } from './BugTable';

export default {
  title: 'Nilphym/Bug Table',
  component: BugTable
};

const Template = (args) => <BugTable {...args} />;

export const ToReview = Template.bind({});
ToReview.args = { type: bugTableTypes.toReview };

export const ToFix = Template.bind({});
ToFix.args = { type: bugTableTypes.toFix };

export const MyBugs = Template.bind({});
MyBugs.args = { type: bugTableTypes.myBugs };
