import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseAuth } from './firebase';
import UserAPI from './userAPI';

export const AUTHENTICATION_ERRORS = {
  NotExistProfile: 'User profile does not exist',
  UserNotFound: 'User not found',
};

export const logInWithEmail = async (email, password) => {
  const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const user = res.user;
  const userProfile = await UserAPI.getUser(user.uid);
  return userProfile;
};

export const registerWithEmail = async ({
  name,
  email,
  password,
  position,
}) => {
  const res = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  const user = res.user;
  await UserAPI.createUser({
    uid: res.user.uid,
    name,
    email,
    position,
  });
  return {
    uid: user.uid,
    name,
    email,
    position,
  };
};
