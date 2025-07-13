import { Calendar, X } from "lucide-react";
import { useInboxItems } from "@/hooks/useInboxItems";
import { Label } from "@gtd/shared/components/ui/label";
import { Popover, PopoverContent } from "@gtd/shared/components/ui/popover";
import { Button } from "@gtd/shared/components/ui/button";
import { formatDate } from "@/lib/date";
import { useViewInbox } from "@/components/popovers/Inbox/useViewInbox";
import { Card } from "@gtd/shared/components/ui/card";
import BaseViewInboxData from "./BaseViewInboxData";

export default function ViewInbox() {
    const { updateItem } = useInboxItems();
    const { popoverOpen, setPopoverOpen, popoverItem } = useViewInbox();

    return (
    <Popover open={popoverOpen}>
        <PopoverContent 
          onClick={() => setPopoverOpen(false)}
          className="w-[100vw] h-[100vh] z-100 absolute top-0 left-0 bg-black/50 flex items-center justify-center text-foreground"
        >
          <Card className="border-2 rounded-md shadow-lg w-[400px] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium">Capture date</div>
              <Button variant="ghost" onClick={() => setPopoverOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <Label htmlFor="captureDate" className="text-sm">{formatDate(popoverItem?.created_at as string)}</Label>
              </div>
              <BaseViewInboxData />
            </div>
            
            <div className="flex flex-col gap-2 items-center">
              <Button 
                className="bg-primary text-primary-foreground py-2 rounded-md font-medium w-1/2"
                  onClick={() => {
                    updateItem(popoverItem?.id as string, {
                      processed: true
                    })
                    setPopoverOpen(false);
                  }}
              >Complete</Button>
              <Button className="py-2 rounded-md w-1/2 bg-accent text-accent-foreground" onClick={() => setPopoverOpen(false)}>Cancel</Button>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    )
}