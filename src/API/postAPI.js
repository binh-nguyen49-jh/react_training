import { addDoc, collection, getDocs, orderBy, query, where, limit, startAfter } from "firebase/firestore/lite";
import uploadSingleFile from "../utils/uploadImage";
import { firestoreDB } from "./firebase";

export default class PostAPI {
  static async createPost(postData) {
    const images = postData['images'];
    const image_urls = await Promise.all(
      images.map(image => uploadSingleFile(image))
    );
    const post = {
      imageUrls: image_urls,
      ...postData
    };
    delete post['images'];
     
    return addDoc(collection(firestoreDB, "posts"), post);
  }

  // retrieve others posts
  static async getPosts(userId, perPage = 10, page = 0) {
    const q = query(
      collection(firestoreDB, "posts"), 
      where("ownerId", "!=", userId),
      orderBy('ownerId', 'createdAt'),
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