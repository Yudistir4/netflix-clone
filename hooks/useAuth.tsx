import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import { FirebaseErrorCode } from '../constants/firebaseErrorCode';

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => false,
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('calling');
      if (user) {
        setUser(user);
        console.log(user);
        // router.push("/")
      } else {
        setUser(null);
        // router.push('/');
      }
      setInitLoading(false);
    });
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    let errStatus = false;
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      setError(null);
    } catch (err: any) {
      setError(FirebaseErrorCode[err.code as keyof typeof FirebaseErrorCode]);
      errStatus = true;
    }
    setLoading(false);
    return errStatus;
  };
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      setError(null);
      router.push('/browse');
    } catch (err: any) {
      setError(FirebaseErrorCode[err.code as keyof typeof FirebaseErrorCode]);
    }
    setLoading(false);
  };
  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
        router.push('/login');
      })
      .catch((err) => setError(err.message));
    setLoading(false);
  };

  const memoedValues = useMemo(
    () => ({ user, loading, error, signUp, signIn, logout }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValues}>
      {!initLoading && children} {/* {children}{' '} */}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;

export const useRequireAuth = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
  }, [auth, router]);

  return auth;
};

export const useRequireNoAuth = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      router.push('/browse');
    }
  }, [auth, router]);

  return auth;
};
