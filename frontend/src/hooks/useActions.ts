import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActionCreate, ActionResponse, ActionService, ActionStatus, ActionUpdate, BasicComparison } from '@/api/generated';
import { ItemType, KabanItem } from '@/lib/types';

const QUERY_CLIENT_KEY = 'action';

export function useActions() {
  const queryClient = useQueryClient();

  const { 
    data: actions = [], 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['action'],
    queryFn: () => ActionService.searchActionsActionSearchPost({
      status: {
        value: ActionStatus.COMPLETED,
        option: BasicComparison.NE
      }
    }),
    refetchInterval: 5000000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000000,
  });

  const createMutation = useMutation({
    mutationFn: (action: ActionCreate) => 
      ActionService.createActionActionPost(action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ActionService.deleteActionActionActionIdDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: ActionUpdate }) => 
      ActionService.updateActionActionActionIdPut(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEY] });
    },
  });

  const addAction = async (action: ActionCreate) => {
    if (!action.title.trim()) return;
    return createMutation.mutateAsync(action);
  };

  const deleteAction = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  const actionToKabanItem = (action: ActionResponse): KabanItem => {
    return {
      id: action.id,
      title: action.title,
      priority: action.priority,
      date: action.due_date,
      type: ItemType.ACTION,
    };
  } 

  const updateAction = async (id: string, action: ActionUpdate) => {
    return updateMutation.mutateAsync({ id, action });
  };
  
  return {
    actions,
    kanbanActions: actions.map(actionToKabanItem),
    isLoading,
    isError,
    error,
    addAction,
    deleteAction,
    updateAction,
    isAddingAction: createMutation.isPending,
    isDeletingAction: deleteMutation.isPending
  };
}