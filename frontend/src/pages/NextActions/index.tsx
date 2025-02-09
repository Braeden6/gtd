import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface Action {
  id: string;
  content: string;
  context: string;
  isCompleted: boolean;
}

export default function NextActions() {
  const [actions, setActions] = useState<Action[]>([]);
  
  const contexts = ['@home', '@work', '@computer', '@phone', '@errands'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Next Actions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contexts.map((context) => (
          <div key={context} className="space-y-2">
            <h2 className="text-lg font-semibold">{context}</h2>
            <div className="space-y-2">
              {actions
                .filter((action) => action.context === context)
                .map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center gap-2 p-3 rounded-lg border bg-card"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setActions(actions.map(a =>
                          a.id === action.id
                            ? { ...a, isCompleted: !a.isCompleted }
                            : a
                        ));
                      }}
                    >
                      <CheckCircle2 
                        className={`h-5 w-5 ${action.isCompleted ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                    </Button>
                    <span className={action.isCompleted ? 'line-through text-muted-foreground' : ''}>
                      {action.content}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}