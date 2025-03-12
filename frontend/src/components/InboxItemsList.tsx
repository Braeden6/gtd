import { InboxItem } from './InboxItem';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { useInboxItems } from '@/hooks/useInboxItems';



export const InboxItemsList = () => {
  const { items, deleteItem, isDeletingItem } = useInboxItems();
  const unprocessedItems = items.filter(item => !item.processed);
  const processedItems = items.filter(item => item.processed);

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="unprocessed">
        <AccordionItem value="unprocessed">
          <AccordionTrigger className="text-xl font-semibold">
            TODO ({unprocessedItems.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {unprocessedItems.map((item) => (
                <InboxItem 
                  key={item.id}
                  item={item} 
                  onDelete={deleteItem} 
                  isDeletingItem={isDeletingItem} 
                />
              ))}
              {unprocessedItems.length === 0 && (
                <p className="text-muted-foreground italic">No unprocessed items</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="processed">
          <AccordionTrigger className="text-xl font-semibold">
            DONE ({processedItems.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {processedItems.map((item) => (
                <InboxItem 
                  key={item.id}
                  item={item} 
                  onDelete={deleteItem} 
                  isDeletingItem={isDeletingItem} 
                />
              ))}
              {processedItems.length === 0 && (
                <p className="text-muted-foreground italic">No processed items</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
