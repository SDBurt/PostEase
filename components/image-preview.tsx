"use client"

import React from "react"
import { useDebounce } from "use-debounce"

import { Card, CardContent } from "./ui/card"

export default function ImageInputPreview({ filePreview }) {
  const [debouncedFilePreview] = useDebounce(filePreview, 200)

  return (
    <Card className="group relative w-full lg:w-[540px]">
      <CardContent className="p-4">
        {debouncedFilePreview && (
          <img
            src={debouncedFilePreview}
            alt="Image Preview"
            className="rounded object-cover pb-2"
          />
        )}
      </CardContent>
    </Card>
  )
}
