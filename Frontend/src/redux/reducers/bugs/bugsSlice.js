import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server/api';

const initialState = {
  rows: [],
  loading: true,
  possibleValues: {}
};

const prepareData = (rows) => {
  return rows.map((row) => ({
    ...row,
    state: row.errorState,
    type: row.errorType,
    impact: row.errorImpact,
    priority: row.errorPriority,
    retests: `${row.retestsRequired} / ${row.retestsDone} / ${row.retestsFailed}`,
    deadline: row.deadline.substring(0, 10).replaceAll('-', '/'),
    reportDate: row.reportDate.substring(0, 10).replaceAll('-', '/'),
    endDate: row.endDate.substring(0, 10).replaceAll('-', '/')
  }));
};

export const getPossibleValues = createAsyncThunk('bugs/get/values', async () => {
  const promises = [];
  promises.push(server().get({ url: 'bugs/types' }));
  promises.push(server().get({ url: 'bugs/impacts' }));
  promises.push(server().get({ url: 'bugs/priorities' }));

  const resolved = await Promise.all(promises);

  const data = {
    types: resolved[0],
    impacts: resolved[1],
    priorities: resolved[2]
  };

  return data;
});

export const getRows = createAsyncThunk('bugs/get/rows', async () => {
  const data = await server().get({ url: 'bugs' });
  return prepareData(data);
});

export const putRows = createAsyncThunk('bugs/put/rows', async ({ id, json }) => {
  const data = await server().put({ url: `bugs/${id}`, data: json });
  return data;
});

export const rejectBug = createAsyncThunk('bugs/reject', async ({ id }) => {
  const data = await server().put({ url: `bugs/reject/${id}` });
  return data;
});

export const resolveBug = createAsyncThunk('bugs/resolve', async ({ id, retestsRequired }) => {
  const data = await server().put({ url: `bugs/resolve/${id}`, data: retestsRequired });
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
      })
      .addCase(getPossibleValues.fulfilled, (state, action) => {
        state.possibleValues = action.payload;
      });
  }
});

export default bugsSlice.reducer;
