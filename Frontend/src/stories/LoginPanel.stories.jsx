import React from 'react';

import LoginPanelComponent from '../components/LoginPanel/LoginPanel';

export default {
  title: 'Components',
  component: LoginPanelComponent
};

const Template = (args) => <LoginPanelComponent {...args} />;

export const LoginPanel = Template.bind({});
LoginPanel.args = {};
