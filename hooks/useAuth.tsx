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
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { FirebaseErrorCode } from '../constants/firebaseErrorCode';
import { UserDetail } from '../typing';

interface IAuth {
  user: User | null;
  userDetail: UserDetail | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  updateUserDetail: (newUserDetail: UserDetail) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  userDetail: null,
  signUp: async () => false,
  signIn: async () => {},
  forgotPassword: async () => false,
  logout: async () => {},
  updateUserDetail: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setError(null);
  }, [router]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserDetail(user.uid);
        // router.push("/")
      } else {
        setUser(null);
        setUserDetail(null);
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
      addUserDetail(userCredentials.user.uid);
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
      await getUserDetail(userCredentials.user.uid);
      // router.push(userDetail?.hasPaid ? '/browse' : '/');
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
  const forgotPassword = async (email: string) => {
    let status = false;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      status = true;
    } catch (err: any) {
      setError(FirebaseErrorCode[err.code as keyof typeof FirebaseErrorCode]);
      status = false;
    }

    setLoading(false);
    return status;
  };

  const getUserDetail = async (userID: string) => {
    const userDetailsRef = collection(db, 'userDetails');
    const q = query(userDetailsRef, where('userID', '==', userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      console.log(doc.id, ' => ', doc.data());
      console.log(doc);
      setUserDetail({ id: doc.id, ...doc.data() });
    });
  };
  const updateUserDetail = async (newUserDetail: UserDetail) => {
    const { id, hasPaid, planType, signupSlideNumber } = newUserDetail;
    if (!id) {
      console.log('[Update Failed] id is required');
      return;
    }
    const userDetailRef = doc(db, 'userDetails', id);
    setUserDetail(newUserDetail);
    await updateDoc(userDetailRef, {
      hasPaid: hasPaid,
      planType: planType,
      signupSlideNumber: signupSlideNumber,
    });
  };

  const addUserDetail = async (userID: string) => {
    const newData: UserDetail = {
      hasPaid: false,
      planType: 'mobile',
      signupSlideNumber: 3,
      userID,
      // id: docRef.id,
    };
    const docRef = await addDoc(collection(db, 'userDetails'), newData);
    newData.id = docRef.id;
    setUserDetail(newData);
  };

  const memoedValues = useMemo(
    () => ({
      user,
      userDetail,
      loading,
      error,
      signUp,
      signIn,
      logout,
      forgotPassword,
      updateUserDetail,
    }),
    [user, userDetail, loading, error]
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
  const { user, userDetail } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user && userDetail) {
      if (!userDetail.hasPaid) {
        router.push('/signup/' + userDetail.signupSlideNumber);
      }
    }
  }, [user, userDetail, router]);

  return auth;
};

export const useRequireNoAuth = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user && auth.userDetail) {
      if (auth.userDetail.hasPaid) {
        router.push('/browse');
      } else {
        router.push('/');
      }
    }
  }, [auth, router]);

  return auth;
};
export const useRequireWithOrWithoutAuth = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user && auth.userDetail) {
      if (auth.userDetail.hasPaid) {
        router.push('/browse');
      }
    }
  }, [auth, router]);

  return auth;
};
export const useRequireWithAuthAndNoSubscribe = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user && auth.userDetail) {
      if (auth.userDetail.hasPaid) {
        router.push('/browse');
      }
    } else if (!auth.user) {
      router.push('/login');
    }
  }, [auth, router]);

  return auth;
};

// useRequireAuthAndSubscribe
// useRequireNoAuthAndNoSubscribe => login, index,1,2,
// useRequireAuthAndNoSubscribe => index, 2
// useRequireNoSubscribe => index, 1,2,3,4,5

// export const useRequireNoAuth = () => {
//   const router = useRouter();
//   const auth = useAuth();

//   useEffect(() => {
//     if (auth.user) {
//       router.push('/browse');
//     }
//   }, [auth, router]);

//   return auth;
// };
