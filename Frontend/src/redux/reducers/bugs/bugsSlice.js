import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import server from '../../../services/server';

const initialState = {
  rows: [],
  loading: true,
  possibleValues: {},
  bugDetails: {}
};

export const getPossibleBugValues = createAsyncThunk('bugs/get/values', async () => {
  const promises = [];
  promises.push(server().get({ url: 'Errors/ErrorTypes' }));
  promises.push(server().get({ url: 'Errors/ErrorImpacts' }));
  promises.push(server().get({ url: 'Errors/ErrorPriorities' }));

  const resolved = await Promise.all(promises);

  const data = {
    types: resolved[0],
    impacts: resolved[1],
    priorities: resolved[2]
  };

  return data;
});

const prepareDataForView = (rows) => {
  return rows.map((row) => ({
    ...row,
    state: row.errorState,
    type: row.errorType,
    impact: row.errorImpact,
    priority: row.errorPriority,
    retests: [row.retestsRequired, row.retestsDone, row.retestsFailed].join(' / '),
    deadline: row.deadline ? DateTime.fromISO(row.deadline).toFormat('MM/dd/yyyy') : '',
    reportDate: DateTime.fromISO(row.reportDate).toFormat('MM/dd/yyyy'),
    endDate: DateTime.fromISO(row.endDate).toFormat('MM/dd/yyyy')
  }));
};

export const getBugs = createAsyncThunk('bugs/get/all', async () => {
  const data = await server().get({ url: 'Errors/toFix' });
  return prepareDataForView(data);
});

export const getBug = createAsyncThunk('bugs/get', async ({ errorId }) => {
  const data = await server().get({ url: `Errors/${errorId}` });
  return prepareDataForView([data])[0];
});

export const evaluateBug = createAsyncThunk('bugs/evaluate', async ({ errorId, result }) => {
  const data = await server().put({ url: `Errors/evaluate/${errorId}`, data: { result } });
  return data;
});

export const postBug = createAsyncThunk('bugs/post', async ({ json }) => {
  const data = await server().post({ url: 'Errors', data: json });
  return data;
});

const prepareDataForServer = (json) => {
  return {
    ...json,
    errorType: json.type,
    errorImpact: json.impact,
    errorPriority: json.priority,
    deadline: json.deadline
      ? DateTime.fromFormat(json.deadline, 'MM/dd/yyyy').toISO().substring(0, 19)
      : ''
  };
};

export const putRows = createAsyncThunk('bugs/put/all', async ({ id, json }) => {
  const data = await server().put({ url: `Errors/${id}`, data: prepareDataForServer(json) });
  return data;
});

export const rejectBug = createAsyncThunk('bugs/reject', async ({ id }) => {
  const data = await server().put({ url: `Errors/reject/${id}` });
  return data;
});

export const resolveBug = createAsyncThunk('bugs/resolve', async ({ id, retestsRequired }) => {
  const data = await server().put({ url: `Errors/resolve/${id}`, data: retestsRequired });
  return data;
});

export const takeBug = createAsyncThunk('bugs/take', async ({ id, developerId }) => {
  const data = await server().put({ url: `Errors/take/${id}`, data: developerId });
  return data;
});

export const resignFromBug = createAsyncThunk('bugs/resign', async ({ id, developerId }) => {
  const data = await server().put({ url: `Errors/resign/${id}`, data: developerId });
  return data;
});

export const bugsSlice = createSlice({
  name: 'bugs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBugs.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(getBugs.rejected, (state) => {
        state.loading = false;
        state.rows = [];
      })
      .addCase(getBugs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPossibleBugValues.fulfilled, (state, action) => {
        state.possibleValues = action.payload;
      })
      .addCase(getBug.fulfilled, (state, action) => {
        state.loading = false;
        state.bugDetails = action.payload;
      })
      .addCase(getBug.rejected, (state) => {
        state.loading = false;
        state.bugDetails = {};
      })
      .addCase(getBug.pending, (state) => {
        state.loading = true;
      });
  }
});

export default bugsSlice.reducer;
