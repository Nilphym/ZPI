import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import server from '../../../services/server/api';

const transformTestData = (testDataObject) => {
  const keys = Object.keys(testDataObject);
  const transformedData = [];
  keys.forEach((key) => transformedData.push(testDataObject[key]));
  return transformedData;
};

const transformEntryData = (entryDataObject) => {
  const keys = Object.keys(entryDataObject);
  const array = [];
  let iterator = 0;
  keys.forEach((key) => {
    if (typeof entryDataObject[key] === 'string') {
      array.push({
        textFieldId: `${iterator}`,
        entryType: 'textField',
        textField: entryDataObject[key]
      });
      iterator += 1;
    } else {
      array.push(entryDataObject[key]);
    }
  });

  return array;
};

const prepareOutputTestData = (testDataArray) => {
  let iterator = 0;
  const testDataObject = {};
  testDataArray.forEach((object) => {
    testDataObject[`Data${iterator}`] = object;
    iterator += 1;
  });
  return testDataObject;
};

const prepareOutputEntryData = (entryDataArray) => {
  let iterator = 0;
  const testDataObject = {};
  entryDataArray.forEach((object) => {
    if(object.entryType === 'textField')
      testDataObject[`Data${iterator}`] = object.textField;
    else {
      testDataObject[`Data${iterator}`] = object;
    }
    iterator += 1;
  });
  return testDataObject;
};

const initialState = {
  testId: '',
  testData: {},
  testSuites: [],
  testCasesCodes: [],
  testProceduresCodes: [],
  selectedTestSuiteId: '',
  selectedTestCaseId: '',
  selectedTestProcedureId: '',
  selectedTestCase: {},
  selectedTestProcedure: {},
  isLoadingTest: true,
  isLoadingTestProcedure: true,
  isLoadingTestCase: true,
  selectedTestStep: {},
  isLoadingTestStep: {}
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

export const putTestProcedureById = createAsyncThunk('test/putTestProcedureById', async (_, {
  getState
}) => {
  const response = await server().put({
    url: `testProcedure/${getState().test.selectedTestProcedureId}`,
    data: {
      result: getState().test.selectedTestProcedure.result
    }
  });
  return response;
});

export const postTestProcedure = createAsyncThunk('test/addTestProcedure', async (body) => {
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
    url: `testCase/${getState().test.selectedTestCaseId}`,
  });
  return response;
});

export const putTestCaseById = createAsyncThunk('test/putTestCaseById', async (_, {
  getState
}) => {

  const transferObject = {
    preconditions: getState().test.selectedTestCase.preconditions,
    entryDataObject: prepareOutputEntryData(getState().test.selectedTestCase.entryData)
  };

  const response = await server().put({
    url: `testCase/${getState().test.selectedTestCaseId}`,
    data: transferObject
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
  dataToSend.testDataObject = prepareOutputTestData(currentTestStep.testData);
  dataToSend.controlPoint = currentTestStep.controlPoint;
  const response = await server().put({
    url: `step/${testStepId}`,
    data: dataToSend
  });
  return response;
});

export const postTestStep = createAsyncThunk('test/postTestStep', async (newStepName, {
  getState
}) => {
  const currentTestProcedureId = getState().test.selectedTestProcedure.id;
  const dataToSend = {};
  dataToSend.testProcedureId = currentTestProcedureId;
  dataToSend.name = newStepName;
  const response = await server().post({
    url: 'step',
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
      state.selectedTestStep[id].testData[state.selectedTestStep[id].testData.findIndex(table => table.tableName === editedTable.tableName)] = editedTable;
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
    },
    setTestStepLoading: (state, action) => {
      const { id, value } = action.payload;
      state.isLoadingTestStep[id] = value;
    },
    editTestProcedureResult: (state, action) => {
      state.selectedTestProcedure.result = action.payload.result;
    },
    setTestProcedureLoading: (state, action) => {
      state.isLoadingTestProcedure = action.payload.isLoading;
    },
    addTestCaseEntryDataItem: (state, action) => {
      const { newItem } = action.payload;
      state.selectedTestCase.entryData = [...state.selectedTestCase.entryData, newItem];
    },
    editTestCaseTextField: (state, action) => {
      const { editedTextField } = action.payload;
      state.selectedTestCase.entryData[state.selectedTestCase.entryData.findIndex(item => item.entryType === 'textField' && item.textFieldId === editedTextField.textFieldId)] = editedTextField;
    },
    editTestCaseTable: (state, action) => {
      const {
        editedTable
      } = action.payload;
      state.selectedTestCase.entryData[state.selectedTestCase.entryData.findIndex(table => table.tableName === editedTable.tableName)] = editedTable;
    },
    editTestCasePreconditions: (state, action) => {
      const {
        editedPreconditions
      } = action.payload;
      state.selectedTestCase.preconditions = editedPreconditions;
    },
    deleteTestCaseTextField: (state, action) => {
      const {
        textFieldId
      } = action.payload;
      state.selectedTestCase.entryData = [...state.selectedTestCase.entryData.filter((item) => item.textFieldId !== textFieldId)];
    },
    deleteTestCaseTable: (state, action) => {
      const {
        tableName
      } = action.payload;
      state.selectedTestCase.entryData = [...state.selectedTestCase.entryData.filter((item) => item.tableName !== tableName)];
    },
    setTestCaseLoading: (state, action) => {
      state.isLoadingTestCase = action.payload.isLoading;
    },
    setTestTestCase: (state, action) => {
      state.selectedTestCaseId = action.payload.id;
    },
    setTestTestProcedure: (state, action) => {
      state.selectedTestProcedureId = action.payload.id;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestById.fulfilled, (state, action) => {
        const {
          id,
          name,
          creationDate,
          version,
          executionCounter,
          testSuites,
          testCasesCodes,
          testProceduresCodes,
          selectedTestSuiteId,
          selectedTestCaseId,
          selectedTestProcedureId
        } = action.payload;
        state.testId = id;
        state.testData.testName = name;
        state.testData.creationDate = creationDate;
        state.testData.version = version;
        state.testData.executionCounter = executionCounter;
        state.testSuites = testSuites;
        state.testCasesCodes = testCasesCodes;
        state.testProceduresCodes = testProceduresCodes;
        state.selectedTestSuiteId = selectedTestSuiteId.testSuiteId;
        state.selectedTestCaseId = selectedTestCaseId.testCaseId;
        state.selectedTestProcedureId = selectedTestProcedureId.testProcedureId;
        state.isLoadingTest = false;
      })
      .addCase(getTestById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getTestProcedureById.fulfilled, (state, action) => {
        const {
          id,
          result,
          testStepsIds
        } = action.payload;
        state.selectedTestProcedure.id = id;
        state.selectedTestProcedure.testStepsIds = testStepsIds;
        state.selectedTestProcedure.result = result;
        state.isLoadingTestProcedure = false;
        testStepsIds.forEach(testStepId => {
          state.selectedTestStep[testStepId] = {};
        });
      })
      .addCase(getTestProcedureById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(putTestProcedureById.fulfilled, () => {
        alert('Object changed');
      })
      .addCase(putTestProcedureById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getTestCaseById.fulfilled, (state, action) => {
        state.selectedTestCase.entryData = transformEntryData(action.payload.entryDataObject);
        state.selectedTestCase.preconditions = action.payload.preconditions;
        state.isLoadingTestCase = false;
      })
      .addCase(getTestCaseById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(putTestCaseById.fulfilled, () => {
          alert('Object changed');
        })
        .addCase(putTestCaseById.rejected, (_, action) => {
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
        state.selectedTestStep[action.payload.id] = {};
        state.selectedTestStep[action.payload.id].id = id;
        state.selectedTestStep[action.payload.id].name = name;
        state.selectedTestStep[action.payload.id].stepNumber = stepNumber;
        state.selectedTestStep[action.payload.id].testData = transformTestData(testDataObject);
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
      })
      .addCase(postTestStep.fulfilled, () => {
        console.log('Object changed, Object added');
      })
      .addCase(postTestStep.rejected, (_, action) => {
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
  setTestStepLoading,
  setTestStepName,
  editTestProcedureResult,
  setTestProcedureLoading,
  addTestCaseEntryDataItem,
  editTestCaseTextField,
  editTestCaseTable,
  editTestCasePreconditions,
  deleteTestCaseTextField,
  deleteTestCaseTable,
  setTestCaseLoading,
  setTestTestCase,
  setTestTestProcedure
} = testSlice.actions;
export default testSlice.reducer;