import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  firebaseAuth,
} from "./firebase";
import {
  createContext
} from "react";

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
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const updateUser = firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        setUser(user);
        
        user.getIdToken(false).then(idToken => {
          setIdToken(idToken);
        }).catch(error => {
          setIdToken(null);
        });
      } else {
        setUser(null);
        setIdToken(null);
      }
    });
    return () => updateUser();
  }, []);

  const logInWithEmail = (email, password) => {
      try {
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = res.user;
        setUser(user);
      } catch (err) {
        setUser(null);
      }
  };

  const registerWithEmail = ({
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
        setUser(null);
      }
  };

  const logOut = () => {
    firebaseAuth.signOut();
    setUser(null);
  };

  return {
    user,
    idToken,
    logInWithEmail,
    registerWithEmail,
    logOut
  };
}
