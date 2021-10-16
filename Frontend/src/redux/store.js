import {
  configureStore
} from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';
import counterReducer from './reducers/counter/counterSlice';
import testReducer from './reducers/test/testSlice';

const reducer = {
  counter: counterReducer,
  auth: authReducer,
  test: testReducer
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;