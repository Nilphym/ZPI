/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server';

const initialState = {
  testPlans: [],
  selectedTestPlanId: '',
  selectedTestPlan: {}
};

export const testPlansSlice = createSlice({
  name: 'testPlans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  }
});

// export const {

// } = testPlansSlice.actions;
export default testPlansSlice.reducer;
