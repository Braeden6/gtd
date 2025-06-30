import { useFormPopup } from "@/hooks/useFormPopup";
import { useEffect, useState } from "react";

function SelectionButton() {
    const { addText, open } = useFormPopup();
    const [selectedText, setSelectedText] = useState('');
    const [selectionPosition, setSelectionPosition] = useState<{x: number, y: number} | null>(null);

    useEffect(() => {
      const handleSelection = () => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        
        if (text && text.length > 0) {
          const range = selection?.getRangeAt(0);
          const rect = range?.getBoundingClientRect();
          
          if (rect) {
            setSelectedText(text);
            setSelectionPosition({
              x: rect.left + rect.width / 2, 
              y: rect.bottom + window.scrollY + 5
            });
          }
        } else {
          setSelectedText('');
          setSelectionPosition(null);
        }
      };
      document.addEventListener('selectionchange', handleSelection);
      document.addEventListener('mouseup', handleSelection);
      
      return () => {
        document.removeEventListener('selectionchange', handleSelection);
        document.removeEventListener('mouseup', handleSelection);
      };
    }, []);

    const handleAddSelectedText = () => {
        addText(selectedText);
        open();
      };

    return (
        <>
        {selectedText && selectionPosition && (
            <div 
              className="fixed z-[999998] pointer-events-auto"
              style={{
                left: `${selectionPosition.x}px`,
                top: `${selectionPosition.y}px`,
                transform: 'translateX(-50%)', 
              }}
            >
              <button
                onClick={handleAddSelectedText}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add to Capture
              </button>
              </div>
          )}
        </>
    )
}

export default SelectionButton;