import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import server from '../../../services/server/api';

const transformData = (testDataObject) => {
  console.log(testDataObject);
  const keys = Object.keys(testDataObject);
  const transformedData = [];
  keys.forEach((key) => transformedData.push(testDataObject[key]));
  return transformedData;
};

// const prepareOutputData = (testDataArray) => {
//   let iterator = 1;
//   const testDataObject = {};
//   testDataArray.forEach((object) => {
//     testDataObject[`Data${iterator}`] = object;
//     iterator += 1;
//   });
//   return testDataObject;
// };

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
  isLoadingTestCase: true,
  // checked and correct
  selectedTestStep: {
    Ts1: {}
  },
  isLoadingTestStep: {
    Ts1: true
  }
};

// ----------------------------------------- Test API
export const getTestById = createAsyncThunk('test/getTestById', async (_, {
  getState
}) => {
  const response = await server().get({
    url: `test/${getState().test.testId}`
  });
  return response;
});

export const updateTestById = createAsyncThunk('test/updateTestById', async (data, {
  getState
}) => {
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
    url: 'testProcedures',
    data: body
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
    url: `step/${testStepId}`
  });
  return response;
});

export const putTestStepById = createAsyncThunk('test/putTestStepById', async (testStepId, {
  getState
}) => {
  
  const currentTestStep = getState().test.selectedTestStep[testStepId];
  const dataToSend = {};
  dataToSend.name = currentTestStep.name;
  dataToSend.testDataObject = currentTestStep.testData;
  dataToSend.controlPoint = currentTestStep.controlPoint;
  const response = await server().put({
    url: `step/${testStepId}`,
    data: dataToSend
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
    },
    addTestStepTestData: (state, action) => {
      const {
        id,
        newTable
      } = action.payload;
      state.selectedTestStep[id].testData = [...state.selectedTestStep[id].testData, newTable];
    },
    editTestStepTestData: (state, action) => {
      const {
        id,
        editedTable
      } = action.payload;
      state.selectedTestStep[id].testData[state.selectedTestStep[id].testData.findIndex(table => table.name === editedTable.name)] = editedTable;
    },
    editTestStepControlPoint: (state, action) => {
      const {
        id,
        editedControlPoint
      } = action.payload;
      state.selectedTestStep[id].controlPoint = editedControlPoint;
    },
    deleteTestStepTestData: (state, action) => {
      const {
        id,
        tableName
      } = action.payload;
      state.selectedTestStep[id].testData = [...state.selectedTestStep[id].testData.filter((table) => table.tableName !== tableName)];
    },
    setTestStepName: (state, action) => {
      const {
        id,
        newName
      } = action.payload;
      state.selectedTestStep[id].name = newName;
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
        const testStepIds = action.payload.selectedTestProcedure.testStepsIds;
        testStepIds.forEach(testStepId => {
          state.selectedTestStep[testStepId] = {};
          state.isLoadingTestStep[testStepId] = true;
        });
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
      })
      .addCase(getTestStepById.fulfilled, (state, action) => {
        const {
          id,
          name,
          stepNumber,
          testDataObject,
          controlPoint
        } = action.payload;
        state.selectedTestStep[action.payload.id].id = id;
        state.selectedTestStep[action.payload.id].name = name;
        state.selectedTestStep[action.payload.id].stepNumber = stepNumber;
        state.selectedTestStep[action.payload.id].testData = transformData(testDataObject);
        state.selectedTestStep[action.payload.id].controlPoint = controlPoint;
        state.isLoadingTestStep[action.payload.id] = false;
      })
      .addCase(getTestStepById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(putTestStepById.fulfilled, () => {
        console.log('Object changed');
      })
      .addCase(putTestStepById.rejected, (_, action) => {
        alert(action.error.message);
      });
  }
});

export const {
  setTestId,
  addTestStepTestData,
  editTestStepTestData,
  editTestStepControlPoint,
  deleteTestStepTestData,
  setTestStepName
} = testSlice.actions;
export default testSlice.reducer;