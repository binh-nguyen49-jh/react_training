import { AUTHENTICATION_ERRORS } from './authentication';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { firestoreDB } from './firebase';
import {
  convertFormattedDateToDate,
  convertFormImagesToObject,
  convertFormStateToObject,
  convertToTimestamp,
  isUploadedByUser,
  uploadImages,
} from '../utils/formUtils';
import uploadSingleFile from '../utils/uploadImage';

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
    return docs.docs[0];
  }
  static async getUserData(userId) {
    const userDoc = await UserAPI.getUser(userId);
    return userDoc ? userDoc.data() : null;
  }

  static async getUserRef(userId) {
    const userDoc = await UserAPI.getUser(userId);
    return userDoc ? userDoc.ref : null;
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

  static updateUser = async (
    user,
    { highlightImages, name, bio, status, avatar, dob, position }
  ) => {
    // just get the photos that are not uploaded by user ()
    const uploadedHighlightImages = await uploadImages(highlightImages.value);

    const updatedUser = { ...user };
    updatedUser.highlightImages = uploadedHighlightImages;

    if (isUploadedByUser(avatar.value)) {
      const uploadedAvatar = await uploadSingleFile(avatar.value.photo);
      updatedUser.avatar = uploadedAvatar;
    }
    Object.assign(updatedUser, {
      ...convertFormStateToObject({
        name,
        bio,
        status,
      }),
      dob: convertToTimestamp(convertFormattedDateToDate(dob.value)),
      position: position.value.split(', '),
    });
    const userRef = await this.getUserRef(updatedUser.uid);
    await updateDoc(userRef, updatedUser);
  };
}
