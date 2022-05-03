import { firebaseAuth } from '../API/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import UserAPI from '../API/userAPI';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}
// For children to use authContext
export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const updateUser = firebaseAuth.onAuthStateChanged(async (user) => {
      const userProfile = await UserAPI.getUser(user.uid);
      console.log('update profile: ', userProfile);
      if (user) {
        setUser(userProfile);
      } else {
        setUser(false);
      }
    });
    return () => updateUser();
  }, []);

  const logOut = () => {
    firebaseAuth.signOut();
    setUser(false);
  };

  return {
    user,
    logOut,
  };
}
