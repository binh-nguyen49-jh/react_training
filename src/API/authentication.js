import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  firebaseAuth,
} from "./firebase";
import UserAPI from "./userAPI";

export const AUTHENTICATION_ERRORS = {
    NotExistProfile: "User profile does not exist"
}

export const logInWithEmail = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = res.user;
      const userProfile = UserAPI.getUser(
        user.uid
      )
      resolve(userProfile); 
    } catch (err) {
      reject(err)
    }
  })
};

export const registerWithEmail = ({name, email, password, position}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = res.user;
      await UserAPI.createUser({
        uid: res.user.uid,
        name,
        email,
        position
      })
      resolve({
        uid: user.uid,
        name,
        email,
        position
      })
    } catch (err) {
      reject(err)
    }
  })
};