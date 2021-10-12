import React from 'react';

import TestCaseComponent from '../components/TestCase/TestCase';

export default {
  title: 'Components',
  component: TestCaseComponent
};

const Template = (args) => <TestCaseComponent {...args} />;

export const TestCase = Template.bind({});
TestCase.args = {
  testPlanName: 'TestPlan1',
  testName: 'Test1',
  testCaseName: 'TestCase1',
  isEditable: true
};
