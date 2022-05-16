import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '../API/firebase';
import { v4 as uuidv4 } from 'uuid';

export default function uploadSingleFile(file) {
  return new Promise(function (resolve, reject) {
    const storageRef = ref(
      firebaseStorage,
      `${process.env.REACT_APP_FIREBASE_IMAGE_STORAGE}/${uuidv4()}${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file, 'data_url');
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        reject(error);
      },
      async () => {
        const URL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(URL);
      }
    );
  });
}
