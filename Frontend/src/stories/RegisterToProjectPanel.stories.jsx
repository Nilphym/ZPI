import React from 'react';

import RegisterToProjectPanelComponent from '../components/RegisterToProjectPanel/RegisterToProjectPanel';

export default {
  title: 'Components',
  component: RegisterToProjectPanelComponent
};

const Template = (args) => <RegisterToProjectPanelComponent {...args} />;

export const RegisterToProjectPanel = Template.bind({});
RegisterToProjectPanel.args = {};
