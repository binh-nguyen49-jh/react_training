import { asyncActionCreator } from './utils';

// create async thunk of get posts
export const { asyncThunk: getPostsAction, reducer: getPostReducer } =
  asyncActionCreator({
    thunkName: 'posts/getAll',
    sliceName: 'posts/getAll',
    asyncFunc: async ({ postAPI, userId }) => {
      const posts = await postAPI.getPosts(userId);
      return posts;
    },
    initialData: [],
  });
