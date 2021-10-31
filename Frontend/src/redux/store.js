import {
  configureStore
} from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';
import counterReducer from './reducers/counter/counterSlice';
import testReducer from './reducers/test/testSlice';
import bugsReducer from './reducers/bugs/bugsSlice';
import testPlanReducer from './reducers/testPlan/testPlanSlice';
import productReducer from './reducers/product/productSlice';

const reducer = {
  counter: counterReducer,
  auth: authReducer,
  test: testReducer,
  bugs: bugsReducer,
  testPlan: testPlanReducer,
  product: productReducer
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
export * from './reducers/testPlan/testPlanSlice';
export * from './reducers/product/productSlice';