import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { KabanItem } from '@/lib/types';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  item: KabanItem;
}

export function Draggable({ id, children, item }: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    // transform
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