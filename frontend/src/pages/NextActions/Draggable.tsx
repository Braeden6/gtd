import React from 'react';
import { useDraggable } from '@dnd-kit/core';
interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    // transform
  } = useDraggable({ id });

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