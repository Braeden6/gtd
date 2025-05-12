import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActionCreate, ActionResponse, ActionService } from '@/api/generated';
import { ItemType, KabanItem } from '@/lib/types';

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

  const actionItemToKabanItem = (item: ActionResponse): KabanItem => {
    return {
      id: item.id,
      title: item.title,
      priority: item.priority,
      date: item.due_date,
      type: ItemType.ACTION,
    };
  } 
  


  return {
    actions,
    kanbanActions: actions.map(actionItemToKabanItem),
    isLoading,
    isError,
    error,
    addAction,
    deleteAction,
    isAddingAction: createMutation.isPending,
    isDeletingAction: deleteMutation.isPending
  };
}