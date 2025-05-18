import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InboxItemResponseDTO, InboxService, InboxItemUpdate, BasicComparison } from '@/api/generated';
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
    queryFn: () => InboxService.searchInboxItemsInboxSearchPost({
      processed:{
        value: false,
        option: BasicComparison.EQ
      }
  }),
    refetchInterval: 50000,//1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 50000, //1000
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
    mutationFn: ({ id, item }: { id: string; item: InboxItemUpdate }) => 
      InboxService.updateInboxItemInboxItemIdPut(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] });
    },
  });
  
  const updateItem = async (id: string, item: InboxItemUpdate) => {
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
      type: ItemType.INBOX
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