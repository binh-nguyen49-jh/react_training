import { addDoc, collection, getDocs, orderBy, query, where, limit, startAfter } from "firebase/firestore/lite";
import uploadSingleFile from "../utils/uploadImage";
import { firestoreDB } from "./firebase";

export default class PostAPI {
  // create a post document
  static async createPost(postData) {
    const images = postData['images'];
    const image_urls = await Promise.all(
      images.map(image => uploadSingleFile(image))
    );
    const post = {
      image_urls: image_urls,
      ...postData
    };
    delete post['images'];
     
    return addDoc(collection(firestoreDB, "posts"), post);
  }

  // retrieve post from other user id
  static async getPosts(userId, perPage = 10, page = 0) {
    const q = query(
      collection(firestoreDB, "posts"), 
      where("owner_id", "!=", userId),
      orderBy('owner_id', 'createdAt'),
      limit(perPage),
      startAfter(page * perPage)
    );

    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      throw new Error("Post not found");
    }
    return docs.docs.map(doc => doc.data());
  }
}