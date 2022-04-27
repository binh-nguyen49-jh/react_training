/* eslint-disable jest/no-conditional-expect */
import { collection, getDoc, getDocs } from 'firebase/firestore/lite';
import { firestoreDB } from './API/firebase';
import PositionAPI from './API/positionAPI';
import { logInWithEmail, registerWithEmail } from './API/authentication';
import PostAPI from './API/postAPI';
import UserPostAPI from './API/userPostAPI';

test('connect to fire store', async () => {
  const testCollection = collection(firestoreDB, 'testCollection'); // get collection created for testing
  const documents = await getDocs(testCollection);
  const data = documents.docs.map((doc) => doc.data());
  expect(data[0].name).toBe('Binh');
});
/*
test('get all position documents', async () => {
  const data = await PositionAPI.getAllPosition();
  expect(typeof data).toBe('object');
})


test('get a position', async () => {
  const data = await PositionAPI.getPosition(1);
  expect(data.name).toBe('FE Developer');
})

test('register user', async () => {
  try {
    const userInfo = await registerWithEmail({
      name: 'Binh',
      email: 'test123@gmail.com',
      password: 'testTestTest',
      position: '1'
    });
    console.log(userInfo)
    expect(userInfo.name).toBe('Binh');  
  } catch (error) {
    expect(error.code).toBe('auth/email-already-in-use');
  }
})

test('login user', async () => {
  const userInfo = await logInWithEmail('test123@gmail.com', 'testTestTest');
  expect(userInfo.name).toBe('Binh');
})

test('get posts', async () => {
  const data = await PostAPI.getPosts('test_uid');
  expect(data.length).toBe(1);
});

test('upload posts', async () => {
  const doc = await PostAPI.createPost({
    ownerId: 'test_uid',
    text: 'test title',
    images: []
  });
  expect(doc.type).toBe('document');
});
*/

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
