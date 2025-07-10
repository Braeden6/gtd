import { CalendarIcon } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@gtd/shared/components/ui/drawer"
import { Separator } from "@gtd/shared/components/ui/separator";
import { Priority } from "@gtd/shared/api/generated";
import { ElementType } from "@/lib/types";
import { getElementTypeStyles, getPriorityStyles } from "@/utils/getStyles";
import { cn } from "@gtd/shared/lib/utils";

export interface Deadline {
  id: number;
  title: string;
  date: string;
  priority: Priority;
  type: ElementType;
  status?: string;
}

interface DeadlineDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  upcomingDeadlines: Deadline[];
  pastDeadlines: Deadline[];
}

const DeadlineDrawer = ({ open, setOpen, upcomingDeadlines, pastDeadlines }: DeadlineDrawerProps) => {
  return (
    <Drawer direction="right" open={open}>
        <DrawerContent onMouseLeave={() => setOpen(false)}>
            <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2 py-4 text-2xl font-bold">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Deadlines
                </DrawerTitle>
            </DrawerHeader>
            <Separator />

            <div className="p-6 overflow-y-auto h-full pb-20">
                <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                    Upcoming
                </h3>
                <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                    <div
                        key={deadline.id}
                        className="p-3 bg-muted rounded-lg border hover:bg-card transition-colors"
                    >
                        <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="font-medium text-sm leading-tight">
                            {deadline.title}
                            </div>
                            <div className="text-xs mt-1 flex items-center">
                            <span className="mr-2">{deadline.date}</span>
                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded-full text-xs",
                                    getPriorityStyles(deadline.priority).textColor,
                                    getPriorityStyles(deadline.priority).backgroundColor
                                )}
                            >
                                {deadline.priority}
                            </span>
                            </div>
                        </div>
                        <div
                            className={cn(
                                "w-2 h-2 rounded-full mt-1",
                                getElementTypeStyles(deadline.type).backgroundColor
                            )}
                        ></div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
    
                <div>
                <h3 className="text-lg font-semibold  mb-4 flex items-center">
                    <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
                    Past
                </h3>
                <div className="space-y-3">
                    {pastDeadlines.map((deadline) => (
                    <div
                        key={deadline.id}
                        className={`p-3 rounded-lg border hover:opacity-80 transition-opacity ${
                        deadline.status === "overdue"
                            ? "bg-destructive/10 border-destructive"
                            : "bg-success/10 border-success"
                        }`}
                    >
                        <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div
                            className={`font-medium text-sm leading-tight ${
                                deadline.status === "overdue" ? "text-destructive" : "text-success"
                            }`}
                            >
                            {deadline.title}
                            </div>
                            <div className="text-xs mt-1 flex items-center">
                            <span className="mr-2">{deadline.date}</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                deadline.status === "overdue"
                                    ? "bg-destructive text-destructive-foreground"
                                    : "bg-success text-success-foreground"
                                }`}
                            >
                                {deadline.status}
                            </span>
                            </div>
                        </div>
                        <div
                            className={cn(
                                "w-2 h-2 rounded-full mt-1",
                                getElementTypeStyles(deadline.type).backgroundColor
                            )}
                        ></div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default DeadlineDrawer;