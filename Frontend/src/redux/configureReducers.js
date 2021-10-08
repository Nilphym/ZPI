import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from './reducers/counter/counterSlice';

const createRootReducer = () =>
  combineReducers({
    counter: counterReducer
  });

export default createRootReducer;
