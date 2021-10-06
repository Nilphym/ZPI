import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import counterReducer from './reducers/counter/counterSlice';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer
  });

export default createRootReducer;
