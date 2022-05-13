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
      if (user) {
        const userProfile = await UserAPI.getUserData(user.uid);
        setUser(userProfile || false);
      } else {
        setUser(false);
      }
    });
    return () => updateUser();
  }, []);

  const updateProfile = async () => {
    const userProfile = await UserAPI.getUserData(user.uid);
    setUser(userProfile || false);
  };

  const logOut = () => {
    firebaseAuth.signOut();
    setUser(false);
  };

  return {
    user,
    logOut,
    updateProfile,
  };
}
