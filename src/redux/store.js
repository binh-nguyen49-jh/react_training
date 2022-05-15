import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getPostReducer } from './posts';

const store = configureStore({
  reducer: combineReducers({
    getPosts: getPostReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
