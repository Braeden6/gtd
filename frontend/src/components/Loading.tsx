import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  title?: string;
  description?: string;
  showProgress?: boolean;
  icon?: React.ReactNode;
  className?: string;
  fullscreen?: boolean;
}

export function LoadingScreen({
  title = "Loading",
  description = "Please wait while we prepare everything for you...",
  showProgress = true,
  icon,
  className,
  fullscreen = true,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!showProgress) return;
    
    const timer = setTimeout(() => {
      setProgress(progress => progress < 100 ? progress + 5 : 100);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [progress, showProgress]);

  const containerClasses = cn(
    "flex items-center justify-center bg-background/80 backdrop-blur-sm z-50",
    fullscreen ? "fixed inset-0" : "w-full h-full min-h-[200px]",
    className
  );

  return (
    <div className={containerClasses}>
      <Card className="w-[350px] shadow-lg border-primary/20">
        <CardContent className="pt-6 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
            {icon || <Loader2 className="h-10 w-10 text-primary animate-spin" />}
          </div>
          
          {title && <h3 className="text-xl font-semibold text-center">{title}</h3>}
          
          {description && (
            <p className="text-muted-foreground text-sm text-center">
              {description}
            </p>
          )}
          
          {showProgress && (
            <div className="w-full mt-2">
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}