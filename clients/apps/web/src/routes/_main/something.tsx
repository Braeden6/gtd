import Calendar from '@/components/Calendar';
import { Card, CardContent } from '@gtd/shared/components/ui/card';
import { Separator } from '@gtd/shared/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router'
import {
    CalendarIcon,
  } from "lucide-react";
  import { useState } from "react";

export const Route = createFileRoute('/_main/something')({
    component: RouteComponent,
})
  
function RouteComponent() {
    const [showDeadlines, setShowDeadlines] = useState(false);
  
    const overviewCards = [
      {
        title: "Next Action due Today",
        value: "1",
        valueColor: "text-[#ed0b0b]",
      },
      {
        title: "Project due Soon",
        value: "1",
        valueColor: "text-[#07a604]",
      },
      {
        title: "Overdue Tasks",
        value: "3",
        valueColor: "",
      },
    ];
  
    const calendarEvents = [
      { day: 5, type: "action" },
      { day: 9, type: "action" },
      { day: 18, type: "action" },
      { day: 19, type: "action" },
      { day: 26, type: "action" },
      { day: 31, type: "project" },
    ];
  
    const upcomingDeadlines = [
      {
        id: 1,
        title: "Complete project proposal",
        date: "2024-07-20",
        type: "action",
        priority: "high",
      },
      {
        id: 2,
        title: "Review marketing materials",
        date: "2024-07-22",
        type: "action",
        priority: "medium",
      },
      {
        id: 3,
        title: "Website redesign project",
        date: "2024-07-31",
        type: "project",
        priority: "high",
      },
      {
        id: 4,
        title: "Team meeting preparation",
        date: "2024-08-02",
        type: "action",
        priority: "low",
      },
    ];
  
    const pastDeadlines = [
      {
        id: 5,
        title: "Submit quarterly report",
        date: "2024-07-15",
        type: "action",
        priority: "high",
        status: "overdue",
      },
      {
        id: 6,
        title: "Client presentation",
        date: "2024-07-10",
        type: "action",
        priority: "medium",
        status: "completed",
      },
      {
        id: 7,
        title: "Budget planning",
        date: "2024-07-05",
        type: "project",
        priority: "high",
        status: "overdue",
      },
    ];


  
    return (
      <div className="w-full h-[832px] overflow-hidden relative">
        <div className={`transition-all duration-300 ease-in-out ${showDeadlines ? 'mr-80' : 'mr-0'}`}>
          <div className="relative h-[813px] top-5 max-w-[1280px] mx-auto">
            <div className="absolute w-full h-[813px] top-0 left-0">
              <div className="absolute w-[190px] h-9 top-[67px] left-[13px] rounded-[5px]" />
              <Separator className="absolute w-full top-[42px] left-0" />
  
              <div className="flex flex-col w-full max-w-[1239px] items-start gap-[38px] absolute top-0 left-5">
  
                {/* Main content */}
                <div className="flex gap-[27px] w-full">  
                  {/* Main content area */}
                  <div className="flex flex-col w-[820px] items-start gap-[30px]">
                    {/* Overview section */}
                    <h2 className="relative self-stretch [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[26px]">
                      Overview
                    </h2>
  
                    <div className="flex items-stretch gap-5 self-stretch w-full">
                      {overviewCards.map((card, index) => (
                        <Card
                          key={index}
                          className="flex-1 bg-[#ebf6fd] rounded-[10px] overflow-hidden h-[100px]"
                        >
                          <CardContent className="flex flex-col justify-between h-full p-[15px]">
                            <div className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold  text-base leading-tight">
                              {card.title}
                            </div>
                            <div
                              className={`[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold ${card.valueColor} text-2xl leading-none`}
                            >
                              {card.value}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
  
                    {/* Calendar section */}
                    <h2 className="relative self-stretch [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[26px]">
                      Calender
                    </h2>
  
                    <div className="relative w-[473px] h-[395px]">
                      <Calendar
                        viewingDate={new Date(2025, 0, 1)}
                        calendarEvents={[]}
                        onMonthChange={() => { }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right edge hover trigger */}
        <div
          className="fixed top-0 right-0 w-2 h-full z-40"
          onMouseEnter={() => setShowDeadlines(true)}
          onMouseLeave={() => setShowDeadlines(false)}
        />
  
        {/* Deadlines icon trigger */}
        <div
          className="fixed top-20 right-2 z-50 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200"
          onMouseEnter={() => setShowDeadlines(true)}
          onMouseLeave={() => setShowDeadlines(false)}
          title="View Deadlines"
        >
          <CalendarIcon className="w-5 h-5 text-gray-600" />
        </div>
  
        {/* Right slide-out deadlines frame */}
        <div
          className={`fixed top-0 right-0 h-full w-80 shadow-2xl border-l border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${
            showDeadlines ? "translate-x-0" : "translate-x-full"
          }`}
          onMouseEnter={() => setShowDeadlines(true)}
          onMouseLeave={() => setShowDeadlines(false)}
        >
          {/* Frame header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-gray-600" />
              Deadlines
            </h2>
          </div>
  
          {/* Frame content */}
          <div className="p-6 overflow-y-auto h-full pb-20">
            {/* Upcoming Deadlines */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-3 h-3 bg-[#07a604] rounded-full mr-2"></div>
                Upcoming
              </h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="p-3 bg-[#f8f9fa] rounded-lg border hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm leading-tight">
                          {deadline.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 flex items-center">
                          <span className="mr-2">{deadline.date}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              deadline.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : deadline.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {deadline.priority}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full mt-1 ${
                          deadline.type === "action" ? "bg-[#ed0b0b]" : "bg-[#07a604]"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Past Deadlines */}
            <div>
              <h3 className="text-lg font-semibold  mb-4 flex items-center">
                <div className="w-3 h-3 bg-[#ed0b0b] rounded-full mr-2"></div>
                Past
              </h3>
              <div className="space-y-3">
                {pastDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className={`p-3 rounded-lg border hover:opacity-80 transition-opacity ${
                      deadline.status === "overdue"
                        ? "bg-red-50 border-red-200"
                        : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div
                          className={`font-medium text-sm leading-tight ${
                            deadline.status === "overdue" ? "text-red-800" : "text-green-800"
                          }`}
                        >
                          {deadline.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 flex items-center">
                          <span className="mr-2">{deadline.date}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              deadline.status === "overdue"
                                ? "bg-red-200 text-red-800"
                                : "bg-green-200 text-green-800"
                            }`}
                          >
                            {deadline.status}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full mt-1 ${
                          deadline.type === "action" ? "bg-[#ed0b0b]" : "bg-[#07a604]"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };