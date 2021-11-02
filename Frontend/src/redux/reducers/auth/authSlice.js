import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from '../../../services/auth';
import server from '../../../services/server';

export const changeUserName = createAsyncThunk(
  'user/change/name',
  async ({ name }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().user.userId}/name`,
      body: { name }
    });
    return response;
  }
);

export const changeUserSurname = createAsyncThunk(
  'user/change/surname',
  async ({ surname }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().user.userId}/surname`,
      body: { surname }
    });
    return response;
  }
);

export const changeUserPasswordById = createAsyncThunk(
  'user/change/password/byId',
  async ({ password }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().user.userId}/passwordById`,
      body: { password }
    });
    return response;
  }
);

export const changeUserPasswordByEmail = createAsyncThunk(
  'user/change/password/byId',
  async ({ email, password }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().user.userId}/passwordByEmail`,
      body: { email, password }
    });
    return response;
  }
);

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

export const register = createAsyncThunk(
  'auth/register',
  async ({ projectName, name, surname, email, password }) => {
    const response = await server().post({
      url: 'Products',
      data: {
        name: projectName,
        firstName: name,
        lastName: surname,
        email,
        password
      }
    });
    return response;
  }
);

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const data = await authService.login({
    email,
    password
  });
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.isLoggedIn = false;
      state.token = null;
    }
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
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
