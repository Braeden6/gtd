import { useFormPopup } from "@/hooks/useFormPopup";
import { Button } from "@gtd/shared";
import { useEffect, useState } from "react";
import '@/styles.css'

function SelectionButton() {
    const { addText, open } = useFormPopup();
    const [selectedText, setSelectedText] = useState('');
    const [selectionPosition, setSelectionPosition] = useState<{x: number, y: number} | null>(null);

    useEffect(() => {
      let currentRange: Range | null = null;
      
      const getConstrainedPosition = (rect: DOMRect) => {
        const buttonWidth = 120; 
        const buttonHeight = 40; 
        const padding = 20;
        
        let x = rect.left + rect.width / 2;
        let y = rect.bottom + 5;
        

        const minX = buttonWidth / 2 + padding;
        const maxX = window.innerWidth - buttonWidth / 2 - padding;
        x = Math.max(minX, Math.min(maxX, x));
        const maxY = window.innerHeight - buttonHeight - padding;
        if (y > maxY) {
          y = rect.top - buttonHeight - 5;
          if (y < padding) {
            y = maxY;
          }
        }
        
        return { x, y };
      };
      
      const handleSelection = () => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        
        if (text && text.length > 0) {
          const range = selection?.getRangeAt(0);
          currentRange = range || null;
          const rect = range?.getBoundingClientRect();
          
          if (rect) {
            setSelectedText(text);
            setSelectionPosition(getConstrainedPosition(rect));
          }
        } else {
          setSelectedText('');
          setSelectionPosition(null);
          currentRange = null;
        }
      };

      const handleScroll = () => {
        if (currentRange) {
          const rect = currentRange.getBoundingClientRect();
          setSelectionPosition(getConstrainedPosition(rect));
        }
      };
      
      document.addEventListener('selectionchange', handleSelection);
      document.addEventListener('mouseup', handleSelection);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        document.removeEventListener('selectionchange', handleSelection);
        document.removeEventListener('mouseup', handleSelection);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleAddSelectedText = () => {
      const url = window.location.href;
      addText(selectedText + '\n' + url);
      open();
    };

    return (
        <>
        {selectedText && selectionPosition && (
            <Button
              onClick={handleAddSelectedText}
              className="fixed z-[999998] !cursor-pointer !bg-black !text-white rounded-lg !p-2 !text-[18px]"
              style={{
                left: `${selectionPosition.x}px`,
                top: `${selectionPosition.y}px`,
                transform: 'translateX(-50%)'
              }}
            >
              Add to Capture
            </Button>
          )}
        </>
    )
}

export default SelectionButton;