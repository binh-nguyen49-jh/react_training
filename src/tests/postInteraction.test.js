import { collection, getDoc, getDocs, query, updateDoc } from 'firebase/firestore/lite';
import { firestoreDB } from '../API/firebase';
import UserPostAPI from '../API/userPostAPI';

test('user interact with a post', async () => {
  const userId = 'test_uid';
  const postId = 'test_post_id';
  const interactions = {
    hidden: true,
  };
  const userPostRef = await UserPostAPI.interactPost(
    userId,
    postId,
    interactions
  );
  const updatedDoc = await getDoc(userPostRef);
  expect(updatedDoc.data().hidden).toBe(true);
});

test('user update the interaction with a post', async () => {
  const userId = 'test_uid';
  const postId = 'test_post_id';
  const interactions = {
    hidden: false,
  };
  const userPostRef = await UserPostAPI.interactPost(
    userId,
    postId,
    interactions
  );
  const updatedDoc = await getDoc(userPostRef);
  expect(updatedDoc.data().hidden).toBe(false);
});

test('update user schema', async () => {
  // get all use docs
  const q = query(collection(firestoreDB, 'users'));
  const docs = await getDocs(q);
  await Promise.all(
    docs.docs.map((doc) => {
      updateDoc(doc.ref, {
        highlightImages: {},
      });
    })
  );
});
