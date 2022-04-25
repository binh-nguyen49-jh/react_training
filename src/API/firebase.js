import { getFirestore } from "firebase/firestore/lite";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "../config/firebase";
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth =  getAuth();
const firestoreDB = getFirestore(firebaseApp);
// Set up for detect ID token revocation
const metadataRef = getDatabase().ref('metadata/' + uid);
metadataRef.set({ revokeTime: utcRevocationTimeSecs }).then(() => {
  console.log('Database updated successfully.');
});
export {firebaseApp, firebaseAuth, firestoreDB};