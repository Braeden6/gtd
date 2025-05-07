import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InboxService } from '@/api/generated';

export function useInboxItems() {
  const queryClient = useQueryClient();

  const { 
    data: items = [], 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['inbox'],
    queryFn: () => InboxService.getUserInboxItemsInboxGet(),
    refetchInterval: 5000000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000000,
  });

  const createMutation = useMutation({
    mutationFn: (content: string) => 
      InboxService.createInboxItemInboxPost({
        content
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => InboxService.deleteInboxItemInboxItemIdDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] });
    },
  });

  const addItem = async (content: string) => {
    if (!content.trim()) return;
    return createMutation.mutateAsync(content);
  };

  const deleteItem = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  return {
    items,
    isLoading,
    isError,
    error,
    addItem,
    deleteItem,
    isAddingItem: createMutation.isPending,
    isDeletingItem: deleteMutation.isPending
  };
}