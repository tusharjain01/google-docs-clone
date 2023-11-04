import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const AuthContext = createContext();
const provider = new GoogleAuthProvider();
export function useAuth() {
  // console.log(useContext(AuthContext))
  return useContext(AuthContext);
}
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignUp = () => {
    return signInWithPopup(auth,provider);
  }
  const logout = () => {
    return signOut(auth);
  }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        // console.log(user)
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);
  const value = {
    currentUser,
    signUp,
    login,
    googleSignUp,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
