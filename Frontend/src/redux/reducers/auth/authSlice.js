import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from '../../../services/auth/authService';

const token = authService.getDecodedToken();
const initialState = token
  ? {
      isLoggedIn: true,
      token
    }
  : {
      isLoggedIn: false,
      token: null
    };

export const register = createAsyncThunk('auth/register', async ({ username, email, password }) => {
  return authService.register({
    username,
    email,
    password
  });
});

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  return authService.login({
    username,
    password
  });
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.isLoggedIn = false;
      state.token = null;
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.fulfilled, (state) => {
          state.isLoggedIn = false;
          state.token = null;
        })
        .addCase(register.rejected, (state) => {
          state.isLoggedIn = false;
          state.token = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoggedIn = true;
          state.token = action.payload;
        })
        .addCase(login.rejected, (state) => {
          state.isLoggedIn = false;
          state.token = null;
        });
    }
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
