import { useFormPopup } from "@/hooks/useFormPopup";
import { Button } from "@gtd/shared";
import { CheckCircle } from "lucide-react";

function OverlayButton() {
    const { open, isOpen } = useFormPopup();

    return (
        <>
        {!isOpen && 
            <Button
                onClick={open}
                className="rounded-full !bg-background/60 !text-foreground !p-2"
            >
            <CheckCircle  size={40}/>
        </Button>
      }
      </>
    )
}

export default OverlayButton;