import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckSquare, FileText, Link, Upload } from 'lucide-react';

interface QuickCaptureDialogProps {
  onClose: () => void;
}

export function QuickCaptureDialog({ onClose }: QuickCaptureDialogProps) {
  const [captureType, setCaptureType] = useState<'task' | 'note' | 'file' | 'link'>('task');
  const [content, setContent] = useState('');

  const captureTypes = [
    { type: 'task', icon: CheckSquare, label: 'Task' },
    { type: 'note', icon: FileText, label: 'Note' },
    { type: 'file', icon: Upload, label: 'File' },
    { type: 'link', icon: Link, label: 'Link' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="space-y-4">
          {/* Capture Type Selector */}
          <div className="flex gap-2">
            {captureTypes.map(({ type, icon: Icon, label }) => (
              <Button
                key={type}
                variant={captureType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCaptureType(type as any)}
                className="flex gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle capture
              onClose();
            }}>
              Capture
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}