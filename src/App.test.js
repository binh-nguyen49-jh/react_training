import { render, screen } from '@testing-library/react';
import App from './App';
import firebaseApp from './API/firebaseApp';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('connect to fire store', async () => {
  const database = getFirestore(firebaseApp);
  const testCollection = collection(database, 'testCollection'); // get collection created for testing
  const documents = await getDocs(testCollection);
  const data = documents.docs.map(doc => doc.data());
  expect(data[0].name).toBe('Binh');
})
