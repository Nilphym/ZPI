import React from 'react';

import TestProcedureComponent from '../components/TestProcedure/TestProcedure';

export default {
  title: 'Components',
  component: TestProcedureComponent
};

const Template = (args) => <TestProcedureComponent {...args} />;

export const TestProcedure = Template.bind({});
TestProcedure.args = {
  testPlanName: 'TestPlan1',
  testName: 'Test1',
  testProcedureName: 'TestProcedure1',
  isEditable: true
};
