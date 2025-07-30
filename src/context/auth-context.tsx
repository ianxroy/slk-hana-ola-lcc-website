
"use client";

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { User } from 'firebase/auth';

interface UserProfile {
  uid: string;
  email: string | null;
  fullName: string;
  role: 'admin' | 'employee';
  status: 'pending' | 'approved' | 'rejected';
  photoURL?: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, authLoading, authError] = useAuthState(auth);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = React.useState(true);

  useEffect(() => {
    if (authError) {
      console.error("Firebase Auth Error:", authError);
    }
  }, [authError]);
  
  useEffect(() => {
    if (firebaseUser) {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const unsubscribe = onSnapshot(userDocRef, async (userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // We only set the profile if they are approved.
          // The login page handles redirecting pending/rejected users.
          // This prevents a logged-in but unapproved user from accessing authenticated routes.
          if (userData.status === 'approved') {
            setUserProfile({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: userData.role || 'employee',
                status: userData.status,
                fullName: userData.fullName || 'User',
                photoURL: firebaseUser.photoURL
            });
          } else {
            // User is not approved, so sign them out client-side as a safeguard.
            await auth.signOut();
            setUserProfile(null);
          }
        } else {
            // This can happen briefly after registration before the doc is created.
            // Await a bit, but if it's still not there, sign out.
            setTimeout(async () => {
                const checkAgain = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (!checkAgain.exists()) {
                    await auth.signOut();
                    setUserProfile(null);
                }
            }, 1000);
        }
        setProfileLoading(false);
      }, (error) => {
          console.error("Firestore snapshot error:", error);
          auth.signOut();
          setUserProfile(null);
          setProfileLoading(false);
      });

      return () => unsubscribe();
    } else {
      setUserProfile(null);
      setProfileLoading(false);
    }
  }, [firebaseUser]);

  const logout = async () => {
    await auth.signOut();
    setUserProfile(null);
  };
  
  const loading = authLoading || profileLoading;

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user: userProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
