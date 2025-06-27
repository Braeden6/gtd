import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import KanbanCard from "./KanbanCard";
import { KabanItem } from "@/lib/types";


interface KabanColumn {
    id: string;
    title: string;
    items: KabanItem[];
    cardBackgroundColor: string;
    cardBorderColor: string;
    headerColor: string;
    icon: React.ReactNode;
}
  
export const KabanColumn = ({id, title, cardBackgroundColor, cardBorderColor, headerColor, icon, items}: KabanColumn): React.ReactNode => {
return <Droppable 
    key={id} 
    id={id}
    className="flex-1 min-w-[250px]"
    >
    <div className="pb-2">
        <div className={`flex items-center text-2xl font-medium text-center ${headerColor} px-2 py-1`}>
        {icon}
        <span className="flex-1">{title}</span>
        </div>
    </div>
    {items.map((item) => (
        <Draggable id={item.id} item={item}>
        <KanbanCard item={item}
            borderColor={cardBorderColor}
            backgroundColor={cardBackgroundColor}
        />
        </Draggable>
    ))}
    </Droppable>
}