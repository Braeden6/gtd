import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInboxItems } from '@/hooks/useInboxItems';
import { InboxItemsList } from '@/components/InboxItemsList';
import { LoadingScreen } from '@/components/Loading';

export default function NextActions() {
  const [newItem, setNewItem] = useState('');
  const { 
    items, 
    isLoading, 
    addItem, 
    isAddingItem, 
  } = useInboxItems();

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    
    try {
      await addItem(newItem);
      setNewItem('');
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen 
        title="Loading" 
        description="Please wait while we load your inbox..." 
        showProgress={false}
      />
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <p className="text-muted-foreground">{items.length} items</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Add new item..."
          value={newItem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddItem()}
          disabled={isAddingItem}
        />
        <Button 
          onClick={handleAddItem}
          disabled={isAddingItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isAddingItem ? 'Adding...' : 'Add'}
        </Button>
      </div>

      <InboxItemsList />
    </div>
    )
};