import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  Timestamp,
  doc,
} from 'firebase/firestore/lite';
import uploadSingleFile from '../utils/uploadImage';
import { firestoreDB } from './firebase';
import UserAPI from './userAPI';
import UserPostAPI from './userPostAPI';

export default class PostAPI {
  static async createPost(postData) {
    const images = postData['images'];
    const image_urls = await Promise.all(
      images.map((image) => uploadSingleFile(image))
    );
    const post = {
      imageUrls: image_urls,
      createdAt: Timestamp.fromDate(new Date()),
      ...postData,
    };
    delete post['images'];

    return addDoc(collection(firestoreDB, 'posts'), post);
  }

  // retrieve others posts
  static async getPosts(userId, skip = 0, limitPerRequest = 10) {
    const q = query(
      collection(firestoreDB, 'posts'),
      // where('ownerId', '!=', userId),
      orderBy('ownerId', 'createdAt'),
      limit(limitPerRequest),
      startAfter(skip)
    );

    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      throw new Error('Posts not found');
    }
    const posts = await Promise.all(
      docs.docs.map(async (postDoc) => {
        const post = postDoc.data();
        const userProfile = await UserAPI.getUser(post.ownerId);
        post.owner = userProfile;
        post.id = postDoc.id;
        const interaction = await UserPostAPI.getInteractPost(userId, postDoc.id);
        if (interaction) {
          Object.assign(post, interaction);
        } else {
          post.hidden = false;
        }
        return post;
      })
    );
    return posts;
  }
}
