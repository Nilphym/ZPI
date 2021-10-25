/* eslint-disable no-unused-vars */
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import server from '../../../services/server';

const initialState = {
  selectedTestPlanId: '',
  selectedTestPlan: {},
  isLoading: true
};

// ----------------------------------------- Test Plan API
export const getTestPlanById = createAsyncThunk('testPlan/get/byId', async (_, {
  getState
}) => {
  const response = await server().get({
    url: `TestPlans/${getState().testPlan.selectedTestPlanId}`
  });
  return response;
});

export const putTestPlanById = createAsyncThunk('testPlan/put/ById', async (_, {
  getState
}) => {
  const {
    selectedTestPlan
  } = getState().testPlan;

  const body = {
    name: selectedTestPlan.name,
    testSuites: selectedTestPlan.testSuites
  };

  const response = await server().put({
    url: `TestPlans/${getState().testPlan.selectedTestPlanId}`,
    data: body
  });
  return response;
});

// ----------------------------------------- Test Suite API
export const postTestSuite = createAsyncThunk('testSuite/post', async (testSuiteName, {
  getState
}) => {
  const {
    selectedTestPlanId
  } = getState().testPlan;

  const body = {
    testPlanId: selectedTestPlanId,
    newTestSuiteName: testSuiteName
  };

  const response = await server().post({
    url: 'TestSuites',
    data: body
  });
  return response;
});

// export const postTest = createAsyncThunk('testPlan/post', async (testPlanId) => {
//   const response = await server().post({
//     url: 'TestPlans',
//     data: {
//       testPlanId
//     }
//   });
//   return response;
// }); TODO: Move to projectSlice

export const testPlanSlice = createSlice({
  name: 'testPlans',
  initialState,
  reducers: {
    setTestPlanId: (state, action) => {
      state.selectedTestPlanId = action.payload.id;
    },
    editTestPlanName: (state, action) => {
      state.selectedTestPlan.name = action.payload.newTestName;
    },
    deleteTestSuite: (state, action) => {
      state.selectedTestPlan.testSuites = state.selectedTestPlan.testSuites.filter(testSuite => testSuite.testSuiteId !== action.payload.testSuiteId);
    },
    changeTestSuiteName: (state, action) => {
      const { newTestSuiteName, testSuiteId } = action.payload;
      state.selectedTestPlan.testSuites[state.selectedTestPlan.testSuites.findIndex(testSuite => testSuite.testSuiteId === testSuiteId)].testSuite = newTestSuiteName;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestPlanById.fulfilled, (state, action) => {
        const {
          id,
          name,
          testSuites,
          tests
        } = action.payload;
        state.selectedTestPlan.id = id;
        state.selectedTestPlan.name = name;
        state.selectedTestPlan.testSuites = testSuites;
        state.selectedTestPlan.tests = tests;
        state.isLoading = false;
      })
      .addCase(getTestPlanById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(putTestPlanById.fulfilled, () => {
        alert('Object changed');
      })
      .addCase(putTestPlanById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(postTestSuite.fulfilled, () => {
        alert('Test Suite added');
      })
      .addCase(postTestSuite.rejected, (_, action) => {
        alert(action.error.message);
      });
  }
});

export const {
  setTestPlanId,
  editTestPlanName,
  deleteTestSuite,
  changeTestSuiteName
} = testPlanSlice.actions;
export default testPlanSlice.reducer;