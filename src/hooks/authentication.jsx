import { firebaseAuth } from '../API/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserAction } from '../redux/users';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUser = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const { payload: userProfile } = await dispatch(
          getUserAction(user.uid)
        );
        setUser(userProfile || false);
      } else {
        setUser(false);
      }
    });
    return () => updateUser();
  }, []);

  const updateProfile = async () => {
    const { payload: userProfile } = await dispatch(getUserAction(user.uid));
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
