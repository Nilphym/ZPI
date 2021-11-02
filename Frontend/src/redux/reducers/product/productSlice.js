/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server';

const initialState = {
  productId: '',
  productName: '',
  creationDate: '',
  version: '',
  testPlans: [],
  isLoading: true
};

// ----------------------------------------- Product API
export const getProductById = createAsyncThunk('product/get/byId', async (_, { getState }) => {
  const response = await server().get({
    url: `Product/${getState().product.productId}`
  });
  return response;
});

export const getProductTestPlansById = createAsyncThunk(
  'product/testPlans/get/byId',
  async (_, { getState }) => {
    const response = await server().get({
      url: `Product/${getState().product.productId}/TestPlans`
    });
    return response;
  }
);

export const putProductById = createAsyncThunk('product/put/byId', async (_, { getState }) => {
  const response = await server().put({
    url: `products/${getState().product.productId}`,
    data: {
      name: getState().product.productName
    }
  });
  return response;
});

export const postProduct = createAsyncThunk('product/post', async (productName) => {
  const response = await server().post({
    url: 'products',
    data: {
      name: productName
    }
  });
  return response;
});

// ----------------------------------------- Test Plan API
export const postTestPlan = createAsyncThunk(
  'testPlan/post',
  async (testPlanName, { getState }) => {
    const response = await server().post({
      url: `${getState().product.productId}/TestPlans`,
      data: {
        name: testPlanName
      }
    });
    return response;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload.productId;
    },
    setProductName: (state, action) => {
      state.productName = action.payload.productName;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.fulfilled, (state, action) => {
        const { id, name, creationDate, version } = action.payload;
        state.productId = id;
        state.productName = name;
        state.creationDate = creationDate;
        state.version = version;
      })
      .addCase(getProductById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(getProductTestPlansById.fulfilled, (state, action) => {
        state.testPlans = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductTestPlansById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(putProductById.fulfilled, () => {
        alert('Object changed');
      })
      .addCase(putProductById.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(postProduct.fulfilled, () => {
        alert('product added');
      })
      .addCase(postProduct.rejected, (_, action) => {
        alert(action.error.message);
      })
      .addCase(postTestPlan.fulfilled, () => {
        alert('Test Plan added');
      })
      .addCase(postTestPlan.rejected, (_, action) => {
        alert(action.error.message);
      });
  }
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;
