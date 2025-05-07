import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActionCreate, ActionService } from '@/api/generated';

export function useActionItems() {
  const queryClient = useQueryClient();

  const { 
    data: actions = [], 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['action'],
    queryFn: () => ActionService.getUserActionsActionGet(),
    refetchInterval: 5000000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000000,
  });

  const createMutation = useMutation({
    mutationFn: (action: ActionCreate) => 
      ActionService.createActionActionPost(action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['action'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ActionService.deleteActionActionActionIdDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['action'] });
    },
  });

  const addAction = async (action: ActionCreate) => {
    if (!action.title.trim()) return;
    return createMutation.mutateAsync(action);
  };

  const deleteAction = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  return {
    actions,
    isLoading,
    isError,
    error,
    addAction,
    deleteAction,
    isAddingAction: createMutation.isPending,
    isDeletingAction: deleteMutation.isPending
  };
}