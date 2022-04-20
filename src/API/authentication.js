import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "@firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "@firebase/firestore/dist/lite";
import {
  firebaseAuth,
  firestoreDB
} from "./firebaseApp";

export const AUTHENTICATION_ERRORS = {
    NotExistProfile: "User profile does not exist"
}

export const logInWithEmail = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = res.user;
      const q = query(collection(firestoreDB, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        reject(AUTHENTICATION_ERRORS.NotExistProfile);
      } 
      resolve(docs.docs[0].data()); 
    } catch (err) {
      reject(err)
    }
  })
};

export const registerWithEmail = (name, email, password, position) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = res.user;
      await addDoc(collection(firestoreDB, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        position
      });
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