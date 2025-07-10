
import { X } from "lucide-react";
import { useViewInbox } from "@/components/popovers/Inbox/useViewInbox";
import { useState, useEffect } from "react";
import axios from "axios";
import { ActionStatus, Priority } from "@gtd/shared/api/generated";
import { useInboxItems } from "@/hooks/useInboxItems";
import { useActions } from "@/hooks/useActions";
import { LabeledInput } from "@/components/LabelField";
import { PopoverType, useAction } from "@/components/popovers/Action/useAction";
import { Popover, PopoverContent } from "@gtd/shared/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@gtd/shared/components/ui/card";
import { Input } from "@gtd/shared/components/ui/input";
import { Textarea } from "@gtd/shared/components/ui/textarea";
import { DatePicker } from "@gtd/shared/components/ui/datepicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@gtd/shared/components/ui/select";
import { Button } from "@gtd/shared/components/ui/button";

interface BasePopoverProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    children: React.ReactNode;
}


export default function BasePopover({ isOpen, setIsOpen, title, children }: BasePopoverProps) {

    return (
    <Popover open={isOpen}>
        <PopoverContent 
          onClick={() => setIsOpen(false)}
          className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/50 flex items-center justify-center text-foreground"
        >
          <Card className="p-6 min-w-[400px] max-w-[800px]" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="absolute top-2 right-2"> 
                <X className="w-6 h-6" />
            </Button>
            
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
              
              <Button variant="secondary" className="py-2 rounded-md w-1/2" onClick={() => setIsOpen(false)}>Cancel</Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    )
}