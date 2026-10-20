// apps/tutor/src/lib/auth.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { clearStoredSession, getProfile, getStoredSession, isAccessTokenExpired, login as apiLogin, logout as apiLogout } from "./api";

export interface User {
  id?: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role?: string;
  avatar?: string;
  bio?: string;
  headline?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  expertise?: string;
  experience?: string;
  momo_number?: string;
  momo_provider?: string;
  bank_name?: string;
  bank_account?: string;
  bank_account_name?: string;
  avg_rating?: number;
  total_students?: number;
  total_revenue?: number;
  total_courses?: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string, keepSignedIn?: boolean) => Promise<any>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const session = getStoredSession();
      if (!session?.access || (isAccessTokenExpired(session.access) && !session.refresh)) {
        clearStoredSession();
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error('Failed to load user profile:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string, keepSignedIn = true) => {
    const session = await apiLogin(email, password, keepSignedIn);
    try {
      const profile = await getProfile();
      if (!profile) {
        throw new Error("Sign-in succeeded, but your tutor profile could not be loaded.");
      }
      setUser(profile);
    } catch (error) {
      clearStoredSession();
      setUser(null);
      throw error;
    }
    return session;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    // Force reload to clear all state
    window.location.href = '/tutor';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
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