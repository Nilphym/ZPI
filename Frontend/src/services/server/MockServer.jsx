/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { createServer, Model } from 'miragejs';

// DOCS: https://miragejs.com/tutorial/part-1/
const makeServer = () =>
  createServer({
    models: {
      bug: Model,
      testStep: Model,
      testProcedure: Model,
      testCase: Model,
      test: Model
    },
    routes() {
      this.namespace = 'api/';

      this.post('signin', () => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6MSwicm9sZSI6ImRldiJ9.l3t9QmgNcBbwSiCK2i6aV7w1Wu51vDmVJuQe9d6DDPA';
      });

      this.get('test/:id', (schema, request) => {
        const { id } = request.params;
        const findingItem = schema.tests.findBy({ id }).attrs;
        return findingItem;
      });

      this.put('test/:id', (schema, request) => {
        const { id } = request.params;
        const { name, selectedTestSuiteId, selectedTestProcedureId, selectedTestCaseId } =
          JSON.parse(request.requestBody);
        schema.tests
          .findBy({ id })
          .update({ name, selectedTestSuiteId, selectedTestProcedureId, selectedTestCaseId });
      });

      this.post('test', (schema => { // , request)
        const newTestId = Math.floor(Math.random() * 10000);
        // const { testPlanId } = JSON.parse(request.requestBody);

        // schema.testPlans.findBy({ id: testPlanId }).update({
        //   testsIds: [
        //     ...testsIds,
        //      newTestId
        //   ]
        // });
        schema.tests.create({
          id: newTestId,
          name: '',
          creationDate: new Date().toISOString().split('T')[0],
          version: 'v.0.0',
          executionCounter: 0,
          testSuites: [],
          selectedTestSuiteId: {},
          testCasesCodes: [],
          testProceduresCode: [],
          selectedTestCaseId: {},
          selectedTestProcedureId: {}
        });
        return newTestId;
      }));

      // TestProcedure requests
      this.get('testProcedure/:id', (schema, request) => {
        const { id } = request.params;
        const findingItem = schema.testProcedures.findBy({ id }).attrs;
        return findingItem;
      });

      this.put('testProcedure/:id', (schema, request) => {
        const { id } = request.params;
        const { result } = JSON.parse(request.requestBody);
        schema.testProcedures.findBy({ id }).update({ result });
      });

      this.post('testProcedure', (schema, request) => {
        const newProcedureId = Math.floor(Math.random() * 10000);
        const { testId } = JSON.parse(request.requestBody);
        const { testProceduresCodes } = schema.tests.findBy({ id: testId }).attrs;
        schema.tests.findBy({ id: testId }).update({
          testProceduresCodes: [
            ...testProceduresCodes,
            { testProcedureId: newProcedureId, testProcedureCode: `TP#${newProcedureId}` }
          ]
        });
        schema.testProcedures.create({
          id: newProcedureId,
          testStepsIds: [],
          result: ''
        });
      });

      // TestCase requests
      this.get('testCase/:id', (schema, request) => {
        const { id } = request.params;
        const findingItem = schema.testCases.findBy({ id }).attrs;
        return findingItem;
      });

      this.put('testCase/:id', (schema, request) => {
        const { id } = request.params;
        const { preconditions, entryDataObject } = JSON.parse(request.requestBody);
        schema.testCases.findBy({ id }).update({
          preconditions,
          entryDataObject
        });
        console.log(schema.testCases.findBy({ id }).attrs);
      });

      this.post('testCase', (schema, request) => {
        const newCaseId = Math.floor(Math.random() * 10000);
        const { testId } = JSON.parse(request.requestBody);
        const { testCasesCodes } = schema.tests.findBy({ id: testId }).attrs;
        console.log(testCasesCodes);
        schema.tests.findBy({ id: testId }).update({
          testCasesCodes: [
            ...testCasesCodes,
            { testCaseId: newCaseId, testCaseCode: `TC#${newCaseId}` }
          ]
        });
        schema.testCases.create({
          id: newCaseId,
          preconditions: '',
          entryDataObject: {}
        });
      });

      // TestStep requests
      this.get('step/:id', (schema, request) => {
        const { id } = request.params;
        const findingItem = schema.testSteps.findBy({ id }).attrs;
        return findingItem;
      });

      this.put('step/:id', (schema, request) => {
        const { id } = request.params;
        const { name, testDataObject, controlPoint } = JSON.parse(request.requestBody);
        schema.testSteps.findBy({ id }).update({
          name,
          testDataObject,
          controlPoint
        });
      });

      this.post('step', (schema, request) => {
        const { name, testProcedureId: id } = JSON.parse(request.requestBody);
        const newStepId = Math.floor(Math.random() * 10000);
        const { testStepsIds } = schema.testProcedures.findBy({ id }).attrs;
        schema.testProcedures.findBy({ id }).update({
          testStepsIds: [...testStepsIds, newStepId]
        });
        schema.testSteps.create({
          id: newStepId,
          name,
          stepNumber: 5,
          testDataObject: {},
          controlPoint: ''
        });
      });

      // Bugs
      this.get('bugs', (schema) => {
        return schema.bugs.all().models;
      });

      this.put('bugs/take/:id', (_, request) => {
        const { id } = request.params;
        const personId = JSON.parse(request.requestBody);
        console.log(personId, id);
      });

      this.put('bugs/resign/:id', (_, request) => {
        const { id } = request.params;
        const personId = JSON.parse(request.requestBody);
        console.log(personId, id);
      });

      this.put('bugs/reject/:id', (schema, request) => {
        const { id } = request.params;
        schema.bugs.findBy({ id }).update('state', 'Rejected');
      });

      this.put('bugs/resolve/:id', (schema, request) => {
        const { id } = request.params;
        const requiredRetests = JSON.parse(request.requestBody);
        console.log(requiredRetests, id);
        schema.bugs.findBy({ id }).update('state', 'Resolved');
      });

      this.put('bugs/:id', (schema, request) => {
        const { id } = request.params;
        const json = JSON.parse(request.requestBody);

        schema.bugs.findBy({ id }).update(json);
      });
    },
    seeds(server) {
      [
        {
          id: 1,
          code: 'E-12323',
          name: 'Not responding',
          state: 'New',
          functionality: 'Login',
          type: 'Functional',
          impact: 'High',
          priority: 'Low',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/20/2022',
          endDate: '12/05/2022'
        },
        {
          id: 2,
          code: 'E-45432',
          name: 'Table not visible',
          state: 'New',
          functionality: 'Register',
          type: 'Functional',
          impact: 'Low',
          priority: 'Medium',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 3,
          code: 'E-95783',
          name: 'Internet down',
          state: 'In testing',
          functionality: 'Add product',
          type: 'Logical',
          impact: 'Medium',
          priority: 'Low',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 4,
          code: 'E-769478',
          name: 'Christmas early this year',
          state: 'Fixed',
          functionality: 'Login',
          type: 'Logical',
          impact: 'Low',
          priority: 'Medium',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 5,
          code: 'E-654865',
          name: 'Big bang',
          state: 'For retest',
          functionality: 'Login',
          type: 'Wrong datatype',
          impact: 'Medium',
          priority: 'High',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 6,
          code: 'E-234504',
          name: 'Rain is raining',
          state: 'Resolved',
          functionality: 'Login',
          type: 'Wrong datatype',
          impact: 'High',
          priority: 'High',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 7,
          code: 'E-090123',
          name: 'Goblins attack',
          state: 'Rejected',
          functionality: 'Login',
          type: 'Code duplication',
          impact: 'Low',
          priority: 'Low',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 8,
          code: 'E-325980',
          name: 'Lorem ipsum dolor',
          state: 'Resolved',
          functionality: 'Login',
          type: 'Logical',
          impact: 'Medium',
          priority: 'Medium',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 9,
          code: 'E-123423',
          name: 'Lorem ipsum dolor',
          state: 'Resolved',
          functionality: 'Login',
          type: 'Logical',
          impact: 'High',
          priority: 'High',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 10,
          code: 'E-112223',
          name: 'Lorem ipsum dolor',
          state: 'Fixed',
          functionality: 'Login',
          type: 'Code duplication',
          impact: 'Medium',
          priority: 'Low',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 11,
          code: 'E-123432',
          name: 'Lorem ipsum dolor',
          state: 'Fixed',
          functionality: 'Login',
          type: 'Code duplication',
          impact: 'Low',
          priority: 'Low',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 12,
          code: 'E-123290',
          name: 'Lorem ipsum dolor',
          state: 'New',
          functionality: 'Login',
          type: 'Wrong datatype',
          impact: 'Low',
          priority: 'Medium',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        },
        {
          id: 13,
          code: 'E-123003',
          name: 'Lorem ipsum dolor',
          state: 'In testing',
          functionality: 'Login',
          type: 'Security',
          impact: 'High',
          priority: 'Low',
          retests: '1/1/1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
          deadline: '12/15/2022',
          reportDate: '12/15/2022',
          endDate: '12/15/2022'
        }
      ].forEach((bug) => {
        server.create('bug', bug);
      });
      [
        {
          id: 'ts1',
          name: 'Login TS1',
          stepNumber: 0,
          testDataObject: {
            Data0: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data1: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: {
              tableName: 'Table 3',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          },
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts2',
          name: 'Register TS2',
          stepNumber: 3,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts3',
          name: 'API TS3',
          stepNumber: 10,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts4',
          name: 'Check username TS4',
          stepNumber: 20,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 3',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            },
            {
              tableName: 'Table 4',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts5',
          name: 'Login TS5',
          stepNumber: 0,
          testDataObject: {
            Data0: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data1: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: {
              tableName: 'Table 3',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          },
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts6',
          name: 'Register TS6',
          stepNumber: 3,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts7',
          name: 'API TS7',
          stepNumber: 10,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts8',
          name: 'Check username TS8',
          stepNumber: 20,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 3',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            },
            {
              tableName: 'Table 4',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts9',
          name: 'Login TS9',
          stepNumber: 0,
          testDataObject: {
            Data0: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data1: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: {
              tableName: 'Table 3',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          },
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts10',
          name: 'Register TS10',
          stepNumber: 3,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts11',
          name: 'API TS11',
          stepNumber: 10,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'ts12',
          name: 'Check username TS12',
          stepNumber: 20,
          testDataObject: [
            {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            {
              tableName: 'Table 3',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            },
            {
              tableName: 'Table 4',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
              RowName3: 'Ble ble',
              Data3: ['x', 'y', 'z', 't', 'r', 'w']
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        }
      ].forEach((testStep) => {
        server.create('testStep', testStep);
      });
      [
        {
          id: 'tp1',
          testStepsIds: ['ts1', 'ts2'],
          result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'tp2',
          testStepsIds: ['ts3', 'ts4', 'ts5', 'ts6'],
          result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'tp3',
          testStepsIds: ['ts7'],
          result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        },
        {
          id: 'tp4',
          testStepsIds: ['ts8', 'ts9', 'ts10'],
          result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        }
      ].forEach((testProcedure) => {
        server.create('testProcedure', testProcedure);
      });
      [
        {
          id: 'tc1',
          preconditions: `gggggggggggggggggggggLorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium `,
          entryDataObject: {
            Data0: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data1: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          }
        },
        {
          id: 'tc2',
          preconditions:
            'cccccccccccccccccc, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium ',
          entryDataObject: {
            Data0: 'bbbbbbbbbbbbbbbbbbbbc',
            Data1: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['a', '2', '4', '6', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            }
          }
        },
        {
          id: 'tc3',
          preconditions: 'Ala ma kota',
          entryDataObject: {
            Data0: 'aaaaaaaaaaa',
            Data1: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            }
          }
        },
        {
          id: 'tc4',
          preconditions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium `,
          entryDataObject: {
            Data0: `laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisc`,
            Data1: {
              tableName: 'Table 1',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Ble ble',
              Data2: ['x', 'y', 'z', 't', 'r', 'w'],
              RowName3: 'Tse Tse',
              Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
            },
            Data2: {
              tableName: 'Table 2',
              RowName1: '',
              Data1: ['c', '1', '2', 'b', '3', 'c'],
              RowName2: 'Tse Tse',
              Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
            }
          }
        }
      ].forEach((testCase) => {
        server.create('testCase', testCase);
      });
      [
        {
          id: 't1',
          name: 'Test the best',
          creationDate: '21.10.2021',
          version: 'v.0.1',
          executionCounter: 0,
          testSuites: [
            { testSuiteId: 1, testSuite: 'login' },
            { testSuiteId: 2, testSuite: 'register' },
            { testSuiteId: 3, testSuite: 'API' }
          ],
          selectedTestSuiteId: { testSuiteId: 2, testSuite: 'register' },
          testCasesCodes: [
            { testCaseId: 'tc1', testCaseCode: 'TC#132' },
            { testCaseId: 'tc2', testCaseCode: 'TC#456' },
            { testCaseId: 'tc3', testCaseCode: 'TC#789' }
          ],
          testProceduresCodes: [
            { testProcedureId: 'tp1', testProcedureCode: 'TP#132' },
            { testProcedureId: 'tp2', testProcedureCode: 'TP#456' },
            { testProcedureId: 'tp3', testProcedureCode: 'TP#789' },
            { testProcedureId: 'tp4', testProcedureCode: 'TP#1-123' }
          ],
          selectedTestCaseId: { testCaseId: 'tc2', testCaseCode: 'TC#456' },
          selectedTestProcedureId: { testProcedureId: 'tp3', testProcedureCode: 'TP#789' }
        },
        {
          id: 't2',
          name: 'Test 2',
          creationDate: '23.10.2021',
          version: 'v.1.1',
          executionCounter: 0,
          testSuites: [
            { testSuiteId: 1, testSuite: 'login' },
            { testSuiteId: 2, testSuite: 'register' }
          ],
          selectedTestSuiteId: { testSuiteId: 2, testSuite: 'register' },
          testCasesCodes: [
            { testCaseId: 'tc1', testCaseCode: 'TC#132' },
            { testCaseId: 'tc2', testCaseCode: 'TC#456' },
            { testCaseId: 'tc3', testCaseCode: 'TC#789' }
          ],
          testProceduresCodes: [
            { testProcedureId: 'tp1', testProcedureCode: 'TP#132' },
            { testProcedureId: 'tp2', testProcedureCode: 'TP#456' },
            { testProcedureId: 'tp3', testProcedureCode: 'TP#789' },
            { testProcedureId: 'tp4', testProcedureCode: 'TP#1-123' }
          ],
          selectedTestCaseId: { testCaseId: 'tc2', testCaseCode: 'TC#456' },
          selectedTestProcedureId: { testProcedureId: 'tp3', testProcedureCode: 'TP#789' }
        },
        {
          id: 't3',
          name: 'Test the best',
          creationDate: '21.10.2021',
          version: 'v.0.1',
          executionCounter: 0,
          testSuites: [
            { testSuiteId: 1, testSuite: 'login' },
            { testSuiteId: 2, testSuite: 'register' },
            { testSuiteId: 3, testSuite: 'API' }
          ],
          selectedTestSuiteId: { testSuiteId: 2, testSuite: 'register' },
          testCasesCodes: [
            { testCaseId: 'tc1', testCaseCode: 'TC#132' },
            { testCaseId: 'tc2', testCaseCode: 'TC#456' },
            { testCaseId: 'tc3', testCaseCode: 'TC#789' }
          ],
          testProceduresCodes: [
            { testProcedureId: 'tp1', testProcedureCode: 'TP#132' },
            { testProcedureId: 'tp2', testProcedureCode: 'TP#456' },
            { testProcedureId: 'tp3', testProcedureCode: 'TP#789' },
            { testProcedureId: 'tp4', testProcedureCode: 'TP#1-123' }
          ],
          selectedTestCaseId: { testCaseId: 'tc2', testCaseCode: 'TC#456' },
          selectedTestProcedureId: { testProcedureId: 'tp3', testProcedureCode: 'TP#789' }
        }
      ].forEach((test) => {
        server.create('test', test);
      });
    }
  });

const MockServer = ({ children }) => {
  makeServer();
  return children;
};

export default MockServer;

MockServer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
