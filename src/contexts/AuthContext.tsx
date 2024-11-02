import { createContext, useContext, ReactNode } from 'react';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import { API_KEYS } from '@/lib/constants';

const AuthContext = createContext<{
  isAuthenticated: boolean;
}>({
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={API_KEYS.clerkPublishable}>
      <SignedIn>
        <AuthContext.Provider value={{ isAuthenticated: true }}>
          {children}
        </AuthContext.Provider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export const useAuth = () => useContext(AuthContext);