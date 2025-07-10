import { ElementType } from "@/lib/types";
import { Priority } from "@gtd/shared/api/generated";

interface StatusStyles {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
}

export const getElementTypeStyles = (type: ElementType | undefined): StatusStyles => {
    switch (type) {
        case ElementType.Action:
            return {
                backgroundColor: "bg-[#ED0C0C]",
                borderColor: "border-[#ED0C0C]",
                textColor: "text-[#ED0C0C]",
            }
        case ElementType.Project:
            return {
                backgroundColor: "bg-[#07A604]",
                borderColor: "border-[#07A604]",
                textColor: "text-[#07A604]",
            }
        case ElementType.Reference:
            return {
                backgroundColor: "bg-[#0B17F3]",
                borderColor: "border-[#0B17F3]",
                textColor: "text-[#0B17F3]",
            }
        case ElementType.Someday:
            return {
                backgroundColor: "bg-[#593406]",
                borderColor: "border-[#593406]",
                textColor: "text-[#593406]",
            }
        case ElementType.Inbox:
            return {
                backgroundColor: "bg-[#7643CF]",
                borderColor: "border-[#7643CF]",
                textColor: "text-[#7643CF]",
            }
        default:
            return {
                backgroundColor: "bg-primary/10",
                borderColor: "border-primary",
                textColor: "text-primary",
            }
    }
}

export const getPriorityStyles = (priority: Priority): StatusStyles => {
    switch (priority) {
        case Priority.HIGH:
            return {
                backgroundColor: "bg-[#FEE2E1]",
                borderColor: "border-[#991B1B]",
                textColor: "text-[#991B1B]",
            }
        case Priority.MEDIUM:
            return {
                backgroundColor: "bg-[#FEF9C3]",
                borderColor: "border-[#854D0F]",
                textColor: "text-[#854D0F]",
            }
        case Priority.LOW:
            return {
                backgroundColor: "bg-[#DCFCE7]",
                borderColor: "border-[#166434]",
                textColor: "text-[#166434]",
            }
        default:
            return {
                backgroundColor: "bg-background",
                borderColor: "border-primary",
                textColor: "text-foreground",
            }
    }
}