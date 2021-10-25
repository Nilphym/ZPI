import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';
import counterReducer from './reducers/counter/counterSlice';
import testReducer from './reducers/test/testSlice';
import bugsReducer from './reducers/bugs/bugsSlice';

const reducer = {
  counter: counterReducer,
  auth: authReducer,
  test: testReducer,
  bugs: bugsReducer
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
export * from './reducers/auth/authSlice';
export * from './reducers/counter/counterSlice';
export * from './reducers/test/testSlice';
export * from './reducers/bugs/bugsSlice';
