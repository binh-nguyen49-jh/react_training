import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../config/firebase';
import { getStorage } from 'firebase/storage';

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();
const firestoreDB = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export { firebaseApp, firebaseAuth, firestoreDB, firebaseStorage };
