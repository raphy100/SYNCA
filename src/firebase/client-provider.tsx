'use client';

import { FirebaseProvider } from '@/firebase/provider';
import type { ReactNode } from 'react';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  return <FirebaseProvider>{children}</FirebaseProvider>;
}
