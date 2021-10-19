/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { createServer, Model } from 'miragejs';

// DOCS: https://miragejs.com/tutorial/part-1/
const makeServer = () =>
  createServer({
    models: {
      bug: Model
    },
    routes() {
      this.namespace = 'api/';

      this.post('signin', () => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6MSwicm9sZSI6ImRldiJ9.l3t9QmgNcBbwSiCK2i6aV7w1Wu51vDmVJuQe9d6DDPA';
      });

      this.get('test/:id', (_, request) => {
        const { id } = request.params;
        return {
          testId: id,
          testName: 'Test the best',
          testCategories: ['login', 'register', 'API'],
          testCasesIds: ['tc1', 'tc2', 'tc3'],
          testProceduresIds: ['tp1', 'tp2', 'tp3'],
          selectedTestCategory: 'login',
          selectedTestCaseId: 'tc2',
          selectedTestProcedureId: 'tp3'
        };
      });

      this.put('test/:id', (_, request) => {
        const { id } = request.params;
        const data = JSON.parse(request.requestBody);
        console.log(`PUT/test/${id}: ${data}`);
      });

      this.get('testProcedure/:id', () => {
        return {
          selectedTestProcedure: {
            testStepsIds: ['Test_Step_1#987', 'Login#657', 'Register#123'],
            result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
          }
        };
      });

      this.get('testCase/:id', () => {
        return {
          selectedTestCase: {
            preconditions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`,
            entryData: []
          }
        };
      });

      this.get('step/:id', () => {
        return {
          id: 'TestStep1',
          name: 'Login',
          stepNumber: 0,
          testData: [
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
            }
          ],
          controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
            deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
            minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
            saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
        };
      });

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
