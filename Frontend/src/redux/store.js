import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';
import counterReducer from './reducers/counter/counterSlice';

const reducer = {
  counter: counterReducer,
  auth: authReducer
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
