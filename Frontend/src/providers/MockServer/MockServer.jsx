import PropTypes from 'prop-types';
import { createServer } from 'miragejs';

import tests from './data/tests';
import bugs from './data/bugs';
import testExecution from './data/testExecution';

// DOCS: https://miragejs.com/tutorial/part-1/
// Create new feature and add it to this list below
const features = [tests, bugs, testExecution];

const makeModels = () => Object.assign(...features.map((feature) => feature.models));

const makeRoutes = (thisRef) => ({
  ...features.map((feature) => feature.routes.map((route) => route(thisRef)))
});

const makeSeeds = (serverRef) => ({
  ...features.map((feature) => feature.seeds.map((route) => route(serverRef)))
});

const makeServer = () =>
  createServer({
    models: makeModels(),
    routes() {
      this.namespace = 'api/';
      this.post('Auth/login', () => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6MSwicm9sZSI6ImRldiJ9.l3t9QmgNcBbwSiCK2i6aV7w1Wu51vDmVJuQe9d6DDPA';
      });

      makeRoutes(this);
    },
    seeds(server) {
      makeSeeds(server);
    }
  });

export const MockServer = ({ children }) => {
  makeServer();
  return children;
};

export default MockServer;

MockServer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
