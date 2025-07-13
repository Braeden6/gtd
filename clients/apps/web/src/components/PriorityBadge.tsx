import { getPriorityStyles } from "@/utils/getStyles"
import { formatString } from "@/utils/stringFormat"
import type { Priority } from "@gtd/shared/api/generated"
import { Badge } from "@gtd/shared/components/ui/badge"
import { cn } from "@gtd/shared/lib/utils"

export const PriorityBadge = ({ priority }: { priority: Priority }) => {
    const { backgroundColor, borderColor, textColor } = getPriorityStyles(priority)
    return (
        <Badge
            className={cn(
                "px-[5.5px] py-[2.8px] rounded-[11px] text-[7px] font-bold border-[0.55px] w-[40px] text-center",
                backgroundColor,
                borderColor,
                textColor
            )}
        >
            {formatString(priority)}
        </Badge>
    )
}