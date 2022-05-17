import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore/lite';
import uploadSingleFile from '../utils/uploadImage';
import { firestoreDB } from './firebase';
import UserAPI from './userAPI';
import UserPostAPI from './userPostAPI';

export default class PostAPI {
  static async createPost(postData) {
    const images = postData['images'];
    const imageUrls = await Promise.all(
      images.map((image) => uploadSingleFile(image))
    );

    const { images: uploadedImages, ...postDataWithoutImages } = postData;
    const post = {
      imageUrls: imageUrls,
      createdAt: Timestamp.fromDate(new Date()),
      ...postDataWithoutImages,
    };

    return addDoc(collection(firestoreDB, 'posts'), post);
  }

  static async getPostDetails(postDoc, userId) {
    const post = postDoc.data();
    const userProfile = await UserAPI.getUserData(post.ownerId);
    post.owner = userProfile;
    post.id = postDoc.id;
    const interaction = await UserPostAPI.getInteractPost(userId, postDoc.id);
    if (interaction) {
      Object.assign(post, interaction);
    } else {
      post.hidden = false;
    }
    const { createdAt, ...postData } = post;
    return {
      createdAt: createdAt.toDate(),
      ...postData,
    };
  }

  constructor(specificUserId) {
    this.lastQueryPosition = null;
    this.specificUserId = specificUserId;
  }

  async getPostsDetails(postDocs, userId) {
    this.lastQueryPosition = postDocs[postDocs.length - 1];
    const posts = await Promise.all(
      postDocs.map((postDoc) => PostAPI.getPostDetails(postDoc, userId))
    );
    return posts;
  }

  async getPosts(userId, limitPerRequest = 10) {
    const queryConstrains = [
      collection(firestoreDB, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limitPerRequest),
    ];

    if (this.lastQueryPosition) {
      queryConstrains.splice(2, 0, startAfter(this.lastQueryPosition));
    }

    if (this.specificUserId) {
      queryConstrains.splice(1, 0, where('ownerId', '==', this.specificUserId));
    }

    const q = query(...queryConstrains);
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      return [];
    }
    return this.getPostsDetails(docs.docs, userId);
  }
}
