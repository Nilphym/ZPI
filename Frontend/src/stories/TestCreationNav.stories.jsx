import React from 'react';

import TestCreationNavComponent from '../components/Test/TestCreationNav';

export default {
  title: 'Components',
  component: TestCreationNavComponent
};

const Template = (args) => <TestCreationNavComponent {...args} />;

export const TestCreationNav= Template.bind({});
TestCreationNav.args = {};
