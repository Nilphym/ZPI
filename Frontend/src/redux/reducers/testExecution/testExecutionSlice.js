import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server';

const initialState = {
  test: null
};

export const get = createAsyncThunk('test/get/', async () => {
  const data = await server().get({ url: 'Tests' });
  return data;
});

export const put = createAsyncThunk('test/put/', async ({ id, json }) => {
  const data = await server().put({ url: `Tests/${id}`, data: json });
  return data;
});

export const testExecutionSlice = createSlice({
  name: 'testExecution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action.payload;
    });
  }
});

export default testExecutionSlice.reducer;
