import React from 'react';

import BugTable, { types } from './BugTable';

export default {
  title: 'Bug Table',
  component: BugTable
};

const Template = (args) => <BugTable {...args} />;

export const ToReview = Template.bind({});
ToReview.args = { type: types.toReview };

export const ToFix = Template.bind({});
ToFix.args = { type: types.toFix };

export const MyBugs = Template.bind({});
MyBugs.args = { type: types.myBugs };
