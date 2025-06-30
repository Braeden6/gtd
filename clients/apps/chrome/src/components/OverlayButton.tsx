import { useFormPopup } from "@/hooks/useFormPopup";
import { CheckCircle } from "lucide-react";

function OverlayButton() {
    const { open, isOpen } = useFormPopup();

    return (
        <>
        {!isOpen && 
            <button
                onClick={open}
                className="
                w-14 h-14 
                bg-gray-800 hover:bg-gray-700 
                text-white 
                rounded-full 
                shadow-lg hover:shadow-xl 
                transition-all duration-200 
                flex items-center justify-center 
                text-xl font-semibold
                border-2 border-gray-600 hover:border-gray-500
                pointer-events-auto
                "
            >
            <CheckCircle />
        </button>
      }
      </>
    )
}

export default OverlayButton;