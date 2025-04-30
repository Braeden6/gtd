import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MousePointerClick } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { useActionItems } from "@/hooks/useActionItems";
import { ActionStatus, Priority as ActionPriority } from "@/api/generated";

type Priority = "High" | "Medium" | "Low";

interface Item {
  id: string;
  content: string;
  priority?: Priority;
  deadline?: string;
  contact?: {
    name: string;
    phone?: string;
  };
}

interface Column {
  id: string;
  title: string;
  color: string;
  items: Item[];
  borderColor: string;
}


const KanbanCard = ({ item, borderColor }: { item: Item, borderColor: string }) => {
  return (
    <div className={`mb-3 bg-secondary border ${borderColor} rounded-lg`}>
      <div className="p-3">
        <p className="text-sm mb-2">{item.content}</p>
        
        {item.deadline && (
          <div className="text-xs text-gray-500 mb-1">
            Deadline: {item.deadline}
          </div>
        )}
        
        {item.contact && (
          <div className="text-xs text-gray-600 mb-1">
            <div>{item.contact.name}</div>
            {item.contact.phone && (
              <div>Phone: {item.contact.phone}</div>
            )}
          </div>
        )}
        
        {item.priority && (
          <div className="flex justify-end mt-1">
            <Badge 
              variant="outline" 
              className={`text-xs ${
                item.priority === "High" 
                  ? "bg-yellow-100 border-yellow-300" 
                  : item.priority === "Medium" 
                  ? "bg-blue-100 border-blue-300" 
                  : "bg-green-100 border-green-300"
              }`}
            >
              Priority: {item.priority}
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}

export default function NextActions() {
  const [board, setBoard] = useState<Column[]>([
    {
      id: "task",
      title: "Task",
      color: "bg-[#7643CF33]",
      borderColor: "border-[#7643CF]",
        items: [
          { id: "task-1", content: "TextTextTextTextTextText", priority: "High" },
          { id: "task-2", content: "TextTextTextTextTextText" },
          { id: "task-3", content: "TextTextTextTextText" },
      ],
    },
    {
      id: "action",
      title: "Action",
      color: "bg-[#ED0C0C33]",
      borderColor: "border-[#ED0C0C]",
      items: [
          // { id: "action-1", content: "TextTextTextTextTextTextTextText", priority: "High" },
        ],
      },
      {
        id: "project",
        title: "Project",
        color: "bg-[#07A60433]",
        borderColor: "border-[#07A604]",
        items: [
          { id: "project-1", content: "TextTextTextTextTextTextTextTextTextText", priority: "High" },
          { id: "project-2", content: "DeadlineDeadlineDeadline", deadline: "2023-12-31", priority: "High" },
        ],
      },
      {
        id: "someday",
        title: "Someday/Maybe",
        color: "bg-[#59340633]",
        borderColor: "border-[#593406]",
        items: [
          { id: "someday-1", content: "TextTextTextTextTextText" },
        ],
      },
      {
        id: "reference",
        title: "Reference",
        color: "bg-[#0B17F333]",
        borderColor: "border-[#0B17F3]",
        items: [
          { id: "reference-1", content: "TextTextTextTextText" },
          { 
            id: "reference-2", 
            content: "Contact information", 
            contact: {
              name: "David, The coach",
              phone: "5047797240"
            }
          },
        ],
      }

  ]);

  const {
    actions,
    addItem,
  } = useActionItems();

  useEffect(() => {
    addItem({
      title: "Test",
      description: "Test",
      priority: ActionPriority.HIGH,
      due_date: new Date().toISOString(),
      status: ActionStatus.PENDING,
    })
  }, [])

  console.log(actions);
  
  const [activeId, setActiveId] = useState<string | null>(null);

  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const findContainer = (id: string) => {
  //   for (const column of board) {
  //     const item = column.items.find(item => item.id === id);
  //     if (item) return column.id;
  //   }

  //   return null;
  // };

  const findItemById = (id: string) => {
    for (const column of board) {
      const item = column.items.find(item => item.id === id);
      if (item) return item;
    }
    return null;
  };

  const removeItem = (id: string) => {
    setBoard(prev => {

      for (const column of board) {
        const item = column.items.find(item => item.id === id);
        if (item) return column.id;
      }


    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    // console.log(active, over);

  }
  

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event)
    const { active, over } = event;

    // console.log(active, over);

    // setBoard(prev => {
      

    //   const activeIndex = activeItems.findIndex(item => item.id === active.id);
      
    // })

  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 pb-4">
        {board.map((column) => {
          return (
            <Droppable 
              key={column.id} 
              id={column.id}
              className="flex-1 min-w-[250px]"
            >
              <div className="pb-2">
                <div className={`flex items-center text-2xl font-medium text-center ${column.color} px-2 py-1`}>
                  <MousePointerClick className="mr-2" size={20} />
                  <span className="flex-1">{column.title}</span>
                </div>
              </div>
              {column.items.map((item) => (
                <Draggable id={item.id}>
                  <KanbanCard key={item.id} item={item} borderColor={column.borderColor} />
                </Draggable>
              ))}

            </Droppable>
          );
        })}
      </div>
      <DragOverlay>
        {activeId ? (
          <KanbanCard 
            item={findItemById(activeId) || { id: '', content: '' }} 
            borderColor="border-gray-400" 
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}