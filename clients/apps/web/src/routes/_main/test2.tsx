import { createFileRoute } from '@tanstack/react-router'
import { GripVerticalIcon, LogOutIcon, Home, Inbox, Folder, CheckSquare, MousePointer, Trash2 } from "lucide-react";
import { Badge } from "@gtd/shared/components/ui/badge";
import { Card, CardContent } from "@gtd/shared/components/ui/card";
import { Switch } from "@gtd/shared/components/ui/switch";


export const Route = createFileRoute('/_main/test2')({
  component: RouteComponent,
})

function RouteComponent() {
  // Navigation menu items
  const navItems = [
    { title: "Dashboard", icon: Home, active: false },
    { title: "In Box", icon: Inbox, active: true, badge: 2 },
    { title: "Project", icon: Folder, active: false },
    { title: "Complete", icon: CheckSquare, active: false },
  ];

  // Column definitions
  const columns = [
    { title: "Capture", color: "#7643cf33", borderColor: "#7643cf" },
    { title: "Action", color: "#ed0c0c33", borderColor: "#ed0b0b" },
    { title: "Project", color: "#07a60433", borderColor: "#07a604" },
    { title: "Someday/Maybe", color: "#59340633", borderColor: "#593406" },
    { title: "Reference", color: "#0a16f233", borderColor: "#0a16f2" },
  ];

  // Capture column cards
  const captureCards = [
    { title: "TextTextTextTextTextText", date: "Jun 15, 2025", isNew: true },
    { title: "TextTextTextTextTextText", date: "Jun 15, 2025", isNew: true },
    { title: "TextTextTextTextTextText", date: "Jun 15, 2025", isNew: false },
  ];

  // Action column cards
  const actionCards = [
    {
      title: "TitleTitleTitleTitleTitleTitleTitle",
      date: "Deadline date",
      priority: {
        level: "High",
        bgColor: "bg-[#fee2e1]",
        borderColor: "border-red-800",
      },
    },
    {
      title: "TitleTitleTitleTitleTitleTitleTitle",
      date: "Deadline date",
      priority: {
        level: "Medium",
        bgColor: "bg-yellow-100",
        borderColor: "border-[#854d0f]",
      },
    },
  ];

  // Project column cards
  const projectCards = [{ title: "ProjectTitleTitleTitleTitleTitle" }];

  // Someday/Maybe column cards
  const somedayCards = [{ title: "TitleTitleTitleTitleTitleTitle" }];

  // Reference column cards
  const referenceCards = [
    { title: "Reference title" },
    { title: "Reference title" },
  ];

  return (
    <div className="w-full h-full flex gap-4">

      {/* Capture column cards */}
      <div className="flex flex-col w-[198px] items-start gap-2.5">
        {captureCards.map((card, index) => (
          <div key={index} className="relative">
            <Card className="w-[198px] relative flex-[0_0_auto] bg-[#ebf6fd] rounded-[5px] overflow-hidden border-2 border-solid border-[#7643cf]">
              <CardContent className="p-0 px-[15px] py-[9px]">
                <div className="flex flex-col gap-1">
                  <GripVerticalIcon className="w-[18px] h-[18px] mb-1" />
                  <div className="w-full [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[normal]">
                    {card.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-[15px] h-[15px]"
                      alt="Date"
                      src="/date.svg"
                    />
                    <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                      {card.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {card.isNew && (
              <Badge className="absolute w-[43px] h-[17px] top-1.5 left-[146px] bg-[#7643cf] rounded-[21.5px/8.43px]">
                <span className="absolute top-[3px] left-[13px] [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-white text-[8.4px] tracking-[0] leading-[normal] whitespace-nowrap">
                  New
                </span>
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Action column cards */}
      <div className="flex flex-col w-[204px] items-start gap-2.5">
        {actionCards.map((card, index) => (
          <Card
            key={index}
            className="w-[204px] relative bg-[#ebf6fd] rounded-[5px] overflow-hidden border-[0.5px] border-solid border-[#ed0b0b]"
          >
            <CardContent className="p-0 px-[15px] py-[9px]">
              <div className="flex flex-col gap-1">
                <GripVerticalIcon className="w-[18px] h-[18px] mb-1" />
                <div className="w-full [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[normal]">
                  {card.title}
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-[15px] h-[15px]"
                    alt="Date"
                    src="/date.svg"
                  />
                  <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                    {card.date}
                  </div>
                </div>
                <Badge
                  className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px] ${card.priority.bgColor} rounded-[20px] overflow-hidden border border-solid ${card.priority.borderColor} w-fit`}
                >
                  <span className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                    Priority: {card.priority.level}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project column cards */}
      <div className="flex flex-col w-[204px] items-start gap-2.5">
        {projectCards.map((card, index) => (
          <Card
            key={index}
            className="w-[204px] relative bg-[#ebf6fd] rounded-[5px] overflow-hidden border-[0.5px] border-solid border-[#07a604]"
          >
            <CardContent className="p-0 px-[15px] py-[9px]">
              <div className="flex flex-col gap-1">
                <GripVerticalIcon className="w-[18px] h-[18px] mb-1" />
                <div className="w-full [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[normal]">
                  {card.title}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Someday/Maybe column cards */}
      <div className="">
        {somedayCards.map((card, index) => (
          <Card
            key={index}
            className="w-[204px] bg-[#ebf6fd] rounded-[5px] overflow-hidden border-[0.5px] border-solid border-[#593406]"
          >
            <CardContent className="p-0 px-[15px] py-[9px]">
              <div className="flex flex-col gap-1">
                <GripVerticalIcon className="w-[18px] h-[18px] mb-1" />
                <div className="w-full [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[normal]">
                  {card.title}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reference column cards */}
      <div className="flex flex-col w-[198px] items-start gap-2.5">
        {referenceCards.map((card, index) => (
          <Card
            key={index}
            className="w-[198px] bg-[#ebf6fd] rounded-[10px] overflow-hidden border-[0.5px] border-solid border-[#0a16f2]"
          >
            <CardContent className="p-0 px-[15px] py-[9px]">
              <div className="flex flex-col gap-1">
                <GripVerticalIcon className="w-[18px] h-[18px] mb-1" />
                <div className="w-full [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[normal]">
                  {card.title}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trash bin area */}
      <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed transition-colors duration-200 min-w-[120px]">
        <Trash2 className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">Drop to Delete</span>
      </div>
    </div>
  );
};