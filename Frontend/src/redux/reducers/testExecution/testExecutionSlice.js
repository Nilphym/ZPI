import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import hash from 'object-hash';

import server from '../../../services/server';

const initialState = {
  test: null,
  loading: true,
  pendingTestId: null,
  pendingErrorId: null
};

export const getExecutionTestFromErrorId = createAsyncThunk(
  'testExecution/get/fromError',
  async ({ errorId }) => {
    const data = await server().get({ url: `Errors/ErrorTest/${errorId}` });
    return data;
  }
);

export const getExecutionTest = createAsyncThunk('testExecution/get', async ({ testId }) => {
  const data = await server().get({ url: `Tests/TestExecution/${testId}` });
  return data;
});

export const executeTest = createAsyncThunk('testExecution/execute', async ({ testId }) => {
  const data = await server().put({ url: `Tests/${testId}/execute` });
  return data;
});

const prepareDataForView = (test) => ({
  ...test,
  testCaseEntryData: Array.isArray(test.testCaseEntryData)
    ? test.testCaseEntryData.map((dataItem, index) =>
        typeof dataItem === 'object'
          ? { ...dataItem, code: `Entry Data ${index + 1}` }
          : { name: dataItem, code: `Entry Data ${index + 1}` }
      )
    : [],
  steps: test.steps.map((step) => ({
    ...step,
    testData: Array.isArray(step.testData)
      ? step.testData.map((tableData) => ({
          ...tableData,
          code: `TD-${hash(tableData).slice(0, 8).toUpperCase()}`
        }))
      : [],
    errors: step.errorIds.map((errorId) => ({
      id: errorId,
      code: `B-${errorId.slice(0, 8).toUpperCase()}`
    }))
  }))
});

export const testExecutionSlice = createSlice({
  name: 'testExecution',
  initialState,
  reducers: {
    setExecutionTestId: (state, action) => {
      state.pendingTestId = action.payload;
      state.pendingErrorId = null;
    },
    setExecutionBugId: (state, action) => {
      state.pendingErrorId = action.payload;
      state.pendingTestId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExecutionTestFromErrorId.fulfilled, (state, action) => {
        state.loading = false;
        state.test = prepareDataForView(action.payload);
      })
      .addCase(getExecutionTestFromErrorId.rejected, (state) => {
        state.loading = false;
        state.test = null;
      })
      .addCase(getExecutionTestFromErrorId.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { setExecutionTestId, setExecutionBugId } = testExecutionSlice.actions;

export default testExecutionSlice.reducer;
