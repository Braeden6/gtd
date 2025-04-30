import { useDroppable } from "@dnd-kit/core";
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

  return (
    <div ref={setNodeRef} className={cn(
        "min-h-[500px] p-2",
        className,
        isOver && "bg-green-500"
    )}>
      {children}
    </div>
  );
}