import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/Sidebar';
import { QuickCaptureDialog } from '@/components/features/QuickCaptureDialog';


export function MainLayout() {
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsQuickCaptureOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>

        {isQuickCaptureOpen && (
          <QuickCaptureDialog onClose={() => setIsQuickCaptureOpen(false)} />
        )}
      </div>
    </div>
  );
}