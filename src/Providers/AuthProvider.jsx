import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const auth = getAuth(app)
export const AuthContext = createContext()



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isNight, setIsNight] = useState(false)

    console.log(user);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                const user = { email: currentUser.email, name: currentUser.displayName }
                axios.post('https://couture-camp-server.vercel.app/jwt', user)
                    .then((res) => {
                        localStorage.setItem('access-token', res.data.token)
                    })
            }
            else {
                setUser(null)
                localStorage.removeItem('access-token')
            }
        })
        return () => { unsubscribe() }
    }, [])

    function toggleTheme() {
        setIsNight(!isNight)
        const htmlTag = document.getElementById('htmlTag');

        if (isNight) {
            htmlTag.removeAttribute('data-theme')
        }
        else {
            htmlTag.setAttribute('data-theme', 'night');
        }
    }

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        logOut,
        toggleTheme,
        isNight
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;