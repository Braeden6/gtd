import { createFileRoute } from '@tanstack/react-router'
import { CheckIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@gtd/shared/components/ui/button";
import { Card, CardContent } from "@gtd/shared/components/ui/card";
import { Input } from "@gtd/shared/components/ui/input";
import { ScrollArea, ScrollBar } from "@gtd/shared/components/ui/scroll-area";
import { Separator } from "@gtd/shared/components/ui/separator";
import { Switch } from "@gtd/shared/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@gtd/shared/components/ui/tabs";
// import { HeaderSection } from "./sections/HeaderSection";
// import { ProjectActionsSection } from "./sections/ProjectActionsSection";
// import { ProjectListSection } from "./sections/ProjectListSection/ProjectListSection";


export const Route = createFileRoute('/_main/test')({
  component: RouteComponent,
})

function RouteComponent() {
  // Project filter tabs data
  const filterTabs = [
    { id: "all", label: "All Projects", active: true },
    { id: "inProgress", label: "In Progress", active: false },
    { id: "delegate", label: "Delegate", active: false },
    { id: "past", label: "Past", active: false },
  ];

  // Sort options data
  const sortOptions = [
    { id: "newToOld", label: "New to Old", selected: true },
    { id: "oldToNew", label: "Old to New", selected: false },
  ];

  return (
    <div className="relative w-full max-w-[1280px] h-screen bg-white overflow-hidden">
      {/* Header */}
      {/* <HeaderSection /> */}

      <Separator className="w-full" />

      <div className="flex h-[calc(100vh-62px)]">
        {/* Sidebar */}
        <div className="w-[190px] p-3">
          {/* <ProjectActionsSection /> */}

          <div className="absolute bottom-4 left-[49px] flex items-center gap-2.5">
            <span className="font-medium text-xl">Dark Mode</span>
            <Switch />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                className="pl-10 h-8 rounded-[10px]"
                placeholder="Enter title"
              />
              <SearchIcon className="absolute w-5 h-5 top-1.5 left-2 text-gray-400" />
            </div>

            <div className="relative">
              <Button
                variant="outline"
                className="h-8 rounded-[5px] flex items-center gap-2"
              >
                <SlidersHorizontalIcon className="w-4 h-4" />
                <span>Sort</span>
              </Button>

              <Card className="absolute top-11 w-[104px] z-10">
                <CardContent className="p-0">
                  {sortOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-2 text-xs"
                    >
                      <span>{option.label}</span>
                      {option.selected ? (
                        <div className="w-[7px] h-[7px] bg-[#2c81b9] rounded-sm flex items-center justify-center">
                          <CheckIcon className="w-1.5 h-1.5 text-white" />
                        </div>
                      ) : (
                        <div className="w-[7px] h-[7px] border border-black rounded-sm" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Button className="h-8 bg-[#008fef] hover:bg-[#0080d6]">
              Create Project
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="h-[33px] bg-zinc-100 rounded-[5px]">
              {filterTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`h-[29px] text-sm font-bold ${tab.active ? "bg-white shadow-[2px_4px_3px_#00000017] text-black" : "bg-transparent text-[#00000080]"}`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[calc(100vh-200px)]">
            {/* <ProjectListSection /> */}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
