import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

// Define user type
interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  is_superuser: boolean;
  [key: string]: any; // For any additional fields
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

// Create the authentication context with default values
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is authenticated on component mount
  const checkAuthStatus = async (): Promise<void> => {
    try {
      // Make a request to your backend to check authentication status
      const response = await axios.get<User>('http://localhost:8000/users/me', {
        withCredentials: true, // Important for sending cookies
      });
      
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      // If request fails, user is not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle login state after redirect from OAuth provider
  useEffect(() => {
    // Check if we were just redirected from auth flow
    // This could be determined by URL parameters or a specific path
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');
    
    if (authSuccess === 'true') {
      // Clear the URL parameter without causing a navigation
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Refresh auth status
      checkAuthStatus();
    }
  }, []);

  const logout = async (): Promise<void> => {
    try {
      await axios.post('http://localhost:8000/auth/logout', {}, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Expose the context value
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};