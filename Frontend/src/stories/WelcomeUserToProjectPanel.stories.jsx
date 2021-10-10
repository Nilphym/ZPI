import React from 'react';

import WelcomeUserToProjectPanelComponent from '../components/RegisterToProjectPanel/WelcomeUserToProjectPanel';

export default {
  title: 'Components',
  component: WelcomeUserToProjectPanelComponent
};

const Template = (args) => <WelcomeUserToProjectPanelComponent {...args} />;

export const WelcomeUserToProjectPanel = Template.bind({});
WelcomeUserToProjectPanel.args = {
  user: {
    login: 'Genowefa.123@Project-X.pl',
    name: 'Genowefa'
  },
  projectName: 'Project-X'
};
