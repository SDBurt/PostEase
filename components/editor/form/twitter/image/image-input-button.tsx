"use client"

import React, { useRef } from "react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Icons from "@/components/icons"

interface ImageInputButtonProps {
  onFileSelect: any
}

export default function ImageInputButton({
  onFileSelect,
}: ImageInputButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    // Handle the selected file here, e.g., upload it to a server
    if (file) {
      console.log("Selected File:", file)

      // Create a data URL for image preview
      const reader = new FileReader()
      reader.onload = () => {
        console.log({ preview: reader.result as string, file: file })
        onFileSelect(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          onClick={handleClick}
        >
          <Icons.image className="h-4 w-4" />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </TooltipTrigger>
        <TooltipContent align="start" className="bg-background text-foreground">
          <p>Add Image</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
