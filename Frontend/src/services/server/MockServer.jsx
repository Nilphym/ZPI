import PropTypes from 'prop-types';
import { createServer, Response } from 'miragejs';

// DOCS: https://miragejs.com/tutorial/part-1/
const makeServer = () =>
  createServer({
    routes() {
      this.namespace = 'api';

      // Responding to a POST request
      this.post('/singin', (schema, request) => {
        // const attrs = JSON.parse(request.requestBody);
        // attrs.id = Math.floor(Math.random() * 100);

        // return { movie: attrs };
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      });

      // Using the `timing` option to slow down the response
      this.get(
        '/movies',
        () => {
          return {
            movies: [
              { id: 1, name: 'Inception', year: 2010 },
              { id: 2, name: 'Interstellar', year: 2014 },
              { id: 3, name: 'Dunkirk', year: 2017 }
            ]
          };
        },
        { timing: 4000 }
      );

      // Using the `Response` class to return a 500
      this.delete('/movies/1', () => {
        const headers = {};
        const data = { errors: ['Server did not respond'] };

        return new Response(500, headers, data);
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
