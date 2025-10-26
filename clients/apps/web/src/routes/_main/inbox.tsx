import { createFileRoute } from '@tanstack/react-router'
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
  type DragStartEvent,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useActions } from "@/hooks/useActions";
import { useInboxItems } from "@/hooks/useInboxItems";
import KanbanCard from "@/components/KanbanCard";
import { KabanColumn } from "@/components/KandanColumn";
import { ItemType, type KabanItem } from "@/lib/types";
import { useViewInbox } from "@/components/popovers/Inbox/useViewInbox";
import ViewInbox from "@/components/popovers/Inbox/ViewInbox";
import { PopoverType, useAction } from "@/components/popovers/Action/useAction";
import ActionPopover from "@/components/popovers/Action/Action";
import { useProjects } from "@/hooks/useProjects";

export const Route = createFileRoute('/_main/inbox')({
  component: Inbox,
})

function Inbox() {
  const { items, updateItem, kanbanItems } = useInboxItems();
  const { actions,kanbanActions } = useActions();
  const { kanbanProjects } = useProjects();
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

    const projectItem = kanbanProjects.find((item) => item.id === id);
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
    const actionItem = actions.find(item => item.id === id);
    
    if (actionItem) {
      const inboxItem = items.find(item => item.id === actionItem?.inbox_id);
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

  const exampleInboxItems: KabanItem[] = [
    {
      id: 'inbox-1',
      title: 'Review quarterly financial report',
      date: new Date().toISOString(),
      isNew: true,
      type: ItemType.INBOX,
      priority: 'high' as any
    },
    {
      id: 'inbox-2',
      title: 'Schedule team meeting for next week',
      date: new Date().toISOString(),
      isNew: true,
      type: ItemType.INBOX,
      priority: 'medium' as any
    },
    {
      id: 'inbox-3',
      title: 'Order new office supplies',
      date: new Date().toISOString(),
      type: ItemType.INBOX,
      priority: 'low' as any
    }
  ];

  const exampleActionItems: KabanItem[] = [
    {
      id: 'action-1',
      title: 'Complete project documentation',
      date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
      type: ItemType.ACTION,
      priority: 'high' as any
    },
    {
      id: 'action-2',
      title: 'Call client to discuss proposal',
      date: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
      type: ItemType.ACTION,
      priority: 'medium' as any
    },
    {
      id: 'action-3',
      title: 'Update website content',
      date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
      type: ItemType.ACTION,
      priority: 'low' as any
    }
  ];

  const exampleProjectItems: KabanItem[] = [
    {
      id: 'project-1',
      title: 'Website Redesign Project',
      date: new Date(Date.now() + 604800000).toISOString(), // 1 week from now
      type: ItemType.PROJECT,
      priority: 'high' as any
    },
    {
      id: 'project-2',
      title: 'Mobile App Development',
      date: new Date(Date.now() + 1209600000).toISOString(), // 2 weeks from now
      type: ItemType.PROJECT,
      priority: 'medium' as any
    }
  ];

  const exampleSomedayItems: KabanItem[] = [
    {
      id: 'someday-1',
      title: 'Learn Spanish',
      date: null,
      type: ItemType.SOMEDAY,
      priority: 'low' as any
    },
    {
      id: 'someday-2',
      title: 'Write a book',
      date: null,
      type: ItemType.SOMEDAY,
      priority: 'low' as any
    }
  ];

  const exampleReferenceItems: KabanItem[] = [
    {
      id: 'reference-1',
      title: 'Meeting notes from Q4 planning',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      type: ItemType.REFERENCE,
      priority: null
    },
    {
      id: 'reference-2',
      title: 'Company policies and procedures',
      date: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      type: ItemType.REFERENCE,
      priority: null
    }
  ];

  const columnConfigs = [
    {
      id: ItemType.INBOX,
      title: "Inbox",
      cardBackgroundColor: "bg-[#7643CF]",
      cardBorderColor: "border-[#7643CF]",
      headerColor: "bg-[#7643CF33]",
      iconColor: "#7643CF",
      items: kanbanItems.length > 0 ? kanbanItems : exampleInboxItems
    },
    {
      id: ItemType.ACTION,
      title: "Action",
      cardBackgroundColor: "bg-[#ED0C0C]",
      cardBorderColor: "border-[#ED0C0C]",
      headerColor: "bg-[#ED0C0C33]",
      iconColor: "#ED0C0C",
      items: kanbanActions.length > 0 ? kanbanActions : exampleActionItems
    },
    {
      id: ItemType.PROJECT,
      title: "Project",
      cardBackgroundColor: "bg-[#07A604]",
      cardBorderColor: "border-[#07A604]",
      headerColor: "bg-[#07A60433]",
      iconColor: "#07A604",
      items: kanbanProjects.length > 0 ? kanbanProjects : exampleProjectItems
    },
    {
      id: ItemType.SOMEDAY,
      title: "Someday/Maybe",
      cardBackgroundColor: "bg-[#593406]",
      cardBorderColor: "border-[#593406]",
      headerColor: "bg-[#59340633]",
      iconColor: "#593406",
      items: exampleSomedayItems
    },
    {
      id: ItemType.REFERENCE,
      title: "Reference",
      cardBackgroundColor: "bg-[#0B17F3]",
      cardBorderColor: "border-[#0B17F3]",
      headerColor: "bg-[#0B17F333]",
      iconColor: "#0B17F3",
      items: exampleReferenceItems
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
        <div className="flex gap-2 pb-4 w-full h-full overflow-auto">
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