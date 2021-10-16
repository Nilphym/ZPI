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

export const putRows = createAsyncThunk('bugs/put/rows', async ({ code, json }) => {
  const data = await server().put({ url: `bugs/${code}`, data: json });
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
