/* eslint-disable no-console */
import {
  Model
} from 'miragejs';

const models = {
  project: Model
};

const routes = [

  // Project requests
  (thisRef) =>
  thisRef.get('Projects/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const findingItem = schema.projects.findBy({
      id
    }).attrs;
    return findingItem;
  }),

  (thisRef) =>
  thisRef.put('Projects/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const {
      name
    } = JSON.parse(
      request.requestBody
    );
    schema.projects
      .findBy({
        id
      })
      .update({
        name
      });
  }),

  (thisRef) =>
  thisRef.post('Projects', (schema, request) => {
    const newProjectId = Math.floor(Math.random() * 10000);
    const {
      name
    } = JSON.parse(request.requestBody);

    schema.projects.create({
      id: newProjectId,
      name,
      creationDate: new Date().toISOString().split('T')[0],
      version: 0,
      testPlansIds: []
    });
    return newProjectId;
  })
];

const seeds = [
  (serverRef) => [{
    id: '43463',
    name: 'FunTest',
    creationDate: '30.10.2021',
    version: 0,
    testPlansIds: ['tplan1', 'tplan2', 'tplan3']
  }].forEach((project) => {
    serverRef.create('project', project);
  })
];

export default {
  models,
  routes,
  seeds
};