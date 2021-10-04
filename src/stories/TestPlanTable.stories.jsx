import React from 'react';

import TestPlanTableComponent from '../components/TestPlanTable';

export default {
  title: 'Components',
  component: TestPlanTableComponent
};

const Template = (args) => <TestPlanTableComponent {...args} />;

const rows = [
  {
    name: 'New user sign-up',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' },
    ]
  },
  {
    name: 'Login',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' },
    ]
  },
  {
    name: 'Forgotten Password',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' },
    ]
  },
  {
    name: 'Help Menu',
    tests: [
      { name: 'normal process works OK' },
      { name: 'all fields blank rejected' },
      { name: 'email address already in use' },
    ]
  }
];

export const TestPlanTable = Template.bind({});
TestPlanTable.args = { rows };
