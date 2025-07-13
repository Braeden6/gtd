import { createFileRoute } from '@tanstack/react-router'
import { CheckIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@gtd/shared/components/ui/button";
import { Input } from "@gtd/shared/components/ui/input";
import { ScrollArea, ScrollBar } from "@gtd/shared/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@gtd/shared/components/ui/tabs";
import { ProjectListSection } from "@/components/ProjectListSection";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@gtd/shared/components/ui/dropdown-menu';
import { useState } from 'react';
import { cn } from '@gtd/shared/lib/utils';


export const Route = createFileRoute('/_main/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedSortOption, setSelectedSortOption] = useState<string>("newToOld");
  const sortOptions = [
    { id: "newToOld", label: "Created: New to Old" },
    { id: "oldToNew", label: "Created: Old to New" },
    { id: "highToLow", label: "Priority: High to Low" },
    { id: "lowToHigh", label: "Priority: Low to High" },
    { id: "dueDate", label: "Due: Upcoming to Past" },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>("all");
  const filterTabs = [
    { id: "all", label: "All Projects", active: true },
    { id: "inProgress", label: "In Progress", active: false },
    { id: "delegate", label: "Delegate", active: false },
    { id: "past", label: "Past", active: false },
  ];



  return (
    <div className="relative w-full max-w-[1280px] h-full overflow-hidden">
      <div className="flex-1 p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              className="pl-10 h-8 rounded-[10px]"
              placeholder="Enter title"
            />
            <SearchIcon className="absolute w-5 h-5 top-1.5 left-2" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 rounded-[5px] flex items-center gap-2"
              >
                <SlidersHorizontalIcon className="w-4 h-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.id} onClick={() => setSelectedSortOption(option.id)} className={cn(
                  selectedSortOption === option.id && "bg-primary"
                )}>
                  {selectedSortOption === option.id ? <CheckIcon className="w-4 h-4" /> : <div className="w-4 h-4" />}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-8">
            Create Project
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="h-[33px] rounded-[5px]">
            {filterTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => setSelectedFilterOption(tab.id)}
                className={cn(
                  "h-[29px] text-sm font-bold",
                  selectedFilterOption === tab.id ? "bg-primary" : "bg-transparent"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <ProjectListSection />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};
