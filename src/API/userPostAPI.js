import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { firestoreDB } from './firebase';

export default class UserPostAPI {
  static async createUserPostDoc(userId, postId, interactions) {
    return addDoc(collection(firestoreDB, 'userPosts'), {
      userId,
      postId,
      ...interactions,
    });
  }
  static async interactPost(userId, postId, interactions) {
    const q = query(
      collection(firestoreDB, 'userPosts'),
      where('userId', '==', userId),
      where('postId', '==', postId)
    );

    const userPostDoc = await getDocs(q);
    let docId = null;
    if (userPostDoc.docs.length === 0) {
      const userPostRef = await this.createUserPostDoc(userId, postId, {
        hidden: true,
      });
      docId = userPostRef.id;
    } else {
      docId = userPostDoc.docs[0].id;
    }
    const userPostRef = doc(firestoreDB, 'userPosts', docId);
    await updateDoc(userPostRef, {
      ...interactions,
    });
    return userPostRef;
  }
}
