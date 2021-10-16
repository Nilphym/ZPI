import PropTypes from 'prop-types';
import { createServer } from 'miragejs';

// DOCS: https://miragejs.com/tutorial/part-1/
const makeServer = () =>
  createServer({
    routes() {
      this.namespace = 'api';

      this.post('/signin', () => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      });

      this.get('/test/test-0', () => {
        return {
          testId: 'test-0',
          testName: 'Test the best',
          testCategories: ['login', 'register', 'API'],
          testCasesIds: ['tc1', 'tc2', 'tc3'],
          testProceduresIds: ['tp1', 'tp2', 'tp3'],
          selectedTestCase: {testCaseId: 'tc2'},
          selectedTestProcedure: {testProcedureId: 'tp3'}
        };
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
