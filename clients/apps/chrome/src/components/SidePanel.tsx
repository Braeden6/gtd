import { useFormPopup } from "@/hooks/useFormPopup";
import { Button, Input } from "@gtd/shared";

function SidePanel() {
    const { isOpen, close, text, setText } = useFormPopup();
    return (
        <>
        {isOpen && (
            <div 
            className="w-[500px] h-[500px]">
              <h3 className="text-lg font-semibold text-gray-800">Quick GTD</h3>
              <Button 
                onClick={close}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </Button>
            
              <Input
                type="text"
                placeholder="Add text to capture..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}
        </>
    )
}

export default SidePanel;