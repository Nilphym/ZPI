import React from 'react';

import NavbarComponent from '../containers/Navbar';

export default {
  title: 'Containers',
  component: NavbarComponent
};

const Template = (args) => <NavbarComponent {...args} />;

export const Navbar = Template.bind({});
Navbar.args = {};
