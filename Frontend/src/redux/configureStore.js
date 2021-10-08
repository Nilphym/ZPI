import { createStore } from 'redux';

import createRootReducer from './configureReducers';

/* eslint-disable no-underscore-dangle */
const configureStore = (preloadedState) => {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
/* eslint-enable */

export default configureStore;
