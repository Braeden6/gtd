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
    <div className="relative w-[1280px] h-[832px] bg-white overflow-hidden">
      {/* Vertical line */}
      <div className="absolute w-px h-[769px] top-[63px] left-[213px] bg-gray-300" />

      {/* Sidebar navigation */}
      <div className="absolute w-[190px] h-[229px] top-[89px] left-[13px]">
        <div className="absolute w-[190px] h-9 top-[63px] left-0 bg-[#ebf6fd] rounded-[5px]" />

        <nav className="flex flex-col w-[183px] items-start gap-[35px] absolute top-0 left-[7px]">
          {navItems.map((item, index) => (
            <div key={index} className="relative self-stretch w-full h-[31px]">
              <div
                className={`absolute w-36 ${item.title === "In Box" ? "h-[30px]" : ""} top-${item.title === "In Box" ? "0" : "1.5"} left-[38px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]`}
              >
                {item.title}
                {item.badge && (
                  <div className="absolute w-[15px] h-[17px] top-0 left-11">
                    <Badge className="relative h-[15px] top-0.5 bg-[#7643cf] rounded-[7.5px] px-1">
                      <span className="absolute w-1.5 top-0 left-1 [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                        {item.badge}
                      </span>
                    </Badge>
                  </div>
                )}
              </div>
              <item.icon className="absolute w-[25px] h-[25px] top-1 left-0" />
            </div>
          ))}
        </nav>
      </div>

      {/* Horizontal divider */}
      <div className="absolute w-[1280px] h-px top-[62px] left-0 bg-gray-300" />

      {/* Dark mode toggle */}
      <div className="absolute w-[141px] h-[41px] top-[771px] left-[49px] bg-white flex items-center">
        <div className="absolute w-[97px] top-2 left-2.5 [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-black text-xl tracking-[0] leading-[normal] whitespace-nowrap">
          Dark Mode
        </div>
        <Switch className="absolute top-2.5 left-[114px]" />
      </div>

      {/* Column headers */}
      <div className="inline-flex items-center gap-px absolute top-[76px] left-[230px]">
        {columns.map((column, index) => (
          <div
            key={index}
            className="relative w-[202px] h-[33px]"
            style={{
              backgroundColor: column.color,
              borderRight: "4px solid white",
            }}
          >
            <div className="relative w-48 h-7 -top-px left-[3px] flex items-center">
              <MousePointer className="absolute w-[18px] h-[18px] top-[7px] left-[5px]" />
              <div className="absolute w-48 top-0 left-0 [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-[22px] text-center tracking-[0] leading-[normal]">
                {column.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Capture column cards */}
      <div className="flex flex-col w-[198px] items-start gap-2.5 absolute top-[122px] left-[232px]">
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
      <div className="flex flex-col w-[204px] items-start gap-2.5 absolute top-[122px] left-[435px]">
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
      <div className="flex flex-col w-[204px] items-start gap-2.5 absolute top-[122px] left-[645px]">
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
      <div className="absolute top-[122px] left-[855px]">
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
      <div className="flex flex-col w-[198px] items-start gap-2.5 absolute top-[122px] left-[1065px]">
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

      {/* Header with logo and user info */}
      <header className="inline-flex items-start gap-[76px] absolute top-5 left-[21px]">
        <div className="relative w-[734px] h-6 mt-[-1.00px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-black text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
          GTD/logo
        </div>
        <div className="relative w-[322px] h-6 mt-[-1.00px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-black text-xl text-right tracking-[0] leading-[normal] whitespace-nowrap">
          braeden.norman6@gmail.com
        </div>
        <LogOutIcon className="relative w-[30px] h-[30px]" />
      </header>

      {/* Trash bin area */}
      <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-w-[120px]">
        <Trash2 className="w-8 h-8 text-gray-400 mb-2" />
        <span className="text-sm text-gray-500 font-medium">Drop to Delete</span>
      </div>
    </div>
  );
};