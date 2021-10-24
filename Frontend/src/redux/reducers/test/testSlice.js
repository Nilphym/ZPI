import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import server from '../../../services/server/api';

const initialState = {
  testId: '',
  testData: {},
  testName: '',
  testCategories: [],
  testCasesIds: [],
  testProceduresIds: [],
  selectedTestCategory: '',
  selectedTestCaseId: '',
  selectedTestProcedureId: '',
  selectedTestCase: {},
  selectedTestProcedure: {},
  isLoadingTest: true,
  isLoadingTestProcedure: true,
  isLoadingTestCase: true
};

// ----------------------------------------- Test API
export const getTestById = createAsyncThunk('test/getTestById', async (_, { getState }) => {
  const response = await server().get({ url: `test/${getState().test.testId}` });
  return response;
});

export const updateTestById = createAsyncThunk('test/updateTestById', async (data, { getState }) => {
  const response = await server().put({
    url: `test/${getState().test.testId}`,
    data
  });
  return response;
});

// ----------------------------------------- Test Procedure API
export const getTestProcedureById = createAsyncThunk('test/getTestProcedureById', async (_, {
  getState
}) => {
  const response = await server().get({
    url: `testProcedure/${getState().test.selectedTestProcedureId}`
  });
  return response;
});

export const addTestProcedure = createAsyncThunk('test/addTestProcedure', async (body) => {
  const response = await server().post({
    url: 'testProcedures', data: body
  });
  return response;
});


// ----------------------------------------- Test Case API
export const getTestCaseById = createAsyncThunk('test/getTestCaseById', async (_, {
  getState
}) => {
  const response = await server().get({
    url: `testCase/${getState().test.selectedTestCaseId}`
  });
  return response;
});


// ----------------------------------------- Test Step API
export const getTestStepById = createAsyncThunk('test/getTestStepById', async (testStepId) => {
  const response = await server().get({
    url: `testStep/${testStepId}`
  });
  return response;
});


export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload;
      state.isLoading = true;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTestById.fulfilled, (state, action) => {
        const {
          testId,
          testName,
          testCategories,
          testCasesIds,
          testProceduresIds,
          selectedTestCategory,
          selectedTestCaseId,
          selectedTestProcedureId
        } = action.payload;
        state.testId = testId;
        state.testName = testName;
        state.testCategories = testCategories;
        state.testCasesIds = testCasesIds;
        state.testProceduresIds = testProceduresIds;
        state.selectedTestCategory = selectedTestCategory;
        state.selectedTestCaseId = selectedTestCaseId;
        state.selectedTestProcedureId = selectedTestProcedureId;
        state.isLoadingTest = false;
        state.isLoadingTestProcedure = true;
        state.isLoadingTestCase = true;
      })
      .addCase(getTestById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getTestProcedureById.fulfilled, (state, action) => {
        state.selectedTestProcedure = action.payload.selectedTestProcedure;
        state.isLoadingTestProcedure = false;
      })
      .addCase(getTestProcedureById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getTestCaseById.fulfilled, (state, action) => {
        state.selectedTestCase = action.payload.selectedTestCase;
        state.isLoadingTestCase = false;
      })
      .addCase(getTestCaseById.rejected, (_, action) => {
        alert(action.error.message);
      });
  }
});

export const {
  setTestId
} = testSlice.actions;
export default testSlice.reducer;