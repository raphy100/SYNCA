'use client';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// ----------------------------------------------------------------------

// NOTE: It is safe to expose this configuration to the client
// It does not include any sensitive information.
// See: https://firebase.google.com/docs/web/setup#safe-to-include-in-code

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

/**
 * Initializes a Firebase app but only if it hasn't been initialized already.
 *
 * This is a private function that should not be used directly.
 *
 * @returns {{
 *  firebaseApp: FirebaseApp;
 *  auth: Auth;
 *  firestore: Firestore;
 * }}
 */
function _getFirebase() {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  }

  return { firebaseApp, auth, firestore };
}

// ----------------------------------------------------------------------

export type FirebaseContextValue = {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

type FirebaseProviderProps = {
  children: ReactNode;
};

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);

  useEffect(() => {
    const { firebaseApp, auth, firestore } = _getFirebase();
    setApp(firebaseApp);
    setAuth(auth);
    setFirestore(firestore);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      app,
      auth,
      firestore,
    }),
    [app, auth, firestore]
  );

  return (
    <FirebaseContext.Provider value={memoizedValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

// ----------------------------------------------------------------------

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }

  return context;
};

export const useFirebaseApp = () => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }

  return context.app;
};

export const useAuth = () => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }

  return context.auth;
};

export const useFirestore = () => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirestore must be used within a FirebaseProvider');
  }

  return context.firestore;
};
