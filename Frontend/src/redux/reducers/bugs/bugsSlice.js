import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server/api';

const initialState = {
  rows: [],
  loading: true
};

export const getRows = createAsyncThunk('bugs/get/rows', async () => {
  const data = await server().get({ url: 'bugs' });
  return data;
});

export const putRows = createAsyncThunk('bugs/put/rows', async ({ id, json }) => {
  const data = await server().put({ url: `bugs/${id}`, data: json });
  return data;
});

export const rejectBug = createAsyncThunk('bugs/reject', async ({ id }) => {
  const data = await server().put({ url: `bugs/reject/${id}` });
  return data;
});

export const resolveBug = createAsyncThunk('bugs/resolve', async ({ id }) => {
  const data = await server().put({ url: `bugs/resolve/${id}` });
  return data;
});

export const takeBug = createAsyncThunk('bugs/take', async ({ id, personId }) => {
  const data = await server().put({ url: `bugs/take/${id}`, data: personId });
  return data;
});

export const resignFromBug = createAsyncThunk('bugs/resign', async ({ id, personId }) => {
  const data = await server().put({ url: `bugs/resign/${id}`, data: personId });
  return data;
});

export const bugsSlice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRows.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(getRows.rejected, (state) => {
        state.loading = false;
        state.rows = [];
      })
      .addCase(getRows.pending, (state) => {
        state.loading = true;
      });
  }
});

export default bugsSlice.reducer;
