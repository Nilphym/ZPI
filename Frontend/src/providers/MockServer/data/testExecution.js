/* eslint-disable no-console */
import { Model } from 'miragejs';

const models = {
  errorTest: Model
};

const routes = [
  (thisRef) =>
    thisRef.get('Errors/ErrorTest/:errorId', (schema, request) => {
      const { errorId } = request.params;
      return schema.errorTests.findBy({ testId: errorId }).attrs;
    })
];

const seeds = [
  (serverRef) =>
    serverRef.create('errorTest', {
      testId: '91563764-7B2B-4FE9-AB0E-B40D5E62E9D6',
      testName: 'Checking developer navigation',
      testCaseProconditions: 'You must be logged in as developer',
      testCaseEntryData: [
        'user name: Witcher3',
        {
          name: 'user data',
          data: [
            ['', 'x', 'y'],
            ['z', 'c', 'v'],
            ['b', 'n', 'm']
          ]
        },
        {
          name: 'another important data',
          data: [
            ['', 'x', 'y'],
            ['z', 'c', 'v'],
            ['b', 'n', 'm']
          ]
        }
      ],
      result: 'You can navigate through the page',
      steps: [
        {
          stepId: '6DA9B19C-1E8B-4E09-8CBE-02B9EE7DC9CB',
          name: 'Click on the navigation button',
          controlPoint: 'You will be redirected to the home page',
          testData: [],
          errorIds: ['91563764-7B2B-4FE9-AB0E-B40D5E62E9D6', '72AD77FC-B88D-4EC6-A757-A6A3864BAFFF']
        },
        {
          stepId: 'DC5B4C9E-F072-4DCB-8A94-C48D30548B84',
          name: 'Input the data',
          testData: [
            {
              name: 'Very important data',
              data: [
                ['', 'x', 'y'],
                ['z', 'c', 'v'],
                ['b', 'n', 'm']
              ]
            }
          ],
          errorIds: []
        }
      ]
    })
];

export default { models, routes, seeds };
