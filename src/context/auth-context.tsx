
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface UserProfile {
  uid: string;
  email: string | null;
  role: 'admin' | 'employee';
  status: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
            const userData = userDoc.data();
            // Only set user if they are approved
            if (userData.status === 'approved') {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    role: userData.role || 'employee',
                    status: userData.status
                });
            } else {
                // User is pending or rejected, sign them out client-side
                await auth.signOut();
                setUser(null);
            }
            } else {
            // Handle case where user exists in Auth but not in Firestore
            await auth.signOut();
            setUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch user document, possibly due to network issues:", error);
            // If we can't fetch the doc (e.g., offline), sign out to prevent inconsistent state
            await auth.signOut();
            setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
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
