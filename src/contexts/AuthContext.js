import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebase'
import ClipLoader from "react-spinners/ClipLoader";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("signed in")
                setCurrentUser(user)
                user.getIdTokenResult().then(idTokenResult => {
                    const last = new Date(idTokenResult.claims.auth_time * 1000);
                    console.log("Last log in ", last.toLocaleString())
                    const now = new Date()
                    const diff = now.getTime() - last.getTime()
                    const sessionDuration = (1000 * 60 * 60 * 8)
                    console.log("logged in for", Math.round(diff / (1000 * 60)), "mins")
                    if (diff >= sessionDuration) {
                        auth.signOut()
                    } else {
                        setTimeout(() => {
                            auth.signOut()
                        }, (sessionDuration - diff))
                    }
                })
            } else {
                setCurrentUser(null)
            }
            setLoading(false)

        })

        return unsubscribe
    }, [])
    const value = {
        currentUser,
        signUp,
        login,
    }
    return (
        <AuthContext.Provider value={value}>
            {loading ? <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <ClipLoader loading={loading} color='#52525b' size={250} />
            </div> : children}
        </AuthContext.Provider>
    )
}