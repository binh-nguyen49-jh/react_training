import UserAPI from '../API/userAPI';
import { asyncActionCreator } from './utils';

// Async thunk for get user
export const { asyncThunk: getUserAction, reducer: getUserReducer } =
  asyncActionCreator({
    thunkName: 'user/get',
    sliceName: 'user/get',
    asyncFunc: async (userId) => {
      const userProfile = await UserAPI.getUserData(userId);
      return userProfile;
    },
    initialData: {},
  });

// Async thunk for update user
export const { asyncThunk: updateUserAction, reducer: updateUserReducer } =
  asyncActionCreator({
    thunkName: 'user/update',
    sliceName: 'user/update',
    asyncFunc: async ({ user, userData }) => {
      const result = await UserAPI.updateUser(user, userData);
      return result;
    },
    initialData: {},
  });
