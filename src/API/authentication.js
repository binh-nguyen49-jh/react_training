import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseAuth } from './firebase';
import UserAPI from './userAPI';

export const AUTHENTICATION_ERRORS = {
  NOT_EXISTS_PROFILE: 'User profile does not exist',
};

export const logInWithEmail = async (email, password) => {
  const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const user = res.user;
  const userProfile = await UserAPI.getUserData(user.uid);
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
  await UserAPI.createUser({
    uid: res.user.uid,
    name,
    email,
    position,
  });
};
