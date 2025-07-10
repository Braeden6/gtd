import Calendar, { type CalendarEvent } from '@/components/Calendar';
import DeadlineDrawer, { type Deadline } from '@/components/DeadlineDrawer';
import { getElementTypeStyles } from '@/utils/getStyles';
import { ElementType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@gtd/shared/components/ui/card';
import { cn } from '@gtd/shared/lib/utils';
import { createFileRoute } from '@tanstack/react-router'
import {
    CalendarIcon,
  } from "lucide-react";
  import { useState } from "react";
import { Priority } from '@gtd/shared/api/generated';

export const Route = createFileRoute('/_main/')({
    component: RouteComponent,
})
  
function RouteComponent() {
    const [showDeadlines, setShowDeadlines] = useState(false);

    const [calendarViewingDate, setCalendarViewingDate] = useState(new Date());

    const handleCalendarViewingDateChange = (increment: number) => {
        setCalendarViewingDate(new Date(calendarViewingDate.setMonth(calendarViewingDate.getMonth() + increment)));
    }
  
    const overviewCards = [
      {
        title: "Next Action due Today",
        value: "1",
        valueColor: getElementTypeStyles(ElementType.Action).textColor,
      },
      {
        title: "Project due Soon",
        value: "1",
        valueColor: getElementTypeStyles(ElementType.Project).textColor,
      },
      {
        title: "Overdue Tasks",
        value: "3",
        valueColor: getElementTypeStyles(undefined).textColor,
      },
    ];
  
    const calendarEvents = [
      { day: new Date(2025, 0, 5), type: "action" },
      { day: new Date(2025, 0, 9), type: "action" },
      { day: new Date(2025, 0, 18), type: "action" },
      { day: new Date(2025, 0, 19), type: "action" },
      { day: new Date(2025, 0, 26), type: "action" },
      { day: new Date(2025, 0, 31), type: "project" },
    ] as CalendarEvent[];
  
    const upcomingDeadlines = [
      {
        id: 1,
        title: "Complete project proposal",
        date: "2024-07-20",
        type: ElementType.Action,
        priority: Priority.HIGH,
      },
      {
        id: 2,
        title: "Review marketing materials",
        date: "2024-07-22",
        type: ElementType.Action,
        priority: Priority.MEDIUM,
      },
      {
        id: 3,
        title: "Website redesign project",
        date: "2024-07-31",
        type: ElementType.Project,
        priority: Priority.HIGH,
      },
      {
        id: 4,
        title: "Team meeting preparation",
        date: "2024-08-02",
        type: ElementType.Action,
        priority: Priority.LOW,
      },
    ] as Deadline[];
  
    const pastDeadlines = [
      {
        id: 5,
        title: "Submit quarterly report",
        date: "2024-07-15",
        type: ElementType.Action,
        priority: Priority.HIGH,
        status: "overdue",
      },
      {
        id: 6,
        title: "Client presentation",
        date: "2024-07-10",
        type: ElementType.Action,
        priority: Priority.MEDIUM,
        status: "completed",
      },
      {
        id: 7,
        title: "Budget planning",
        date: "2024-07-05",
        type: ElementType.Project,
        priority: Priority.HIGH,
        status: "overdue",
      },
    ] as Deadline[];


  
    return (
      <div className="w-full h-[832px] overflow-hidden relative">
        <div className="transition-all duration-300 ease-in-out">
          <div className="flex flex-col w-full max-w-[1239px] items-start gap-[38px] absolute top-0 left-5">
            <div className="flex gap-[27px] w-full">  
              <div className="flex flex-col w-[820px] items-start gap-[30px]">
                <h2 className="relative self-stretch font-bold text-[26px]">
                  Overview
                </h2>

                <div className="flex items-stretch gap-5 self-stretch w-full">
                  {overviewCards.map((card, index) => (
                    <Card
                      key={index}
                      className="flex-1 rounded-[10px] overflow-hidden"
                    >
                      <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                      </CardHeader>
                      <CardContent className={cn(
                        "flex flex-col justify-between h-full",
                        card.valueColor
                      )}>
                        <div className="font-bold text-2xl">
                          {card.value}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2 className="relative self-stretch font-bold text-[26px]">
                  Calender
                </h2>

                <div className="relative w-[473px] h-[395px]">
                  <Calendar
                    viewingDate={calendarViewingDate}
                    calendarEvents={calendarEvents}
                    onMonthChange={handleCalendarViewingDateChange}
                    enableLegend
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div
          className="fixed top-0 right-0 w-2 h-full z-40"
          onMouseEnter={() => setShowDeadlines(true)}
        />
  
        <div
          className="fixed top-20 right-2 p-2 rounded-full shadow-lg bg-primary/40 transition-all duration-200"
          onMouseEnter={() => setShowDeadlines(true)}
          title="View Deadlines"
        >
          <CalendarIcon className="w-5 h-5" />
        </div>
  
        <DeadlineDrawer 
          open={showDeadlines} 
          setOpen={setShowDeadlines} 
          upcomingDeadlines={upcomingDeadlines} 
          pastDeadlines={pastDeadlines} 
        />
      </div>
    );
  };