import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getPostsReducer, createPostReducer } from './posts';

const store = configureStore({
  reducer: combineReducers({
    getPosts: getPostsReducer,
    createPost: createPostReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
