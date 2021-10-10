import React from 'react';

import InviteUserToProjectPanelComponent from '../components/RegisterToProjectPanel/InviteUserToProjectPanel';

export default {
  title: 'Components',
  component: InviteUserToProjectPanelComponent
};

const Template = (args) => <InviteUserToProjectPanelComponent {...args} />;

export const InviteUserToProjectPanel = Template.bind({});
InviteUserToProjectPanel.args = {};
