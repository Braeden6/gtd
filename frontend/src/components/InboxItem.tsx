import { InboxItemResponse } from '@/api/generated';
import { Button } from '@/components/ui/button';

type InboxItemProps = {
  item: InboxItemResponse;
  onDelete: (id: string) => void;
  isDeletingItem: boolean;
};

export const InboxItem = ({ item, onDelete, isDeletingItem }: InboxItemProps) => (
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
            {item.audio_path ? 'Has audio ' : 'No audio '} | 
            {item.image_path ? ' Has image' : ' No image'}
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(item.id || '')}
          disabled={isDeletingItem}
        >
          Delete
        </Button>
      </div>
    </div>
  );