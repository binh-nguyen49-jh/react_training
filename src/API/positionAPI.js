import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { firestoreDB } from "./firebase";

export const POSITION_ERRORS = {
  NotExistPosition: (positionId) => `This location (${positionId}) is not exist`
}

export default class PositionAPI {
  static async getAllPosition () {
    const docs = await getDocs(collection(firestoreDB, "positions"));
    return docs.docs.map(doc => doc.data());
  }

  static async getPosition (positionId) { 
    const q = query(collection(firestoreDB, "positions"), where("positionId", "==", positionId));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      throw new Error(POSITION_ERRORS.NotExistPosition(positionId));
    }
    return docs.docs[0].data();
  }  
}