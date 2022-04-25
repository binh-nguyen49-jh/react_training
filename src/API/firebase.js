import { getFirestore } from "firebase/firestore/lite";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import firebaseConfig from "../config/firebase";
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth =  getAuth();
const firestoreDB = getFirestore(firebaseApp);
export {firebaseApp, firebaseAuth, firestoreDB};