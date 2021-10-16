import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import api from '../../../services/server/api'

const initialState = {
  testId: '',
  testName: '',
  testCategories: [],
  testCasesIds: [],
  testProceduresIds: [],
  selectedTestCase: {},
  selectedTestProcedure: {}
};

const getTestById = createAsyncThunk('test/getTestById',
  async (testId) => {
    const response = await api.get(`${API_URL}/test/${testId}`);
    return response;
  });

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase();
  }
});