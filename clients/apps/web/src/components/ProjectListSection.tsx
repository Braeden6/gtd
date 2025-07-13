import { EditIcon, GripVerticalIcon, MoreHorizontalIcon, TrashIcon, UserIcon, ClipboardListIcon } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@gtd/shared/components/ui/badge";
import { Card, CardContent } from "@gtd/shared/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gtd/shared/components/ui/dropdown-menu";
import { PriorityBadge } from "./PriorityBadge";
import { Priority } from "@gtd/shared/api/generated";

export const ProjectListSection = () => {
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const projectRows = [
    {
      priority: Priority.HIGH,
      projects: [
        {
          id: 1,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 2,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 3,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 4,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
      ],
    },
    {
      priority: Priority.MEDIUM,
      projects: [
        {
          id: 5,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 6,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 7,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 8,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
      ],
    },
    {
      priority: Priority.MEDIUM,
      projects: [
        {
          id: 9,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 10,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 11,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 12,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
      ],
    },
    {
      priority: Priority.LOW,
      projects: [
        {
          id: 13,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 14,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 15,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 16,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
      ],
    },
    {
      priority: Priority.LOW,
      projects: [
        {
          id: 17,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 18,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 19,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 20,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 1,
          assignee: "Peter Parker Nolan",
        },
      ],
    },
    {
      projects: [
        {
          id: 21,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 0,
          assignee: "",
        },
        {
          id: 22,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 4,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 23,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 4,
          assignee: "Peter Parker Nolan",
        },
        {
          id: 24,
          title: "ProjectTitleTitleTitleTitleTitle",
          taskCount: 4,
          assignee: "Peter Parker Nolan",
        },
      ],
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-[891px] items-start gap-5 mt-[30px] mx-5">
      {projectRows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {row.projects.map((project, projectIndex) => (
            <div key={`project-${project.id}`} className="relative">
              <Card
                className={`w-full h-[120px] border-[0.5px] border-[#07a604] rounded-[5px] overflow-hidden hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col w-full h-full">
                    <div className="flex flex-col p-2.5 pr-[15px] relative h-full">
                      {/* Top row with drag icon, priority badge, and menu */}
                      <div className="flex items-center justify-between mb-3">
                        {/* Drag and Drop Icon */}
                        <button className="w-[18px] h-[18px] cursor-grab hover:cursor-grabbing">
                          <GripVerticalIcon className="w-full h-full" />
                        </button>

                        {/* Priority Badge */}
                        <div className="flex-1 flex justify-center">
                            {row?.priority && rowIndex !== 5 && (
                              <PriorityBadge priority={row.priority} />
                            )}
                        </div>

                        {/* Three Dots Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-3.5 h-3.5 focus:outline-none hover:bg-gray-200 rounded p-0.5 transition-colors">
                              <MoreHorizontalIcon className="w-full h-full text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[120px] rounded-[5px] p-1 border-[0.1px] border-black shadow-[1px_2px_20px_#00000021]">
                            <DropdownMenuItem className="flex items-center px-2 py-2 text-[10px] [font-family:'SF_Pro_Display-Regular',Helvetica] cursor-pointer hover:bg-gray-100 rounded">
                              <EditIcon className="w-3 h-3 mr-2 text-gray-600" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center px-2 py-2 text-[10px] [font-family:'SF_Pro_Display-Regular',Helvetica] cursor-pointer hover:bg-gray-100 rounded text-red-600">
                              <TrashIcon className="w-3 h-3 mr-2" />
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Project Title */}
                      <div className="font-bold text-sm mb-3 line-clamp-2">
                        {project.title}
                      </div>

                      {/* Bottom section with task count and assignee */}
                      <div className="mt-auto">
                        {(project.taskCount > 0 || project.assignee) && (
                          <div className="flex items-center gap-6">
                            {project.taskCount > 0 && (
                              <div className="flex items-center">
                                <ClipboardListIcon className="w-3 h-3 text-blue-600" />
                                <span className="ml-2 text-xs font-medium">
                                  {project.taskCount}
                                </span>
                              </div>
                            )}

                            {project.assignee && (
                              <div className="flex items-center">
                                <UserIcon className="w-3 h-3 text-gray-600" />
                                <span className="ml-2 text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                  {project.assignee}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};