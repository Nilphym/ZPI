import React from 'react';

import TestPlanTable from './TestPlanTable';

export default {
  title: 'Test Plan Table',
  component: TestPlanTable
};

const Template = (args) => <TestPlanTable {...args} />;

const rows = [
  {
    name: 'New user sign-up',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' }
    ]
  },
  {
    name: 'Login',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' }
    ]
  },
  {
    name: 'Forgotten Password',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' }
    ]
  },
  {
    name: 'Help Menu',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' }
    ]
  }
];

export const Default = Template.bind({});
Default.args = { rows };
