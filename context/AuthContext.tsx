"use client";

import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect, ReactNode } from "react";

// Create the AuthContext
const AuthContext = React.createContext({});

// Make it easier to access context
export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};
type AuthProps = {
  email: string;
  password: string;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH Handlers
  function signup({ email, password }: AuthProps) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login({ email, password }: AuthProps) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    // Create a listener, listen to authentication state changed
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      try {
        // Set user to local context state
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          console.log("No User Found!");
          return;
        }
        // If user exist, fetch data from firebase db
        console.log("Fetching User Dataset");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData: any = {};

        if (docSnap.exists()) {
          console.log("Found user data :", docSnap);
          firebaseData = docSnap.data();
          console.log(firebaseData);
        }
        setUserDataObj(firebaseData);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // Global context state
  const value = {
    currentUser,
    setUserDataObj,
    userDataObj,
    signup,
    logout,
    login,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
