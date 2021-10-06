import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './configureReducers';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk));

const configureStore = (preloadedState) => {
  const store = createStore(createRootReducer(history), preloadedState, enhancer);
  return store;
};

export default configureStore;
