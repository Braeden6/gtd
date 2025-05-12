import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { GripVertical } from "lucide-react";
import { Priority } from "@/api/generated";
import { KabanItem } from "@/lib/types";

const priorityColors = {
    [Priority.HIGH]: "bg-[#FEE2E1] border-[#991B1B]",
    [Priority.MEDIUM]: "bg-[#FEF9C3] border-[#854D0F]",
    [Priority.LOW]: "bg-[#DCFCE7] border-[#166434]",
}

const priorityNames = {
    [Priority.HIGH]: "High",
    [Priority.MEDIUM]: "Medium",
    [Priority.LOW]: "Low",
}

export interface KanbanCardProps {
    item: KabanItem;
    borderColor: string;
    backgroundColor: string;
}

export default function KanbanCard({ item, borderColor, backgroundColor }: KanbanCardProps) {
    return (
      <div className={cn(
        "mb-3 bg-secondary border",
        borderColor,
        item.isNew && "border-2",
        "rounded-lg text-black"
      )}>
        <div className="p-3 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <GripVertical className="w-4 h-4" />
            { item.isNew && (
              <div className={cn(
                "text-xs flex items-center gap-2",
                "rounded-[40%/50%] px-4 py-1",
                "text-white",
                backgroundColor
              )}>
                New
              </div>
            )}
          </div>
  
          <p className="text-sm my-2 truncate overflow-hidden text-ellipsis">{item.title}</p>
          
          {item.date && (
            <div className="text-xs mb-1 flex items-center gap-2">
              <Calendar size={16} />
              {new Date(item.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </div>
          )}
  
          {item.priority && (
            <div>
              <Badge 
                variant="outline" 
                className={`text-xs ${priorityColors[item.priority]} text-inherit`}
              >
                Priority: {priorityNames[item.priority]}
              </Badge>
            </div>
          )}
        </div>
      </div>
    )
  }