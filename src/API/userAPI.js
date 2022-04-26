import {
  AUTHENTICATION_ERRORS
} from "./authentication";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore/lite";
import {
  firestoreDB
} from "./firebase";

export default class UserAPI {
  static async getUser(userId) {
    const q = query(collection(firestoreDB, "users"), where("uid", "==", userId));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      throw new Error(AUTHENTICATION_ERRORS.NotExistProfile);
    }
    return docs.docs[0].data();
  }

  static createUser({
    uid,
    name,
    authProvider= "local",
    email,
    position
  }) {
    return addDoc(collection(firestoreDB, "users"), {
      uid,
      name,
      authProvider,
      email,
      position
    });
  }
}