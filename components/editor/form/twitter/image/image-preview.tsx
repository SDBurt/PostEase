"use client"

import React from "react"
import { useDebounce } from "use-debounce"

import { Card, CardContent } from "@/components/ui/card"

interface ImageInputPreviewProps {
  filePreview: string
  children: React.ReactNode
}

export default function ImageInputPreview({
  filePreview,
  children,
}: ImageInputPreviewProps) {
  const [debouncedFilePreview] = useDebounce(filePreview, 200)

  return (
    <Card className="group relative w-full lg:w-[540px]">
      <CardContent className="relative p-0">
        {debouncedFilePreview && (
          <>
            <img
              src={debouncedFilePreview}
              alt="Image Preview"
              className="rounded object-cover"
            />
            <div className="absolute right-4 top-4">{children}</div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
