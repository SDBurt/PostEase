"use client"

import React, { useRef } from "react"

import Icons from "./icons"
import { Button } from "./ui/button"

interface ImageInputButtonProps {
  onFileSelect: (file: File) => void
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
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <Button type="button" variant="outline" size="icon" onClick={handleClick}>
      <Icons.image className="h-4 w-4" />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </Button>
  )
}
