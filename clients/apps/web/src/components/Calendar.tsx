import { ElementType } from "@/lib/types";
import { Button } from "@gtd/shared/components/ui/button";
import { Card } from "@gtd/shared/components/ui/card";
import { cn } from "@gtd/shared/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getElementTypeStyles } from "../utils/getStyles";


const formatString = (str: string) => {
  const words = str.split("_");
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

interface CalendarEvent {
  day: Date;
  type: ElementType;
}

interface CalendarProps {
  viewingDate: Date;
  calendarEvents: CalendarEvent[];
  onMonthChange: (increment: number) => void;
  enableLegend?: boolean;
}

const previousDaysOfMonth = (viewingDate: Date) => {
  const viewingMonth = viewingDate.getMonth();
  const viewingYear = viewingDate.getFullYear();
  
  const firstDayOfMonth = new Date(viewingYear, viewingMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const prevMonth = viewingMonth === 0 ? 11 : viewingMonth - 1;
  const prevYear = viewingMonth === 0 ? viewingYear - 1 : viewingYear;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  return Array.from({ length: adjustedFirstDay }, (_, i) => {
    const day = daysInPrevMonth - adjustedFirstDay + i + 1;
    return (
      <div
        key={`prev-${day}`}
        className="p-4 text-center border-[0.79px] border-solid"
      >
        <div className="text-[11.1px] text-muted-foreground">{day}</div>
      </div>
    );
  })
}

const currentDaysOfMonth = (calendarEvents: CalendarEvent[], viewingDate: Date) => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const viewingMonth = viewingDate.getMonth();
  const viewingYear = viewingDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const isCurrentMonth = currentMonth === viewingMonth && currentYear === viewingYear;

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const isCurrentDay = isCurrentMonth && day === currentDay;
    const hasEvent = calendarEvents.some(
      (event) => event.day.getDate() === day
    );
    return (
      <div
        key={day}
        className={`relative p-4 text-center border-[0.79px] border-solid ${
          isCurrentDay ? "bg-secondary" : ""
        }`}
      >
        <div
          className={`text-[11.1px] ${
            isCurrentDay ? "font-semibold text-secondary-foreground" : ""
          }`}
        >
          {day}
        </div>
        {hasEvent && (
          <div className={cn(
            "absolute w-[13px] h-[13px] bottom-1 left-1/2 transform -translate-x-1/2 rounded-[6.36px]",
            getElementTypeStyles(calendarEvents.find(event => event.day.getDate() === day)?.type).backgroundColor
          )} />
        )}
      </div>
    );
  })
}

const nextDaysOfMonth = (viewingDate: Date) => {
  const viewingMonth = viewingDate.getMonth();
  const viewingYear = viewingDate.getFullYear();
  
  const totalCells = 42;
  const daysInMonth = new Date(viewingYear, viewingMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewingYear, viewingMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysFromNextMonth = totalCells - adjustedFirstDay - daysInMonth;
  return Array.from({ length: daysFromNextMonth }, (_, i) => {
    const day = i + 1;
    return (
      <div
        key={`next-${day}`}
        className="p-4 text-center border-[0.79px] border-solid"
      >
        <div className="text-[11.1px] text-muted-foreground">{day}</div>
      </div>
    );
  })
}

function Calendar({ viewingDate, calendarEvents, onMonthChange, enableLegend = false }: CalendarProps) {
  const viewingMonth = viewingDate.getMonth();
  const viewingYear = viewingDate.getFullYear();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return (
    <div className="relative">
      <div className="inline-flex flex-col items-start">
        <Card className="inline-flex flex-col items-start p-6 relative rounded-[12.72px]">
          <header className="flex items-center justify-between relative self-stretch w-full">
            <div className="relative w-fit font-black text-[19.1px]">
              {monthNames[viewingMonth]} {viewingYear}
            </div>

            <div className="inline-flex items-start gap-[6.36px]">
              <Button 
                onClick={() => onMonthChange(-1)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Previous month"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => onMonthChange(1)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Next month"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="mt-2 grid grid-cols-7 gap-0">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
              <div key={index} className="p-4 text-center">
                <div className="font-semibold text-[11.1px]">{day}</div>
              </div>
            ))}

            {previousDaysOfMonth(viewingDate)}

            {currentDaysOfMonth(calendarEvents, viewingDate)}

            {nextDaysOfMonth(viewingDate)}
          </div>
        </Card>
      </div>

      {enableLegend && (
        <div className="absolute w-16 h-[41px] top-2.5 right-[-10px] flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-[13px] h-[13px] rounded-full border",
                getElementTypeStyles(ElementType.Action).backgroundColor
              )}/>
              <div className="font-normal text-sm">
                {formatString(ElementType.Action)}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-[13px] h-[13px] rounded-full border",
                getElementTypeStyles(ElementType.Project).backgroundColor
              )}/>
              <div className="font-normal text-sm">
                {formatString(ElementType.Project)}
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
export type { CalendarEvent, CalendarProps };