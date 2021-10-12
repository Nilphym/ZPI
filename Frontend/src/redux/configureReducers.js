import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';

const createRootReducer = () =>
  combineReducers({
    auth: authReducer
  });

export default createRootReducer;
