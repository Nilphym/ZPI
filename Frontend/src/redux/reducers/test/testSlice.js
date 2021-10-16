import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import api from '../../../services/server/api';
import {
  API_URL
} from '../../../config';


const initialState = {
  testId: '',
  testName: '',
  testCategories: [],
  testCasesIds: [],
  testProceduresIds: [],
  selectedTestCase: {},
  selectedTestProcedure: {}
};

export const getTestById = createAsyncThunk('test/getTestById',
  async (testId) => {
    const response = await api.get({url :`${API_URL}/test/${testId}`});
    return response;
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
        state = action.payload;
      })
      .addCase(getTestById.rejected, (state, action) => {
        alert(action.error.message);
      });
  }
});

export const { setTestId } = testSlice.actions;
export default testSlice.reducer;