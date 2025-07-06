import { Card } from "@gtd/shared";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CalendarEvent {
  day: number;
  type: "action" | "project";
}

interface CalendarProps {
  viewingDate: Date;
  calendarEvents: CalendarEvent[];
  onMonthChange: (increment: number) => void;
}

function Calendar({ viewingDate, calendarEvents, onMonthChange }: CalendarProps) {
    const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const viewingMonth = viewingDate.getMonth();
  const viewingYear = viewingDate.getFullYear();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysInMonth = new Date(viewingYear, viewingMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewingYear, viewingMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const prevMonth = viewingMonth === 0 ? 11 : viewingMonth - 1;
  const prevYear = viewingMonth === 0 ? viewingYear - 1 : viewingYear;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  const totalCells = 42;
  const daysFromNextMonth = totalCells - adjustedFirstDay - daysInMonth;

  const isCurrentMonth = currentMonth === viewingMonth && currentYear === viewingYear;

  return (
    <div className="relative">
      <div className="inline-flex flex-col items-start">
        <Card className="inline-flex flex-col items-start p-6 relative rounded-[12.72px]">
          <header className="flex items-center justify-between relative self-stretch w-full">
            <div className="relative w-fit font-black text-[19.1px]">
              {monthNames[viewingMonth]} {viewingYear}
            </div>

            <div className="inline-flex items-start gap-[6.36px]">
              <button 
                onClick={() => onMonthChange(-1)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Previous month"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onMonthChange(1)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Next month"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mt-2 grid grid-cols-7 gap-0">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
              <div key={index} className="p-4 text-center">
                <div className="font-semibold text-[11.1px]">{day}</div>
              </div>
            ))}

            {/* Previous month days */}
            {Array.from({ length: adjustedFirstDay }, (_, i) => {
              const day = daysInPrevMonth - adjustedFirstDay + i + 1;
              return (
                <div
                  key={`prev-${day}`}
                  className="p-4 text-center border-[0.79px] border-solid border-[#d4d3df] bg-muted"
                >
                  <div className="text-[11.1px] text-[#a8a8a8]">{day}</div>
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isCurrentDay = isCurrentMonth && day === currentDay;
              const hasAction = calendarEvents.some(
                (event) => event.day === day && event.type === "action"
              );
              const hasProject = calendarEvents.some(
                (event) => event.day === day && event.type === "project"
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
                      isCurrentDay ? "font-semibold text-white" : ""
                    }`}
                  >
                    {day}
                  </div>
                  {hasAction && (
                    <div className="absolute w-[13px] h-[13px] bottom-2 left-1/2 transform -translate-x-1/2 bg-[#ed0b0b] rounded-[6.36px]" />
                  )}
                  {hasProject && (
                    <div className="absolute w-[13px] h-[13px] bottom-2 left-1/2 transform -translate-x-1/2 bg-[#07a604] rounded-[6.36px]" />
                  )}
                </div>
              );
            })}

            {Array.from({ length: daysFromNextMonth }, (_, i) => {
              const day = i + 1;
              return (
                <div
                  key={`next-${day}`}
                  className="p-4 text-center border-[0.79px] border-solid border-[#d4d3df] bg-muted"
                >
                  <div className="text-[11.1px] text-[#a8a8a8]">{day}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="absolute w-16 h-[41px] top-2.5 right-[-60px]">
        <div className="absolute w-[13px] h-[13px] top-0 left-0 bg-[#ed0b0b] rounded-[6.36px]" />
        <div className="absolute w-[13px] h-[13px] top-6 left-0 bg-[#07a604] rounded-[6.36px]" />
        <div className="absolute -top-px left-[23px] font-normal text-sm">
          Action
        </div>
        <div className="absolute top-[23px] left-[23px] font-normal text-sm">
          Project
        </div>
      </div>
    </div>
  );
}

export default Calendar;
export type { CalendarEvent, CalendarProps };