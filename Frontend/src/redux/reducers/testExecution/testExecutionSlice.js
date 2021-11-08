import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import hash from 'object-hash';

import server from '../../../services/server';

const initialState = {
  test: null,
  loading: true
};

export const getExecutionTest = createAsyncThunk('testExecution/get', async ({ errorId }) => {
  const data = await server().get({ url: `Errors/ErrorTest/${errorId}` });
  return data;
});

export const executeTest = createAsyncThunk('testExecution/execute', async ({ testId }) => {
  const data = await server().put({ url: `Test/${testId}/execute` });
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
      state.test.testId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExecutionTest.fulfilled, (state, action) => {
        state.loading = false;
        state.test = prepareDataForView(action.payload);
      })
      .addCase(getExecutionTest.rejected, (state) => {
        state.loading = false;
        state.test = null;
      })
      .addCase(getExecutionTest.pending, (state) => {
        state.loading = true;
      });
  }
});

export default testExecutionSlice.reducer;
