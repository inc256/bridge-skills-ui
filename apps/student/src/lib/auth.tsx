// apps/student/src/lib/auth.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getProfile, login as apiLogin, logout as apiLogout } from "./api";

interface User {
  id?: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
    
    const loadUser = async () => {
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

  const login = async (email: string, password: string) => {
    const session = await apiLogin(email, password);
    try {
      const profile = await getProfile();
      setUser(profile);
      return session;
    } catch (error) {
      console.error('Failed to load profile after login:', error);
      return session;
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  // During SSR, render with default values
  // This prevents the "useAuth must be used within AuthProvider" error during SSR
  if (!isClient) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          setUser: () => {},
          login: async () => ({}),
          logout: async () => {},
          isLoading: false,
          isAuthenticated: false,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

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
    // During SSR, return a default context instead of throwing
    if (typeof window === 'undefined') {
      return {
        user: null,
        setUser: () => {},
        login: async () => ({}),
        logout: async () => {},
        isLoading: false,
        isAuthenticated: false,
      };
    }
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}