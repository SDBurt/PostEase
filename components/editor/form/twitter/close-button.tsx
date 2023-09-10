import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Icons from "@/components/icons"

interface CloseButtonProps {
  onClickHandler: any
  content: string
}

export function CloseButton({
  onClickHandler,
  content = "dismiss",
}: CloseButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "secondary", size: "xs" }),
            "hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
          )}
          onClick={onClickHandler}
        >
          <Icons.close className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent align="start" className="bg-background text-foreground">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
