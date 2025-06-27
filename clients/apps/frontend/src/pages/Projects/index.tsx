import { useState } from 'react';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  nextAction?: string;
}

export default function Projects() {
  // const [projects, setProjects] = useState<Project[]>([]);
  const projects: Project[] = [];
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg bg-card"
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedProject(
                expandedProject === project.id ? null : project.id
              )}
            >
              <div className="flex items-center gap-2">
                {expandedProject === project.id ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
                <h3 className="font-medium">{project.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                project.status === 'active' ? 'bg-green-100 text-green-800' :
                project.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            {expandedProject === project.id && (
              <div className="p-4 border-t bg-muted/50">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                {project.nextAction && (
                  <div className="text-sm">
                    <strong>Next Action:</strong> {project.nextAction}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}