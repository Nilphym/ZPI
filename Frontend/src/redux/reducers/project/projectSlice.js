/* eslint-disable no-unused-vars */
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import server from '../../../services/server';

const initialState = {
  projectId: '',
  projectName: '',
  creationDate: '',
  version: '',
  testPlansIds: [],
  isLoading: true
};

// ----------------------------------------- Project API
export const getProjectById = createAsyncThunk('project/get/byId', async (_, {
  getState
}) => {
  const response = await server().get({
    url: `Projects/${getState().project.projectId}`
  });
  return response;
});

export const putProjectById = createAsyncThunk('project/put/byId', async (_, {
  getState
}) => {
  const response = await server().put({
    url: `Projects/${getState().project.projectId}`,
    data: {
      name: getState().project.projectName
    }
  });
  return response;
});

export const postProject = createAsyncThunk('project/post', async (projectName) => {
  const response = await server().post({
    url: 'Projects',
    data: {
      name: projectName
    }
  });
  return response;
});


// ----------------------------------------- Test Plan API
export const postTestPlan = createAsyncThunk('testPlan/post', async (_, {
  getState
}) => {
  const response = await server().post({
    url: 'TestPlans',
    data: {
      projectId: getState().project.projectId
    }
  });
  return response;
});

export const projectSlice = createSlice({
  name: 'testPlans',
  initialState,
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload.projectId;
    },
    setProjectName: (state, action) => {
      state.projectName = action.payload.projectName;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectById.fulfilled, (state, action) => {
        const {
          id,
          name,
          creationDate,
          version,
          testPlansIds
        } = action.payload;
        state.projectId = id;
        state.projectName = name;
        state.creationDate = creationDate;
        state.version = version;
        state.testPlansIds = testPlansIds;
        state.isLoading = false;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(putProjectById.fulfilled, (state, action) => {
        alert('Object changed');
      })
      .addCase(putProjectById.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(postProject.fulfilled, (state, action) => {
        alert('Project added');
      })
      .addCase(postProject.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(postTestPlan.fulfilled, (state, action) => {
        alert('Test Plan added');
      })
      .addCase(postTestPlan.rejected, (state, action) => {
        alert(action.error.message);
      });
  }
});

export const {
  setProjectId
} = projectSlice.actions;
export default projectSlice.reducer;