import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AuthService, UserRead, UsersService } from '@/api/generated';

interface AuthContextType {
  userInfo: UserRead | null;
  saveSessionCookie: (tokenValue: string) => Promise<boolean>;
  getUserInfo: () => Promise<void>;
  logout: () => Promise<void>;
}

const GTD_AUTH_COOKIE_KEY = 'gtd_auth_cookie';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserRead | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const hasCookie = await loadSessionCookie();
        if (hasCookie) {
          await getUserInfo();
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUserInfo(null);
      }
    };
    
    initAuth();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
  }, [userInfo]);

  const loadSessionCookie = async () => {
    const cookie = await AsyncStorage.getItem(GTD_AUTH_COOKIE_KEY);
    if (cookie) {
      axios.defaults.headers.common['Cookie'] = `gtd_auth=${cookie}`;
      return true;
    } else {
      delete axios.defaults.headers.common['Cookie'];
      return false;
    }
  };

  const saveSessionCookie = async (tokenValue: string) => {
    try {
      await AsyncStorage.setItem(GTD_AUTH_COOKIE_KEY, tokenValue);
      axios.defaults.headers.common['Cookie'] = `gtd_auth=${tokenValue}`;
      return true;
    } catch (error) {
      console.error('Error saving auth cookie:', error);
      return false;
    }
  };

  const logout = async () => {
    await AuthService.authSessionLogoutAuthJwtLogoutPost();
    await AsyncStorage.removeItem(GTD_AUTH_COOKIE_KEY);
    axios.defaults.headers.common['Cookie'] = '';
    setUserInfo(null);
  }

  const getUserInfo = async () => {
    try {
      const response = await UsersService.usersCurrentUserUsersMeGet();
      setUserInfo(response);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUserInfo(null);
      await AsyncStorage.removeItem(GTD_AUTH_COOKIE_KEY);
      delete axios.defaults.headers.common['Cookie'];
    }
  }

  return (
    <AuthContext.Provider value={{ userInfo, saveSessionCookie, getUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  