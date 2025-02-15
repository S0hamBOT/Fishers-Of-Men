import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          name: email.split("@")[0], // Use part before @ as default name
          createdAt: new Date(),
          problemProgress: {},
          problemNotes: {},
        });
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw new Error(error.message || "Failed to sign in");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Create initial user document
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        name: email.split("@")[0], // Use part before @ as default name
        createdAt: new Date(),
        problemProgress: {},
        problemNotes: {},
      });
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw new Error(error.message || "Failed to create account");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error("Sign out error:", error);
      throw new Error(error.message || "Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
