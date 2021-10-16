import React from 'react';

import TestComponent from '../components/Test/Test';

export default {
  title: 'Components',
  component: TestComponent
};

const Template = (args) => <TestComponent {...args} />;

export const Test = Template.bind({});
Test.args = {
  isEditable: true
};
