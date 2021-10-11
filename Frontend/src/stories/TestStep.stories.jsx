import React from 'react';

import TestStepComponent from '../components/TestStep/TestStep';

export default {
  title: 'Components',
  component: TestStepComponent
};

const Template = (args) => <TestStepComponent {...args} />;

export const TestStep = Template.bind({});
TestStep.args = {
  testName: 'Test1',
  testProcedureName: 'Procedure1',
  testStepName: 'TestStep1'
};
