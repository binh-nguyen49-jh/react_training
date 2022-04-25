import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  firebaseAuth,
} from "../API/firebase";
import {
  createContext, useContext, useEffect, useState
} from "react";
import UserAPI from "../API/userAPI";

const authContext = createContext();

export function AuthProvider({
  children
}) {
  const auth = useFirebaseAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

// For children to use authContext
export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const updateUser = firebaseAuth.onAuthStateChanged(async user => {
        console.log("update: ", user)
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => updateUser();
  }, []);

  const logInWithEmail = async (email, password) => {
      try {
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = res.user;
        setUser(user);
      } catch (err) {
        setUser(false);
      }
  };

  const registerWithEmail = async ({
    name,
    email,
    password,
    position
  }) => {
      try {
        const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = res.user;
        await UserAPI.createUser({
          uid: res.user.uid,
          name,
          email,
          position
        })
        setUser(user);
      } catch (err) {
        setUser(false);
      }
  };

  const logOut = () => {
    firebaseAuth.signOut();
    setUser(false);
  };

  return {
    user,
    logInWithEmail,
    registerWithEmail,
    logOut
  };
}
