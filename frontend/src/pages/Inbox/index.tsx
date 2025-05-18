import { useState } from "react";
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
  DragEndEvent
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useActionItems } from "@/hooks/useActionItems";
import { useProjectItems } from "@/hooks/useProjectItems";
import { useInboxItems } from "@/hooks/useInboxItems";
import KanbanCard from "@/components/KanbanCard";
import { KabanColumn } from "@/components/KandanColumn";
import { ItemType, KabanItem } from "@/lib/types";
import { useViewInbox } from "@/hooks/popover/useViewInbox";
import ViewInbox from "@/components/popovers/ViewInbox";
import { PopoverType, useAction } from "@/hooks/popover/useAction";
import ActionPopover from "@/components/popovers/Action";

export default function Inbox() {
  const { items, updateItem, kanbanItems } = useInboxItems();
  const { kanbanActions } = useActionItems();
  const { kanbanProjects } = useProjectItems();
  const { setPopoverOpen, setPopoverItem } = useViewInbox();
  const { setPopover: setActionPopover } = useAction();
  const [activeItem, setActiveItem] = useState<KabanItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findItemById = (id: string): KabanItem | null => {
    const inboxItem = kanbanItems.find(item => item.id === id);
    if (inboxItem) {
      return inboxItem;
    }
    
    const actionItem = kanbanActions.find(item => item.id === id);
    if (actionItem) {
      return actionItem;
    }

    const projectItem = kanbanProjects.find(item => item.id === id);
    if (projectItem) {
      return projectItem;
    }
    
    return null;
  };

  const handleDragStart = async (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(findItemById(active.id as string));
  };

  const handleInboxItemClick = (id: string) => {
    const inboxItem = items.find(item => item.id === id);
    if (inboxItem) {  
      if (inboxItem.is_new) {
        updateItem(id, {
          is_new: false
        })
      }
      setPopoverItem(inboxItem);
      setPopoverOpen(true);
    }
  }

  const handleInboxItemToAction = (id: string) => {
    const inboxItem = items.find(item => item.id === id);
    if (inboxItem) {
      if (inboxItem.is_new) {
        updateItem(id, {
          is_new: false
        })
      }
      setPopoverItem(inboxItem);
      setActionPopover({
        isOpen: true,
        type: PopoverType.CREATE,
        item: {}
      });
    }
  }

  const handleActionClick = (id: string) => {
    const actionItem = kanbanActions.find(item => item.id === id);
    const inboxItem = items.find(item => item.action_id === id);
    if (actionItem) {
      setPopoverItem(inboxItem || null);
      setActionPopover({
        isOpen: true,
        type: PopoverType.EDIT,
        item: actionItem
      });
    }
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    const source = activeItem?.type;
    const target = event.over?.id;

    switch (true) {
      case source === ItemType.INBOX && target === ItemType.INBOX:
        handleInboxItemClick(activeItem?.id as string);
        break;

      case source === ItemType.INBOX && target === ItemType.ACTION:
        handleInboxItemToAction(activeItem?.id as string);
        break;

      case source === ItemType.ACTION && target === ItemType.ACTION:
        handleActionClick(activeItem?.id as string);
        break;

      default:
        console.log("unknown")
        break;
    }

  }

  const columnConfigs = [
    {
      id: ItemType.INBOX,
      title: "Inbox",
      cardBackgroundColor: "bg-[#7643CF]",
      cardBorderColor: "border-[#7643CF]",
      headerColor: "bg-[#7643CF33]",
      iconColor: "#7643CF",
      items: kanbanItems
    },
    {
      id: ItemType.ACTION,
      title: "Action",
      cardBackgroundColor: "bg-[#ED0C0C]",
      cardBorderColor: "border-[#ED0C0C]",
      headerColor: "bg-[#ED0C0C33]",
      iconColor: "#ED0C0C",
      items: kanbanActions
    },
    {
      id: ItemType.PROJECT,
      title: "Project",
      cardBackgroundColor: "bg-[#07A604]",
      cardBorderColor: "border-[#07A604]",
      headerColor: "bg-[#07A60433]",
      iconColor: "#07A604",
      items: kanbanProjects
    },
    {
      id: ItemType.SOMEDAY,
      title: "Someday/Maybe",
      cardBackgroundColor: "bg-[#593406]",
      cardBorderColor: "border-[#593406]",
      headerColor: "bg-[#59340633]",
      iconColor: "#593406",
      items: []
    },
    {
      id: ItemType.REFERENCE,
      title: "Reference",
      cardBackgroundColor: "bg-[#0B17F3]",
      cardBorderColor: "border-[#0B17F3]",
      headerColor: "bg-[#0B17F333]",
      iconColor: "#0B17F3",
      items: []
    }
  ]

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-2 pb-4">
          {columnConfigs.map((config) => (
            <KabanColumn 
              key={config.id}
              id={config.id}
              title={config.title}
              cardBackgroundColor={config.cardBackgroundColor}
              cardBorderColor={config.cardBorderColor}
              headerColor={config.headerColor}
              icon={<MousePointerClick className="mr-2" size={20} color={config.iconColor} />}
              items={config.items}
            />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <KanbanCard 
              item={activeItem} 
              borderColor="border-gray-400"
              backgroundColor="bg-gray-400"
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <ViewInbox />
      <ActionPopover />
    </>
  );
}