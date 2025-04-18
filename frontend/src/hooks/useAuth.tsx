import { AuthService } from '@/api/generated';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export function useAuth() {
  const queryClient = useQueryClient();

  const { 
    data: user = null, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(`${import.meta.env.VITE_API_URL}/users/me`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await AuthService.logoutAuthLogoutPost();
      localStorage.removeItem('isAuthenticated');
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const checkAuthStatus = async (): Promise<void> => {
    await refetch();
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    error,
    logout,
    checkAuthStatus,
    isLoggingOut: logoutMutation.isPending
  };
}