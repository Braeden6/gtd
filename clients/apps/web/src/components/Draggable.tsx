import { useDraggable } from '@dnd-kit/core';
import { type KabanItem } from '@/lib/types';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  item: KabanItem;
}

export function Draggable({ id, children, item }: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef
  } = useDraggable({ 
    id,
    data: {
      ...item  
    }
   });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}