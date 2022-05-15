import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ASYNC_STATUS } from '../config/constants';

export const asyncActionCreator = ({
  thunkName,
  sliceName,
  asyncFunc,
  initialData,
}) => {
  const asyncThunk = createAsyncThunk(thunkName, asyncFunc);

  const asyncSlice = createSlice({
    name: sliceName,
    initialState: { data: initialData, status: ASYNC_STATUS.IDLE },
    reducers: {},
    extraReducers: {
      [asyncThunk.pending]: (state, action) => {
        state.status = ASYNC_STATUS.PENDING;
      },
      [asyncThunk.fulfilled]: (state, action) => {
        state.status = ASYNC_STATUS.SUCCESS;
        state.data = action.payload;
      },
      [asyncThunk.rejected]: (state, action) => {
        state.status = ASYNC_STATUS.ERROR;
        state.error = action.error;
      },
    },
  });

  const { reducer } = asyncSlice;
  return { asyncThunk, reducer };
};
