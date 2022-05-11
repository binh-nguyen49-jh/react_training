/* eslint-disable jest/no-conditional-expect */
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestoreDB } from './API/firebase';

test('connect to fire store', async () => {
  const testCollection = collection(firestoreDB, 'testCollection'); // get collection created for testing
  const documents = await getDocs(testCollection);
  const data = documents.docs.map((doc) => doc.data());
  expect(data[0].name).toBe('Binh');
});
