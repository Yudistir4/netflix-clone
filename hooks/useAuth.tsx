import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { auth } from '../firebase';
import { useRouter } from 'next/router';

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false
})


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [initLoading, setInitLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                router.push("/")
            } else {
                setUser(null)
                // router.push("/")
            }
            setInitLoading(false)

        })
    }, [auth])

    const signUp = async (email: string, password: string) => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password).then(userCredentials => { setUser(userCredentials.user); router.push("/login") }).catch(err => setError(err.message))
        setLoading(false)
    }
    const signIn = async (email: string, password: string) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, email, password).then(userCredentials => { setUser(userCredentials.user); router.push("/") }).catch(err => setError(err.message))
        setLoading(false)
    }
    const logout = async () => {
        setLoading(true)
        await signOut(auth).then(() => { setUser(null); router.push("/login") }).catch(err => setError(err.message))
        setLoading(false)
    }


    const memoedValues = useMemo(() => ({ user, loading, error, signUp, signIn, logout }), [user, loading, error])

    return <AuthContext.Provider value={memoedValues}>{!initLoading && children} </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)



export default useAuth