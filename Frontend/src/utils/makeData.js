/* eslint-disable */
import namor from 'namor';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single'
  };
};

export default function makeData(len) {
  const makeDataLevel = () => {
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: [
          {
            id: Math.floor(Math.random() * 1000),
            fields: [
              { id: 'name', label: 'Name', type: 'text', value: 'Herald' },
              {
                id: 'status',
                label: 'Status',
                type: 'select',
                value: 'Medium',
                possibleValues: ['Hard', 'Medium', 'Easy']
              }
            ]
          }
        ]
      };
    });
  };

  return makeDataLevel();
}
