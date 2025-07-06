import { UsersService } from '@gtd/shared/api/generated';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty'

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const session = useSessionContext();

  const { 
    data: user = null, 
    isLoading, 
  } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      try {
        return await UsersService.getCurrentUserUsersMeGet()
      } catch (error: any) {
        if (error.status === 404) {
          navigate({ to: '/user/create' });
          return null;
        } else if (error.status === 401) {
          navigate({ to: '/login' });
          return null;
        } else {
          navigate({ to: '/login' });
          return null;
        }
      } 
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut();
      navigate({ to: '/login' });
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const logout = async (): Promise<void> => {
    logoutMutation.mutate();
  };

  return {
    user,
    isAuthenticated: !!session,
    isLoading,
    logout,
    isLoggingOut: logoutMutation.isPending
  };
}