import React from 'react';

import EditableTableComponent from '../components/EditableTable/EditableTable';

export default {
  title: 'Components',
  component: EditableTableComponent
};

const Template = (args) => <EditableTableComponent {...args} />;

export const EditableTable = Template.bind({});
EditableTable.args = {
  name: 'Test-X',
  rowsNumber: 6,
  columnsNumber: 4,
  // control: {},
  disabled: false
};
