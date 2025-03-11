import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  is_superuser: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      const response = await axios.get<User>(`${import.meta.env.VITE_API_URL}/users/me`, {
        withCredentials: true,
      });
      
      if (response.status === 200) {
        setUser(response.data);
      } 
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async (): Promise<void> => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/logout`, {}, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};