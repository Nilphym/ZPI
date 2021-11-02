/* eslint-disable no-console */
/* eslint-disable no-alert */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server';

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
    if (object.entryType === 'textField') testDataObject[`Data${iterator}`] = object.textField;
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
export const getTestById = createAsyncThunk('test/get/byId', async (_, { getState }) => {
  const response = await server().get({
    url: `Tests/${getState().test.testId}`
  });
  return response;
});

export const putTestById = createAsyncThunk('test/put/ById', async (_, { getState }) => {
  const body = {
    name: getState().test.testData.testName
  };
  if (getState().test.selectedTestSuiteId) {
    body.selectedTestSuiteId = {
      testSuiteId: getState().test.selectedTestSuiteId,
      testSuite: getState().test.testSuites.filter(
        (testSuite) => testSuite.testSuiteId === getState().test.selectedTestSuiteId
      )[0].testSuite
    };
  } else {
    body.selectedTestSuiteId = {};
  }
  if (getState().test.selectedTestCaseId) {
    body.selectedTestCaseId = {
      testCaseId: getState().test.selectedTestCaseId,
      testCaseCode: getState().test.testCasesCodes.filter(
        (caseCode) => caseCode.testCaseId === getState().test.selectedTestCaseId
      )[0].testCaseCode
    };
  } else {
    body.selectedTestCaseId = {};
  }
  if (getState().test.selectedTestProcedureId) {
    body.selectedTestProcedureId = {
      testProcedureId: getState().test.selectedTestProcedureId,
      testProcedureCode: getState().test.testProceduresCodes.filter(
        (procedureCode) => procedureCode.testProcedureId === getState().test.selectedTestProcedureId
      )[0].testProcedureCode
    };
  } else {
    body.selectedTestProcedureId = {};
  }
  const response = await server().put({
    url: `Tests/${getState().test.testId}`,
    data: body
  });
  return response;
});

export const postTest = createAsyncThunk('test/post', async ({testPlanId, testSuiteId, testName }) => {
  const response = await server().post({
    url: 'Tests',
    data: {
      planTestId: testPlanId,
      planSuiteId: testSuiteId,
      name: testName
    }
  });
  return response;
});

// ----------------------------------------- Test Procedure API
export const getTestProcedureById = createAsyncThunk(
  'test/getTestProcedureById',
  async (_, { getState }) => {
    const response = await server().get({
      url: `TestProcedures/${getState().test.selectedTestProcedureId}`
    });
    return response;
  }
);

export const putTestProcedureById = createAsyncThunk(
  'test/putTestProcedureById',
  async (_, { getState }) => {
    const response = await server().put({
      url: `TestProcedures/${getState().test.selectedTestProcedureId}`,
      data: {
        result: getState().test.selectedTestProcedure.result
      }
    });
    return response;
  }
);

export const postTestProcedure = createAsyncThunk(
  'test/postTestProcedure',
  async (_, { getState }) => {
    const response = await server().post({
      url: 'TestProcedures',
      data: {
        testId: getState().test.testId
      }
    });
    return response;
  }
);

// ----------------------------------------- Test Case API
export const getTestCaseById = createAsyncThunk('test/getTestCaseById', async (_, { getState }) => {
  const response = await server().get({
    url: `TestCases/${getState().test.selectedTestCaseId}`
  });
  return response;
});

export const putTestCaseById = createAsyncThunk('test/putTestCaseById', async (_, { getState }) => {
  const transferObject = {
    preconditions: getState().test.selectedTestCase.preconditions,
    entryDataObject: prepareOutputEntryData(getState().test.selectedTestCase.entryData)
  };

  const response = await server().put({
    url: `TestCases/${getState().test.selectedTestCaseId}`,
    data: transferObject
  });
  return response;
});

export const postTestCase = createAsyncThunk('test/postTestCase', async (_, { getState }) => {
  const response = await server().post({
    url: 'TestCases',
    data: {
      testId: getState().test.testId
    }
  });
  return response;
});

// ----------------------------------------- Test Step API
export const getTestStepById = createAsyncThunk('test/getTestStepById', async (testStepId) => {
  const response = await server().get({
    url: `Steps/${testStepId}`
  });
  return response;
});

export const putTestStepById = createAsyncThunk(
  'test/putTestStepById',
  async (testStepId, { getState }) => {
    const currentTestStep = getState().test.selectedTestStep[testStepId];
    const dataToSend = {};
    dataToSend.name = currentTestStep.name;
    dataToSend.testDataObject = prepareOutputTestData(currentTestStep.testData);
    dataToSend.controlPoint = currentTestStep.controlPoint;
    const response = await server().put({
      url: `Steps/${testStepId}`,
      data: dataToSend
    });
    return response;
  }
);

export const postTestStep = createAsyncThunk(
  'test/postTestStep',
  async (newStepName, { getState }) => {
    const currentTestProcedureId = getState().test.selectedTestProcedure.id;
    const dataToSend = {};
    dataToSend.testProcedureId = currentTestProcedureId;
    dataToSend.name = newStepName;
    const response = await server().post({
      url: 'Steps',
      data: dataToSend
    });
    return response;
  }
);

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload;
      state.isLoading = true;
    },
    addTestStepTestData: (state, action) => {
      const { id, newTable } = action.payload;
      state.selectedTestStep[id].testData = [...state.selectedTestStep[id].testData, newTable];
    },
    editTestStepTestData: (state, action) => {
      const { id, editedTable } = action.payload;
      state.selectedTestStep[id].testData[
        state.selectedTestStep[id].testData.findIndex(
          (table) => table.tableName === editedTable.tableName
        )
      ] = editedTable;
    },
    editTestStepControlPoint: (state, action) => {
      const { id, editedControlPoint } = action.payload;
      state.selectedTestStep[id].controlPoint = editedControlPoint;
    },
    deleteTestStepTestData: (state, action) => {
      const { id, tableName } = action.payload;
      state.selectedTestStep[id].testData = [
        ...state.selectedTestStep[id].testData.filter((table) => table.tableName !== tableName)
      ];
    },
    setTestStepName: (state, action) => {
      const { id, newName } = action.payload;
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
      state.selectedTestCase.entryData[
        state.selectedTestCase.entryData.findIndex(
          (item) =>
            item.entryType === 'textField' && item.textFieldId === editedTextField.textFieldId
        )
      ] = editedTextField;
    },
    editTestCaseTable: (state, action) => {
      const { editedTable } = action.payload;
      state.selectedTestCase.entryData[
        state.selectedTestCase.entryData.findIndex(
          (table) => table.tableName === editedTable.tableName
        )
      ] = editedTable;
    },
    editTestCasePreconditions: (state, action) => {
      const { editedPreconditions } = action.payload;
      state.selectedTestCase.preconditions = editedPreconditions;
    },
    deleteTestCaseTextField: (state, action) => {
      const { textFieldId } = action.payload;
      state.selectedTestCase.entryData = [
        ...state.selectedTestCase.entryData.filter((item) => item.textFieldId !== textFieldId)
      ];
    },
    deleteTestCaseTable: (state, action) => {
      const { tableName } = action.payload;
      state.selectedTestCase.entryData = [
        ...state.selectedTestCase.entryData.filter((item) => item.tableName !== tableName)
      ];
    },
    setTestCaseLoading: (state, action) => {
      state.isLoadingTestCase = action.payload.isLoading;
    },
    setTestTestCase: (state, action) => {
      state.selectedTestCaseId = action.payload.id;
    },
    setTestTestProcedure: (state, action) => {
      state.selectedTestProcedureId = action.payload.id;
      state.selectedTestProcedure.testStepsIds = [];
      state.selectedTestStep = {};
    },
    setTestName: (state, action) => {
      state.testData.testName = action.payload.newName;
    },
    setTestSuite: (state, action) => {
      state.selectedTestSuiteId = action.payload.newTestSuiteId;
    },
    setTestLoading: (state, action) => {
      state.isLoadingTest = action.payload.isLoading;
    },
    increaseExecutionCount: (state) => {
      state.testData.executionCounter += 1;
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
      .addCase(putTestById.fulfilled, () => {
        alert('Object changed');
      })
      .addCase(putTestById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(postTest.fulfilled, (_, action) => {
        return action.payload.testPlanId;
      })
      .addCase(postTest.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getTestProcedureById.fulfilled, (state, action) => {
        const { id, result, testStepsIds } = action.payload;
        state.selectedTestProcedure.id = id;
        state.selectedTestProcedure.testStepsIds = testStepsIds;
        state.selectedTestProcedure.result = result;
        state.isLoadingTestProcedure = false;
        state.isLoadingTestStep = {};
        state.selectedTestStep = {};
        testStepsIds.forEach((testStepId) => {
          state.isLoadingTestStep[testStepId] = true;
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
      .addCase(postTestProcedure.fulfilled, () => {
        alert('Object added');
      })
      .addCase(postTestProcedure.rejected, (_, action) => {
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
      .addCase(postTestCase.fulfilled, () => {
        alert('Object changed');
      })
      .addCase(postTestCase.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getTestStepById.fulfilled, (state, action) => {
        const { id, name, stepNumber, testDataObject, controlPoint } = action.payload;
        state.selectedTestStep[id] = {};
        state.selectedTestStep[id].id = id;
        state.selectedTestStep[id].name = name;
        state.selectedTestStep[id].stepNumber = stepNumber;
        state.selectedTestStep[id].testData = transformTestData(testDataObject);
        state.selectedTestStep[id].controlPoint = controlPoint;
        state.isLoadingTestStep[id] = false;
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
  setTestTestProcedure,
  setTestName,
  setTestSuite,
  setTestLoading,
  increaseExecutionCount
} = testSlice.actions;
export default testSlice.reducer;
