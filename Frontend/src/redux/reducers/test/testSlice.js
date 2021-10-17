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
  selectedTestCase: {},
  selectedTestProcedure: {}
};

export const getTestById = createAsyncThunk('test/getTestById', async (_, { getState }) => {
  const data = await server().get({ url: `test/${getState().test.testId}` });
  return data;
});

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload;
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
          selectedTestCase,
          selectedTestProcedure
        } = action.payload;
        state.testId = testId;
        state.testName = testName;
        state.testCategories = testCategories;
        state.testCasesIds = testCasesIds;
        state.testProceduresIds = testProceduresIds;
        state.selectedTestCategory = selectedTestCategory;
        state.selectedTestCase = selectedTestCase;
        state.selectedTestProcedure = selectedTestProcedure;
      })
      .addCase(getTestById.rejected, (state, action) => {
        alert(action.error.message);
      });
  }
});

export const {
  setTestId
} = testSlice.actions;
export default testSlice.reducer;