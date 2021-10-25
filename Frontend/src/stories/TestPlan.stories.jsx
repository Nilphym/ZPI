import React from 'react';

import TestPlanComponent from '../components/TestPlan/TestPlan';

export default {
  title: 'Components',
  component: TestPlanComponent
};

const Template = (args) => <TestPlanComponent {...args} />;

export const TestPlan = Template.bind({});
TestPlan.args = {
  isEditable: true
};
