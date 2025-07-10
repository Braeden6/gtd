import { useFormPopup } from "@/hooks/useFormPopup";
import { Button } from "@gtd/shared/components/ui/button";
import { CheckCircle } from "lucide-react";

function OverlayButton() {
    const { open, isOpen } = useFormPopup();

    return (
        <>
        {!isOpen && 
            <Button
                onClick={open}
                className="!rounded-full !bg-black/80 !text-white !w-[60px] !h-[60px] !cursor-pointer"
            >
            <CheckCircle  className="!font-bold !size-10"/>
        </Button>
      }
      </>
    )
}

export default OverlayButton;