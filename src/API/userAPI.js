import { AUTHENTICATION_ERRORS } from './authentication';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';
import { firestoreDB } from './firebase';

export default class UserAPI {
  static async getUser(userId) {
    if (!userId) {
      throw new Error(AUTHENTICATION_ERRORS.NOT_EXISTS_PROFILE);
    }
    const q = query(
      collection(firestoreDB, 'users'),
      where('uid', '==', userId)
    );
    const docs = await getDocs(q);
    return docs.docs[0] ? docs.docs[0].data() : null;
  }

  static createUser({ uid, name, authProvider = 'local', email, position }) {
    return addDoc(collection(firestoreDB, 'users'), {
      uid,
      name,
      authProvider,
      email,
      position: position.split(','),
    });
  }
}
