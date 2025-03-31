import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserInfo } from '../types/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface AuthContextType {
  userInfo: UserInfo | null;
  saveSessionCookie: (tokenValue: string) => Promise<boolean>;
  getUserInfo: () => Promise<void>;
  logout: () => Promise<void>;
}

const GTD_AUTH_COOKIE_KEY = 'gtd_auth_cookie';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      loadSessionCookie();
      getUserInfo();
    } catch {
      setUserInfo(null);
    }
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
    } else {
      throw new Error('No cookie found');
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
    await AsyncStorage.removeItem(GTD_AUTH_COOKIE_KEY);
    axios.defaults.headers.common['Cookie'] = '';
    setUserInfo(null);
  }

  const getUserInfo = async () => {
    const response = await axios.get<UserInfo>(`${process.env.EXPO_PUBLIC_API_URL}/users/me`, { withCredentials: true });
    if (response.status === 200) {
      setUserInfo(response.data);
    } else {
      throw new Error('Failed to get user info');
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
  