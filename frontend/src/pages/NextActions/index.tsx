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
import { useProjectItems } from "@/hooks/useProjectItems";
import { useInboxItems } from "@/hooks/useInboxItems";

// type Priority = "High" | "Medium" | "Low";

interface Item {
  id: string;
  content: string;
}


const KanbanCard = ({ item, borderColor }: { item: Item, borderColor: string }) => {
  return (
    <div className={`mb-3 bg-secondary border ${borderColor} rounded-lg`}>
      <div className="p-3">
        <p className="text-sm mb-2">{item.content}</p>
        
        {/* {item.deadline && (
          <div className="text-xs text-gray-500 mb-1">
            Deadline: {item.deadline}
          </div>
        )} */}
        
        {/* {item.priority && (
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
        )} */}
      </div>
    </div>
  )
}

export default function NextActions() {


  //       id: "someday",
  //       title: "Someday/Maybe",
  //       color: "bg-[#59340633]",
  //       borderColor: "border-[#593406]",

  //       id: "reference",
  //       title: "Reference",
  //       color: "bg-[#0B17F333]",
  //       borderColor: "border-[#0B17F3]",

  const {
    items,
    addItem,
  } = useInboxItems();

  const {
    actions,
    addAction,
  } = useActionItems();

  const {
    projects,
    addProject,
  } = useProjectItems();
  
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
    console.log(id);
    // for (const column of board) {
    //   const item = column.items.find(item => item.id === id);
    //   if (item) return item;
    // }
    // return null;
  };

  // const removeItem = (id: string) => {
  //   setBoard(prev => {

  //     for (const column of board) {
  //       const item = column.items.find(item => item.id === id);
  //       if (item) return column.id;
  //     }


  //   })
  // }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // const { active, over } = event;

    // console.log(active, over);

  }
  

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event)
    // const { active, over } = event;

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
        <Droppable 
          key="inbox" 
          id="inbox"
          className="flex-1 min-w-[250px]"
        >
          <div className="pb-2">
            <div className={`flex items-center text-2xl font-medium text-center bg-[#7643CF33] px-2 py-1`}>
              <MousePointerClick className="mr-2" size={20} />
              <span className="flex-1">Inbox</span>
            </div>
          </div>
          {items.map((item) => (
            <Draggable id={item.id}>
              <KanbanCard key={item.id} item={item} borderColor="border-[#7643CF]" />
            </Draggable>
          ))}
        
      </Droppable>

      <Droppable 
          key="action" 
          id="action"
          className="flex-1 min-w-[250px]"
        >
          <div className="pb-2">
            <div className={`flex items-center text-2xl font-medium text-center bg-[#ED0C0C33] px-2 py-1`}>
              <MousePointerClick className="mr-2" size={20} />
              <span className="flex-1">Action</span>
            </div>
          </div>
          {actions.map((item) => (
            <Draggable id={item.id}>
              <KanbanCard key={item.id} item={{
                id: item.id,
                content: item.title,
              }} borderColor="border-[#ED0C0C]" />
            </Draggable>
          ))}
      </Droppable>

      <Droppable 
          key="project" 
          id="project"
          className="flex-1 min-w-[250px]"
        >
          <div className="pb-2">
            <div className={`flex items-center text-2xl font-medium text-center bg-[#07A60433] px-2 py-1`}>
              <MousePointerClick className="mr-2" size={20} />
              <span className="flex-1">Project</span>
            </div>
          </div>
          {projects.map((item) => (
            <Draggable id={item.id}>
              <KanbanCard key={item.id} item={{
                id: item.id,
                content: item.title,
              }} borderColor="border-[#07A604]" />
            </Draggable>
          ))}
      </Droppable>


      </div>
      <DragOverlay>
        {/* {activeId ? (
          <KanbanCard 
            item={findItemById(activeId) || { id: '', content: '' }} 
            borderColor="border-gray-400" 
          />
        ) : null} */}
      </DragOverlay>
    </DndContext>
  );
}