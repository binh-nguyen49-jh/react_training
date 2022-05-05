import { getDoc } from 'firebase/firestore/lite';
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
