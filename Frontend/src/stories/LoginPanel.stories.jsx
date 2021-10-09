import React from 'react';

import LoginPanelComponent from '../components/LoginPanel/LoginPanel';

export default {
  title: 'Components',
  component: LoginPanelComponent
};

const Template = (args) => <LoginPanelComponent {...args} />;

export const LoginPanel = Template.bind({});
LoginPanel.args = {
  // links: [
  //   { icon: 'home', text: 'Home', destination: 'home' },
  //   { icon: 'home', text: 'Projects', destination: 'projects' },
  //   { icon: 'home', text: 'Bilings', destination: 'bilings' },
  //   { icon: 'home', text: 'Team', destination: 'team' },
  //   { icon: 'home', text: 'Settings', destination: 'settings' }
  // ],
  // profile: { name: 'John Snow' }
};
