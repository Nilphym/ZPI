import React from 'react';

import EditableTableComponent from '../components/EditableTable/EditableTable';

export default {
  title: 'Components',
  component: EditableTableComponent
};

const Template = (args) => <EditableTableComponent {...args} />;

export const EditableTable = Template.bind({});
EditableTable.args = {
  data: {
    tableName: 'Table 1',
    RowName1: '',
    Data1: ['c', '1', '2', 'b', '3', 'c'],
    RowName2: 'Ble ble',
    Data2: ['x', 'y', 'z', 't', 'r', 'w'],
    RowName3: 'Tse Tse',
    Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
  },
  parentComp: 'testStep',
  deleteTable: () => { },
  testStepId: 'Ts1',
  disabled: false
};
