import React from 'react';

import NavbarComponent from '../containers/Navbar';

export default {
  title: 'Containers',
  component: NavbarComponent
};

const Template = (args) => <NavbarComponent {...args} />;

export const Navbar = Template.bind({});
Navbar.args = {
  links: [
    { icon: 'home', text: 'Home', destination: 'home' },
    { icon: 'home', text: 'Projects', destination: 'projects' },
    { icon: 'home', text: 'Bilings', destination: 'bilings' },
    { icon: 'home', text: 'Team', destination: 'team' },
    { icon: 'home', text: 'Settings', destination: 'settings' }
  ]
};
