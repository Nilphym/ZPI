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
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOjEsImlhdCI6MTUxNjIzOTAyMn0.X_M6O0tdAGnnqqYoV_Q4xQZeG58gth-PG7KSW96tsic';
      });

      this.get('test/test-0', () => {
        return {
          testId: 'test-0',
          testName: 'Test the best',
          testCategories: ['login', 'register', 'API'],
          testCasesIds: ['tc1', 'tc2', 'tc3'],
          testProceduresIds: ['tp1', 'tp2', 'tp3'],
          selectedTestCase: { testCaseId: 'tc2' },
          selectedTestProcedure: { testProcedureId: 'tp3' }
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
