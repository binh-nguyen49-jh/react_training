import PostAPI from '../API/postAPI';
import { asyncActionCreator } from './utils';

// Async thunk for get posts
export const { asyncThunk: getPostsAction, reducer: getPostsReducer } =
  asyncActionCreator({
    thunkName: 'posts/getAll',
    sliceName: 'posts/getAll',
    asyncFunc: async ({ postAPI, userId }) => {
      const posts = await postAPI.getPosts(userId);
      return posts;
    },
    initialData: [],
  });

// Async thunk for create post
export const { asyncThunk: createPostAction, reducer: createPostReducer } =
  asyncActionCreator({
    thunkName: 'posts/create',
    sliceName: 'posts/create',
    asyncFunc: async (postData) => {
      const result = await PostAPI.createPost(postData);
      return result;
    },
    initialData: [],
  });
