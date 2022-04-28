import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebaseStorage } from '../API/firebase';

export default function uploadSingleFile(file) {
  return new Promise(function (resolve, reject) {
    const storageRef = ref(
      firebaseStorage,
      `${process.env.REACT_APP_FIREBASE_IMAGE_STORAGE}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file, 'data_url');
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          resolve(URL);
        });
      }
    );
  });
}
