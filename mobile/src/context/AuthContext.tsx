import React, { createContext, useState, useContext, useEffect } from 'react';
import { tokenStorage } from '../utils/auth';
import { AuthTokens, UserInfo } from '../types/auth';
import { getUserInfo } from '../utils/auth';

interface AuthContextType {
  userInfo: UserInfo | null;
  login: (tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
  getValidToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const checkUserInfo = async () => {
      const tokens = await tokenStorage.get();
      if (tokens) {
        const userInfo = await getUserInfo(tokens.accessToken);
        setUserInfo(userInfo);
      }
    };

    checkUserInfo();
  }, []);

  const login = async (tokens: AuthTokens) => {
    try {
      if (!tokens?.accessToken) {
        console.error('Invalid token data:', tokens);
        return;
      }

      await tokenStorage.save(tokens);
      const userInfo = await getUserInfo(tokens.accessToken);
      setUserInfo(userInfo);
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw new Error('Failed to save authentication data');
    }
  };

  const logout = async () => {
    await tokenStorage.clear();
    setUserInfo(null);
  };

  const getValidToken = async () => {
    return tokenStorage.getValidToken(() => setUserInfo(null));
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, getValidToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
