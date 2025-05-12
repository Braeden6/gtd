import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InboxItemResponseDTO, InboxItemUpdateDTO, InboxService } from '@/api/generated';
import { ItemType, KabanItem } from '@/lib/types';

export function useInboxItems() {
  const queryClient = useQueryClient();

  const { 
    data: items = [], 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['inbox'],
    queryFn: () => InboxService.searchInboxItemsInboxSearchGet(
      undefined,
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      undefined,
      'created_at',
      'desc'
    ),
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

  const updateMutation = useMutation({
    mutationFn: ({ id, item }: { id: string; item: InboxItemUpdateDTO }) => 
      InboxService.updateInboxItemInboxItemIdPut(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] });
    },
  });
  
  const updateItem = async (id: string, item: InboxItemUpdateDTO) => {
    return updateMutation.mutateAsync({ id, item });
  };

  const addItem = async (content: string) => {
    if (!content.trim()) return;
    return createMutation.mutateAsync(content);
  };

  const deleteItem = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  const inboxItemToKabanItem = (item: InboxItemResponseDTO): KabanItem => {
    return {
      id: item.id,
      title: item.content,
      date: item.created_at,
      isNew: item.is_new,
      type: ItemType.INBOX,
    };
  }

  return {
    items,
    kanbanItems: items.map(inboxItemToKabanItem),
    isLoading,
    isError,
    error,
    updateItem,
    addItem,
    deleteItem,
    isAddingItem: createMutation.isPending,
    isDeletingItem: deleteMutation.isPending
  };
}