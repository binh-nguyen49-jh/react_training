import { firebaseStorage } from '../API/firebase';

export default function uploadSingleFile(file) {
  return new Promise(function (resolve, reject) {
    const storageRef = firebaseStorage.ref(
      `${process.env.REACT_APP_FIREBASE_IMAGE_STORAGE}/${file.name}`
    );

    //Upload file
    return storageRef
      .put(file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        resolve(storageRef.getDownloadURL());
      })
      .catch((error) => {
        reject(error);
      });
  });
}
