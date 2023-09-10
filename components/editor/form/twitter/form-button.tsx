import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FormButtonProps {
  onClickHandler: any
  content: string
  children: React.ReactNode
  isDestructive?: boolean
}

export function FormButton({
  onClickHandler,
  content = "dismiss",
  children,
  isDestructive = false,
}: FormButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            isDestructive &&
              "hover:border-destructive hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
          )}
          onClick={onClickHandler}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent align="start" className="bg-background text-foreground">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
