import { useDndContext, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Droppable({ id, children, className }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
      id,
  });
  const { active } = useDndContext();
  const shouldHighlight = isOver && (!active || active.data.current?.type !== id);
  
  return (
    <div ref={setNodeRef} className={cn(
        "min-h-[500px] p-2",
        className,
        shouldHighlight && "bg-green-500"
    )}>
      {children}
    </div>
  );
}