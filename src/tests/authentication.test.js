import { logInWithEmail, registerWithEmail } from '../API/authentication';

test('register user', async () => {
  try {
    const userInfo = await registerWithEmail({
      name: 'Binh',
      email: 'test123@gmail.com',
      password: 'testTestTest',
      position: '1',
    });
    expect(userInfo.name).toBe('Binh');
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error.code).toBe('auth/email-already-in-use');
  }
});

test('login user', async () => {
  const userInfo = await logInWithEmail('test123@gmail.com', 'testTestTest');
  expect(userInfo.name).toBe('Binh');
});
