/* eslint-disable no-alert */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from '../../../services/auth';
import server from '../../../services/server';

// ----------------------------------------- Users API
export const getUsers = createAsyncThunk('users/get', async (_, { getState }) => {
  const response = await server().get({
    url: `Product/${getState().auth.token.productId}`
  });
  return response;
});

export const deleteUser = createAsyncThunk('user/delete', async ({ userId }) => {
  const response = await server().delete({
    url: `Users/${userId}`
  });
  return response;
});

// ----------------------------------------- Product API
export const getProductById = createAsyncThunk('product/get/byId', async (_, { getState }) => {
  const response = await server().get({
    url: `Products/${getState().auth.token.productId}`
  });
  return response;
});

export const getProductTestPlansById = createAsyncThunk(
  'product/testPlans/get/byId',
  async (_, { getState }) => {
    const response = await server().get({
      url: `Product/${getState().auth.token.productId}/TestPlans`
    });
    return response;
  }
);

// ----------------------------------------- Test Plan API
export const postTestPlan = createAsyncThunk(
  'testPlan/post',
  async (testPlanName, { getState }) => {
    const response = await server().post({
      url: `${getState().auth.token.productId}/TestPlans`,
      data: {
        name: testPlanName
      }
    });
    return response;
  }
);

// -------------------------------------------------------

export const changeUserName = createAsyncThunk(
  'user/change/name',
  async ({ name }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().auth.token.userId}/name`,
      body: {
        name
      }
    });
    return response;
  }
);

export const changeUserSurname = createAsyncThunk(
  'user/change/surname',
  async ({ surname }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().auth.token.userId}/surname`,
      body: {
        surname
      }
    });
    return response;
  }
);

export const changeUserPasswordById = createAsyncThunk(
  'user/change/password/byId',
  async ({ password }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().auth.token.userId}/passwordById`,
      body: {
        password
      }
    });
    return response;
  }
);

export const changeUserPasswordByEmail = createAsyncThunk(
  'user/change/password/byId',
  async ({ email, password }, { getState }) => {
    const response = await server().put({
      url: `User/${getState().auth.token.userId}/passwordByEmail`,
      body: {
        email,
        password
      }
    });
    return response;
  }
);

export const inviteUser = createAsyncThunk(
  'user/invite/byPM',
  async ({ email, role }, { getState }) => {
    const response = await server().post({
      url: `User/${getState().auth.token.userId}/passwordByEmail`, // TODO: Poprawić
      body: {
        projectId: getState().auth.token.projectId,
        email,
        role
      }
    });
    return response;
  }
);

const token = authService.getDecodedToken();
const initialState = token
  ? {
      isLoggedIn: true,
      token,
      creationDate: '',
      version: '',
      testPlans: [],
      users: [],
      isLoading: true,
      isLoadingUsers: true
    }
  : {
      isLoggedIn: false,
      token: null,
      creationDate: '',
      version: '',
      testPlans: [],
      users: [],
      isLoading: true,
      isLoadingUsers: true
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
    },
    setIsLoadingUsers: (state, action) => {
      state.isLoadingUsers = action.payload;
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
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        const { id, name, creationDate, version } = action.payload;
        state.productId = id;
        state.productName = name;
        state.creationDate = creationDate;
        state.version = version;
      })
      .addCase(getProductById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getProductTestPlansById.fulfilled, (state, action) => {
        state.testPlans = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductTestPlansById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(postTestPlan.fulfilled, () => {
        alert('Test Plan added');
      })
      .addCase(postTestPlan.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(deleteUser.fulfilled, () => {
        alert('User deleted');
      })
      .addCase(deleteUser.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(inviteUser.fulfilled, () => {
        alert('User invited');
      })
      .addCase(inviteUser.rejected, (_, action) => {
        alert(action.error.message);
      });
  }
});

export const { logout, setIsLoadingUsers } = authSlice.actions;
export default authSlice.reducer;
