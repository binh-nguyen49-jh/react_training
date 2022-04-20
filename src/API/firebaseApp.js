import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;