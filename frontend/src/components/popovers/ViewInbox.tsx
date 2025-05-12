import { Calendar, X } from "lucide-react";
import { useInboxItems } from "@/hooks/useInboxItems";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/date";
import { useViewInbox } from "@/hooks/popover/useViewInbox";

export default function ViewInbox() {
    const { updateItem } = useInboxItems();
    const { popoverOpen, setPopoverOpen, popoverItem } = useViewInbox();
    return (
    <Popover open={popoverOpen}>
        <PopoverContent 
          onClick={() => setPopoverOpen(false)}
          className="w-[100vw] h-[100vh] z-100 absolute top-0 left-0 bg-black/50 flex items-center justify-center text-foreground"
        >
          <div className="bg-secondary border-primary border-2 rounded-md shadow-lg w-80 p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium">Capture date</div>
              <button onClick={() => setPopoverOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <label htmlFor="captureDate" className="text-sm">{formatDate(popoverItem?.created_at as string)}</label>
              </div>
              
              <div className="mb-4">
                <div className="font-medium mb-2">Content</div>
                <div className="flex gap-2 mb-2">
                  <button className="border rounded p-2 flex items-center justify-center">
                    <img  alt="arrow-right" className="w-4 h-4" />
                  </button>
                  <button className="border rounded p-2 flex items-center justify-center text-gray-500">
                  </button>
                </div>
                
                <Textarea className="w-full border rounded-md p-2 h-24 text-sm" value={popoverItem?.content} />
              </div>
            </div>
            
            <div className="flex flex-col gap-2 items-center">
              <button 
                className="bg-primary text-primary-foreground py-2 rounded-md font-medium w-1/2"
                  onClick={() => {
                    updateItem(popoverItem?.id as string, {
                      processed: true
                    })
                    setPopoverOpen(false);
                  }}
              >Complete</button>
              <button className="bg- text-gray-700 py-2 rounded-md w-1/2" onClick={() => setPopoverOpen(false)}>Cancel</button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
}