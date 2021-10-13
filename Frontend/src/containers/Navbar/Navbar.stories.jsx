import React from 'react';

import Navbar from './Navbar';

export default {
  title: 'Navbar',
  component: Navbar
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    { icon: 'home', text: 'Home', destination: 'home' },
    { icon: 'home', text: 'Projects', destination: 'projects' },
    { icon: 'home', text: 'Bilings', destination: 'bilings' },
    { icon: 'home', text: 'Team', destination: 'team' },
    { icon: 'home', text: 'Settings', destination: 'settings' }
  ],
  profile: { name: 'John Snow' }
};
