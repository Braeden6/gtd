import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { InboxService } from '@/api/generated/services/InboxService';
// import { domain_InboxItem } from '@/api/generated/models/domain_InboxItem';

export default function Inbox() {
  const [newItem, setNewItem] = useState('');
  // const queryClient = useQueryClient();

  // const { data: items = [], isLoading } = useQuery({
  //   queryKey: ['inbox'],
  //   queryFn: () => InboxService.getInbox(),
  // });

  // const createMutation = useMutation({
  //   mutationFn: (content: string) => 
  //     InboxService.postInbox({
  //       content,
  //       capture_type: 'manual',
  //       processed: false,
  //     } as domain_InboxItem),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['inbox'] });
  //   },
  // });

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => InboxService.deleteInbox(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['inbox'] });
  //   },
  // });

  const addItem = async () => {
    if (!newItem.trim()) return;
    
    try {
      // await createMutation.mutateAsync(newItem);
      setNewItem('');
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="p-6 max-w-4xl mx-auto">
  //       <div className="flex justify-center items-center h-32">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        {/* <p className="text-muted-foreground">{items.length} items</p> */}
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Add new item..."
          value={newItem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()}
          // disabled={createMutation.isPending}
        />
        <Button 
          onClick={addItem}
          // disabled={createMutation.isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          {/* {createMutation.isPending ? 'Adding...' : 'Add'} */}
        </Button>
      </div>

      <div className="space-y-2">
        {/* {items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p>{item.content}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(item.created_at || '').toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Type: {item.capture_type} | 
                  Status: {item.processed ? 'Processed' : 'Unprocessed'}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteMutation.mutate(item.id || '')}
                disabled={deleteMutation.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}